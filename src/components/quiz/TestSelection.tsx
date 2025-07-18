import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserEnergy } from '../../services/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../services/firebase';

const TEST_COUNT = 10;

const mainTopicLabels: Record<string, string> = {
  // TYT Dersleri
  'tyt-turkce': 'TYT Türkçe',
  'tyt-tarih': 'TYT Tarih',
  'tyt-cografya': 'TYT Coğrafya',
  'tyt-felsefe': 'TYT Felsefe',
  'tyt-din': 'TYT Din',
  'tyt-matematik': 'TYT Matematik',
  'tyt-fizik': 'TYT Fizik',
  'tyt-kimya': 'TYT Kimya',
  'tyt-biyoloji': 'TYT Biyoloji',
  
  // AYT Sayısal Dersleri
  'ayt-matematik': 'AYT Matematik',
  'ayt-fizik': 'AYT Fizik',
  'ayt-kimya': 'AYT Kimya',
  'ayt-biyoloji': 'AYT Biyoloji',
  
  // AYT Eşit Ağırlık Dersleri
  'ayt-edebiyat': 'AYT Edebiyat',
  'ayt-tarih': 'AYT Tarih',
  'ayt-cografya': 'AYT Coğrafya',
  
  // AYT Sözel Dersleri
  'ayt-din': 'AYT Din Kültürü',
  'ayt-felsefe': 'AYT Felsefe',
  
  // Eski format desteği (geriye uyumluluk için)
  turkce: 'TYT Türkçe',
  tarih: 'TYT Tarih',
  cografya: 'TYT Coğrafya',
  felsefe: 'TYT Felsefe',
  din: 'TYT Din',
  matematik: 'TYT Matematik',
  fizik: 'TYT Fizik',
  kimya: 'TYT Kimya',
  biyoloji: 'TYT Biyoloji',
};

// Test kilidi fiyatları
const TEST_PRICES: Record<number, number> = {
  2: 100,
  3: 120,
  4: 140,
  5: 160,
  6: 180,
  7: 200,
  8: 220,
  9: 240,
  10: 260,
};

const TestSelection: React.FC = () => {
  const navigate = useNavigate();
  const { subTopic } = useParams();
  const mainTopic = window.location.pathname.split('/')[1];
  const { user, updateUser, refreshUser } = useAuth();
  const [energyError, setEnergyError] = useState<string | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);

  if (!mainTopic || !subTopic) {
    return (
      <div className="container">
        <div className="header"><h1>Test Seçimi</h1></div>
        <div className="card">
          <p style={{ color: 'red', fontWeight: 600, fontSize: 18 }}>Hatalı yönlendirme: Lütfen önce bir konu ve alt konu seçin.</p>
        </div>
      </div>
    );
  }

  // Alt konu anahtarı oluştur (Firestore için güvenli)
  const subjectTopicKey = `${mainTopic}_${subTopic}`;
  
  // Bu alt konu için açılan testleri al
  const unlockedTestsForTopic = (user?.unlockedTests && typeof user.unlockedTests === 'object' && !Array.isArray(user.unlockedTests)) 
    ? (user.unlockedTests[subjectTopicKey] || [])
    : [];

  const handleTestClick = async (testNumber: number) => {
    setEnergyError(null);
    setUnlockMessage(null);

    // Test kilidi kontrolü - alt konu bazlı
    const isTestUnlocked = unlockedTestsForTopic.includes(testNumber) || testNumber === 1;
    
    // Sıralı kontrol: Önceki test açık mı? (Test 2'den başlar)
    const isPreviousTestUnlocked = testNumber === 1 || unlockedTestsForTopic.includes(testNumber - 1);
    
    // Test 1 ücretsiz, diğerleri kilitli
    if (testNumber > 1) {
      // Test zaten açık mı kontrol et
      if (isTestUnlocked) {
        // Test açık, direkt quiz sayfasına git
        if (!user) {
          setEnergyError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          return;
        }
        if ((user.energy ?? 0) < 20) {
          setEnergyError('Bu testi çözmek için yeterli enerjiniz yok. (En az 20 enerji gerekir)');
          return;
        }
        // Enerji düşümü
        const newEnergy = Math.max(0, (user.energy ?? 0) - 20);
        const now = new Date().toISOString();
        try {
          await updateUserEnergy(user.id, newEnergy, now);
          // Local user bilgisini de güncelle
          updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
          navigate(`/quiz/${mainTopic}/${subTopic}/${testNumber}`);
        } catch (err) {
          setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
        return;
      }
      
      // Sıralı kontrol: Önceki test açık mı? (Test 3'ten başlar)
      if (testNumber > 2 && !unlockedTestsForTopic.includes(testNumber - 1)) {
        setEnergyError(`Bu testi açmak için önce Test ${testNumber - 1}'i açmanız gerekli.`);
        return;
      }
      
      setSelectedTest(testNumber);
      setShowUnlockModal(true);
      return;
    }

    if (!user) {
      setEnergyError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
      return;
    }
    if ((user.energy ?? 0) < 20) {
      setEnergyError('Bu testi çözmek için yeterli enerjiniz yok. (En az 20 enerji gerekir)');
      return;
    }
    // Enerji düşümü
    const newEnergy = Math.max(0, (user.energy ?? 0) - 20);
    const now = new Date().toISOString();
    try {
      await updateUserEnergy(user.id, newEnergy, now);
      // Local user bilgisini de güncelle
      updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
      navigate(`/quiz/${mainTopic}/${subTopic}/${testNumber}`);
    } catch (err) {
      setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleUnlockTest = async () => {
    if (!user || !selectedTest) return;

    setUnlockLoading(true);
    setUnlockMessage(null);

    try {
      // Sıralı kontrol: Önceki test açık mı? (Test 3'ten başlar)
      if (selectedTest > 2 && !unlockedTestsForTopic.includes(selectedTest - 1)) {
        setUnlockMessage(`Bu testi açmak için önce Test ${selectedTest - 1}'i açmanız gerekli.`);
        return;
      }

      const testPrice = TEST_PRICES[selectedTest];
      if (!testPrice) {
        setUnlockMessage('Bu test için fiyat bilgisi bulunamadı.');
        return;
      }

      // Coin kontrolü
      if ((user.coins || 0) < testPrice) {
        setUnlockMessage('Yetersiz coin! Bu testi açmak için daha fazla coin gerekli.');
        return;
      }

      // Yeni unlockedTests objesi oluştur
      const currentUnlockedTests = (user.unlockedTests && typeof user.unlockedTests === 'object' && !Array.isArray(user.unlockedTests)) 
        ? user.unlockedTests 
        : {};
      const updatedUnlockedTests = { ...currentUnlockedTests };
      if (!updatedUnlockedTests[subjectTopicKey]) {
        updatedUnlockedTests[subjectTopicKey] = [];
      }
      updatedUnlockedTests[subjectTopicKey] = [...updatedUnlockedTests[subjectTopicKey], selectedTest];

      const userRef = doc(db, 'users', user.id);
      const updates: any = {
        coins: increment(-testPrice),
        [`unlockedTests.${subjectTopicKey}`]: updatedUnlockedTests[subjectTopicKey]
      };

      await updateDoc(userRef, updates);

      // Local user state'ini güncelle
      const updatedUser = { ...user };
      updatedUser.coins = (user.coins || 0) - testPrice;
      updatedUser.unlockedTests = updatedUnlockedTests;
      updateUser(updatedUser);

      setUnlockMessage('✅ Test başarıyla açıldı!');
      setTimeout(async () => {
        setShowUnlockModal(false);
        setUnlockMessage(null);
        setSelectedTest(null);
        
        // Enerji kontrolü ve quiz sayfasına yönlendirme
        if (!user) {
          setEnergyError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          return;
        }
        if ((user.coins || 0) - testPrice < 0) {
          setEnergyError('Yetersiz coin! Bu testi çözmek için daha fazla coin gerekli.');
          return;
        }
        if ((user.energy ?? 0) < 20) {
          setEnergyError('Bu testi çözmek için yeterli enerjiniz yok. (En az 20 enerji gerekir)');
          return;
        }
        
        // Enerji düşümü
        const newEnergy = Math.max(0, (user.energy ?? 0) - 20);
        const now = new Date().toISOString();
        try {
          await updateUserEnergy(user.id, newEnergy, now);
          // Local user bilgisini de güncelle
          updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
          navigate(`/quiz/${mainTopic}/${subTopic}/${selectedTest}`);
        } catch (err) {
          setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }, 1500);

    } catch (error) {
      console.error('Test açma hatası:', error);
      console.error('subjectTopicKey:', subjectTopicKey);
      setUnlockMessage('❌ Test açılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setUnlockLoading(false);
    }
  };

  const gradients = [
    'linear-gradient(135deg, #00FF66 0%, #33FF33 100%)',
    'linear-gradient(135deg, #33FF33 0%, #66FF00 100%)',
    'linear-gradient(135deg, #66FF00 0%, #99FF00 100%)',
    'linear-gradient(135deg, #99FF00 0%, #CCFF00 100%)',
    'linear-gradient(135deg, #CCFF00 0%, #FFCC00 100%)',
    'linear-gradient(135deg, #FFCC00 0%, #FF9900 100%)',
    'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
    'linear-gradient(135deg, #FF6600 0%, #FF3300 100%)',
    'linear-gradient(135deg, #FF3300 0%, #FF0000 100%)',
    'linear-gradient(135deg, #FF0000 0%, #b80000 100%)',
  ];
  const emojis = [
    '🟢', '😀', '🧩', '📘', '🧠', '🤔', '🔥', '⚡', '🚀', '🏆'
  ];

  return (
    <div className="container">
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton 
          variant="neon"
          color="success"
          size="medium"
          text="Geri Dön"
          showIcon={true}
          style={{ marginRight: '18px' }}
        />
        <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>{mainTopicLabels[mainTopic] || mainTopic} - {subTopic.replace(/-/g, ' ')}</h1>
        <div style={{ width: 120 }} />
      </div>
      <div className="card" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', boxShadow: '0 8px 40px #43e97b22' }}>
        {energyError && (
          <div style={{ color: 'red', fontWeight: 700, fontSize: 17, marginBottom: 12, textAlign: 'center' }}>{energyError}</div>
        )}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#43e97b', fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>🔢 Hangi testi çözmek istersin?</h2>
          <p style={{ color: '#555', fontSize: 16, marginTop: 8 }}>Aşağıdan bir test seçerek başlayabilirsin.</p>
        </div>
        <div className="test-grid">
          {Array.from({ length: TEST_COUNT }, (_, index) => {
            const testNumber = index + 1;
            const isTestUnlocked = unlockedTestsForTopic.includes(testNumber) || testNumber === 1;
            const isPreviousTestUnlocked = testNumber === 1 || unlockedTestsForTopic.includes(testNumber - 1);
            const isLocked = testNumber > 1 && !isTestUnlocked;
            const testPrice = TEST_PRICES[testNumber];
            const isSequentiallyLocked = testNumber > 2 && !unlockedTestsForTopic.includes(testNumber - 1);
            
            return (
              <div
                key={index}
                className="test-card tyt-animated-card"
                style={{ 
                  background: gradients[index % gradients.length], 
                  animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${(index * 0.09).toFixed(2)}s both`,
                  opacity: isLocked ? 0.6 : 1,
                  cursor: 'pointer',
                  position: 'relative',
                  filter: isLocked ? 'grayscale(0.2)' : 'none',
                  border: isSequentiallyLocked ? '3px solid #ff6b6b' : 'none',
                }}
                onClick={() => handleTestClick(testNumber)}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTestClick(testNumber); }}
                aria-disabled={isLocked}
              >
                <span className="test-emoji" aria-label="emoji" role="img">{emojis[index % emojis.length]}</span>
                <span className="test-label">Test {testNumber}</span>
                {isLocked && !isTestUnlocked && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <span 
                      className="lock-icon" 
                      style={{
                        fontSize: 24,
                        color: '#333a',
                        zIndex: 2,
                        filter: 'drop-shadow(0 2px 8px #fff8)'
                      }}
                      aria-label="Kilitli"
                      role="img"
                    >🔒</span>
                    {testNumber > 1 && testPrice && (
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: isSequentiallyLocked ? '#ff6b6b' : '#ffb300',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '2px 6px',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <span style={{ fontSize: 10 }}>
                          {isSequentiallyLocked ? '⚠️' : '🪙'}
                        </span>
                        {isSequentiallyLocked 
                          ? `Test ${testNumber - 1}`
                          : testPrice
                        }
                      </div>
                    )}
                  </div>
                )}
                <span className="tyt-shine" />
              </div>
            );
          })}
        </div>

        {/* Test Açma Modalı */}
        {showUnlockModal && selectedTest && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              borderRadius: 20,
              padding: '32px',
              maxWidth: 400,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '2px solid #e0c3fc'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#764ba2',
                margin: '0 0 16px 0'
              }}>
                Test {selectedTest} Kilitli
              </h3>
              <p style={{
                fontSize: 16,
                color: '#666',
                margin: '0 0 24px 0',
                lineHeight: 1.5
              }}>
                {selectedTest > 2 && !unlockedTestsForTopic.includes(selectedTest - 1) ? (
                  <>
                    Bu testi açmak için önce <strong>Test {selectedTest - 1}</strong>'i açmanız gerekli.
                    <br />
                    Ardından <strong>{TEST_PRICES[selectedTest]} coin</strong> ile bu testi açabilirsiniz.
                  </>
                ) : (
                  <>
                    Bu testi açmak için <strong>{TEST_PRICES[selectedTest]} coin</strong> gerekli.
                  </>
                )}
              </p>
              
              {unlockMessage && (
                <div style={{
                  padding: '12px 16px',
                  marginBottom: 16,
                  borderRadius: 12,
                  background: unlockMessage.includes('✅') ? '#d4edda' : '#f8d7da',
                  color: unlockMessage.includes('✅') ? '#155724' : '#721c24',
                  fontWeight: 600
                }}>
                  {unlockMessage}
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    setSelectedTest(null);
                    setUnlockMessage(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    background: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#5a6268'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#6c757d'}
                >
                  İptal
                </button>
                                 <button
                   onClick={handleUnlockTest}
                   disabled={
                     unlockLoading || 
                     (user?.coins || 0) < (TEST_PRICES[selectedTest] || 0) ||
                     (selectedTest > 2 && !unlockedTestsForTopic.includes(selectedTest - 1))
                   }
                   style={{
                     padding: '12px 24px',
                     background: (
                       (user?.coins || 0) >= (TEST_PRICES[selectedTest] || 0) &&
                       (selectedTest === 1 || selectedTest === 2 || unlockedTestsForTopic.includes(selectedTest - 1))
                     ) 
                       ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                       : '#ccc',
                     color: '#fff',
                     border: 'none',
                     borderRadius: 12,
                     fontSize: 16,
                     fontWeight: 700,
                     cursor: (
                       (user?.coins || 0) >= (TEST_PRICES[selectedTest] || 0) &&
                       (selectedTest === 1 || selectedTest === 2 || unlockedTestsForTopic.includes(selectedTest - 1))
                     ) ? 'pointer' : 'not-allowed',
                     transition: 'all 0.3s ease',
                     opacity: unlockLoading ? 0.7 : 1
                   }}
                   onMouseEnter={(e) => {
                     if (
                       (user?.coins || 0) >= (TEST_PRICES[selectedTest] || 0) &&
                       (selectedTest === 1 || selectedTest === 2 || unlockedTestsForTopic.includes(selectedTest - 1))
                     ) {
                       e.currentTarget.style.transform = 'scale(1.02)';
                     }
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)';
                   }}
                 >
                   {unlockLoading ? 'Açılıyor...' : (
                     selectedTest > 2 && !unlockedTestsForTopic.includes(selectedTest - 1)
                       ? 'Önceki Test Gerekli'
                       : `${TEST_PRICES[selectedTest]} Coin ile Aç`
                   )}
                 </button>
              </div>

              {/* Coin Bilgisi */}
              <div style={{
                marginTop: 16,
                padding: '12px',
                background: 'linear-gradient(90deg, #fffbe7 0%, #ffe082 100%)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 20 }}>🪙</span>
                <span style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#ffb300',
                  fontFamily: 'Orbitron, monospace'
                }}>
                  {user?.coins || 0} coin
                </span>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.7) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            padding: 20px;
          }
          .test-card {
            font-weight: 700;
            font-size: 20px;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100px;
            cursor: pointer;
            transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            position: relative;
            overflow: hidden;
          }
          .test-emoji {
            font-size: 2.1rem;
            margin-right: 12px;
            display: inline-block;
          }
          .lock-icon {
            pointer-events: none;
            user-select: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TestSelection; 