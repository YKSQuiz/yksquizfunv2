import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/common/navigation';
import { SubjectHeader } from '../../../components/common/subjects';
import { GradientBackground } from '../../../components/common/ui';
import { useAuth } from '../../../contexts/AuthContext';
import { updateUserEnergy } from '../../../services/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import './TestSelection.css';

// Test sonuçları için tip tanımları
// interface TestResult {
//   score: number;
//   total: number;
//   percentage: number;
//   completed: boolean;
//   attempts: number;
// }

// interface TestResults {
//   [testId: string]: TestResult;
// }

const TEST_COUNT = 10;

// Sabit değerleri component dışına taşı
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

// Sabit gradient ve emoji dizileri
const GRADIENTS = [
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

const EMOJIS = ['🟢', '😀', '🧩', '📘', '🧠', '🤔', '🔥', '⚡', '🚀', '🏆'];

// Optimize edilmiş Test Card bileşeni
const TestCard = React.memo<{
  testNumber: number;
  testStatus: { status: string; message: string; canUnlock: boolean };
  isTestUnlocked: boolean;
  isLocked: boolean;
  isPreviousTestSuccessful: boolean;
  testPrice?: number;
  onClick: (testNumber: number) => void;
  animationDelay: number;
}>(({ 
  testNumber, 
  testStatus, 
  isTestUnlocked, 
  isLocked, 
  isPreviousTestSuccessful, 
  testPrice, 
  onClick, 
  animationDelay
}) => {
  // Stil hesaplamalarını useMemo ile optimize et
  const cardStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${animationDelay}s both`,
      cursor: testStatus.status === 'completed' ? 'default' : 'pointer',
      position: 'relative',
      borderRadius: '15px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100px',
      transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    };

    if (testStatus.status === 'completed') {
      return {
        ...baseStyle,
        background: '#ffffff',
        border: `4px solid ${GRADIENTS[(testNumber - 1) % GRADIENTS.length]}`,
        opacity: 1,
        filter: 'none'
      };
    } else if (testStatus.status === 'failed') {
      return {
        ...baseStyle,
        background: '#ffffff',
        border: `4px solid ${GRADIENTS[(testNumber - 1) % GRADIENTS.length]}`,
        opacity: 0.8,
        filter: 'grayscale(0.3)'
      };
    } else if (isLocked) {
      return {
        ...baseStyle,
        background: GRADIENTS[(testNumber - 1) % GRADIENTS.length],
        opacity: 0.6,
        filter: 'grayscale(0.2)'
      };
    } else {
      return {
        ...baseStyle,
        background: GRADIENTS[(testNumber - 1) % GRADIENTS.length],
        opacity: 1,
        filter: 'none'
      };
    }
  }, [testNumber, testStatus.status, isLocked, animationDelay]);

  // CSS sınıflarını useMemo ile optimize et
  const cardClasses = useMemo(() => {
    return [
      'test-card',
      'glow-effect',
      `gradient-${testNumber}`,
      testStatus.status === 'completed' ? 'completed' : '',
      testStatus.status === 'failed' ? 'failed' : '',
      isLocked ? 'locked' : ''
    ].filter(Boolean).join(' ');
  }, [testNumber, testStatus.status, isLocked]);

  // Click handler'ı useCallback ile optimize et
  const handleClick = useCallback(() => {
    if (testStatus.status !== 'completed') {
      onClick(testNumber);
    }
  }, [testNumber, testStatus.status, onClick]);

  // Keyboard handler'ı useCallback ile optimize et
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && testStatus.status !== 'completed') {
      onClick(testNumber);
    }
  }, [testNumber, testStatus.status, onClick]);

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      tabIndex={testStatus.status === 'completed' ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-disabled={isLocked && !isPreviousTestSuccessful}
      style={cardStyle}
    >
      <span className="test-emoji" aria-label="emoji" role="img">
        {EMOJIS[(testNumber - 1) % EMOJIS.length]}
      </span>
      <span className="test-label">
        Test {testNumber}
      </span>
      
      {/* Test durumu mesajı */}
      {testStatus.message && (
        <div className={`test-status ${testStatus.status === 'completed' ? 'success' : 'failed'}`}>
          {testStatus.message}
        </div>
      )}
      
      {/* Kilit ikonu ve fiyat */}
      {isLocked && !isTestUnlocked && (
        <>
          <span 
            className={`lock-icon ${isPreviousTestSuccessful ? 'unlockable' : ''}`}
            aria-label="Kilitli"
            role="img"
          >🔒</span>
          {testNumber > 1 && testPrice && (
            <div className="lock-requirement">
              <span style={{ fontSize: 10 }}>
                {isPreviousTestSuccessful ? '🪙' : '⚠️'}
              </span>
              {isPreviousTestSuccessful ? `${testPrice}` : `%70 + ${testPrice}`}
            </div>
          )}
        </>
      )}
    </div>
  );
});

TestCard.displayName = 'TestCard';

// Optimize edilmiş Unlock Modal bileşeni
const UnlockModal = React.memo<{
  isOpen: boolean;
  selectedTest: number | null;
  unlockLoading: boolean;
  unlockMessage: string | null;
  userCoins: number;
  checkPreviousTestSuccess: (testNumber: number) => boolean;
  onClose: () => void;
  onUnlock: () => void;
}>(({ 
  isOpen, 
  selectedTest, 
  unlockLoading, 
  unlockMessage, 
  userCoins, 
  checkPreviousTestSuccess, 
  onClose, 
  onUnlock 
}) => {
  if (!isOpen || !selectedTest) return null;

  const testPrice = TEST_PRICES[selectedTest] || 0;
  const isPreviousTestSuccessful = checkPreviousTestSuccess(selectedTest);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          {!isPreviousTestSuccessful ? (
            <>
              Bu testi açmak için önce <strong>Test {selectedTest - 1}</strong>'de %70 başarı sağlamanız gerekli.
              <br />
              Ardından <strong>{testPrice} coin</strong> ile bu testi açabilirsiniz.
            </>
          ) : (
            <>
              Önceki testi başarıyla tamamladınız! 
              <br />
              Bu testi açmak için <strong>{testPrice} coin</strong> gerekli.
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
            onClick={onClose}
            className="modal-button secondary"
          >
            İptal
          </button>
          <button
            onClick={onUnlock}
            disabled={
              unlockLoading || 
              userCoins < testPrice ||
              !isPreviousTestSuccessful
            }
            className={`modal-button primary ${unlockLoading ? 'loading' : ''}`}
          >
            {unlockLoading ? 'Açılıyor...' : (
              !isPreviousTestSuccessful
                ? 'Önceki Test Gerekli'
                : `${testPrice} Coin ile Aç`
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
            {userCoins} coin
          </span>
        </div>
      </div>
    </div>
  );
});

UnlockModal.displayName = 'UnlockModal';

const TestSelection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { subTopic } = useParams();
  const mainTopic = window.location.pathname.split('/')[1];
  const { user, updateUser, getTestResults, getUnlockedTests, refreshUser } = useAuth();
  const [energyError, setEnergyError] = useState<string | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null);

  // User state'ini yenile (Firestore'dan güncel veriyi al)
  useEffect(() => {
    if (user?.id) {
      console.log('🔄 User state yenileniyor...');
      refreshUser().then(() => {
        console.log('✅ User state yenilendi');
      }).catch((error) => {
        console.error('❌ User state yenileme hatası:', error);
      });
    }
  }, [user?.id, refreshUser]);

  // Konu anahtarı oluştur - useMemo ile optimize et
  const subjectTopicKey = useMemo(() => {
    let key = `${mainTopic}_${subTopic}`;
    if (mainTopic === 'turkce') {
      key = `quiz_${subTopic}`;
    }
    return key;
  }, [mainTopic, subTopic]);

  const testResults = getTestResults(subjectTopicKey);
  const unlockedTests = getUnlockedTests(subjectTopicKey);

  // Test durumunu kontrol eden fonksiyon - useCallback ile optimize et
  const getTestStatus = useCallback((testNumber: number) => {
    const testResult = testResults[testNumber.toString()];
    
    if (!testResult) {
      return { status: 'not-attempted', message: '', canUnlock: testNumber === 1 };
    }
    
    if (testResult.completed) {
      return { 
        status: 'completed', 
        message: `✅ %${testResult.percentage}`, 
        canUnlock: true 
      };
    } else {
      return { 
        status: 'failed', 
        message: `❌ %${testResult.percentage}`, 
        canUnlock: false 
      };
    }
  }, [testResults]);

  // Önceki testin başarılı olup olmadığını kontrol eden fonksiyon - useCallback ile optimize et
  const checkPreviousTestSuccess = useCallback((testNumber: number): boolean => {
    if (testNumber === 1) return true;
    
    const previousTestResult = testResults[(testNumber - 1).toString()];
    if (!previousTestResult) return false;
    
    // %70 başarı şartı
    return previousTestResult.percentage >= 70;
  }, [testResults]);

  // Test click handler'ı - useCallback ile optimize et
  const handleTestClick = useCallback(async (testNumber: number) => {
    setEnergyError(null);
    setUnlockMessage(null);

    // Test durumunu kontrol et
    const testStatus = getTestStatus(testNumber);
    
    // Test 1 için özel kontrol
    if (testNumber === 1) {
      if (!user) {
        setEnergyError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
        return;
      }
      if ((user.energy ?? 0) < 20) {
        setEnergyError('Bu testi çözmek için yeterli enerjiniz yok. (En az 20 enerji gerekir)');
        return;
      }
      
      // Test 1 tamamlanmışsa tekrar çözemez
      if (testStatus.status === 'completed') {
        setEnergyError('Bu testi zaten başarıyla tamamladınız! Bir sonraki testi çözebilirsiniz.');
        return;
      }
      
      // Enerji düşümü ve quiz'e yönlendirme
      const newEnergy = Math.max(0, (user.energy ?? 0) - 20);
      const now = new Date().toISOString();
      try {
        await updateUserEnergy(user.id, newEnergy, now);
        updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
        navigate(`/quiz/${mainTopic}/${subTopic}/${testNumber}`);
      } catch (err) {
        setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
      return;
    }

    // Test 2 ve sonrası için kontrol
    if (testNumber > 1) {
      // Önceki test başarılı mı kontrol et
      if (!checkPreviousTestSuccess(testNumber)) {
        setEnergyError(`Bu testi açmak için önce Test ${testNumber - 1}'de en az %70 başarı sağlamanız gerekli.`);
        return;
      }

      // Test zaten açık mı kontrol et
      const isTestUnlocked = unlockedTests.includes(testNumber);
      
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
        
        // Test tamamlanmışsa tekrar çözemez
        if (testStatus.status === 'completed') {
          setEnergyError('Bu testi zaten başarıyla tamamladınız! Bir sonraki testi çözebilirsiniz.');
          return;
        }
        
        // Enerji düşümü ve quiz'e yönlendirme
        const newEnergy = Math.max(0, (user.energy ?? 0) - 20);
        const now = new Date().toISOString();
        try {
          await updateUserEnergy(user.id, newEnergy, now);
          updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
          navigate(`/quiz/${mainTopic}/${subTopic}/${testNumber}`);
        } catch (err) {
          setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
        return;
      } else {
        // Test kilitli - satın alma modalını göster
        if (!user) {
          setEnergyError('Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.');
          return;
        }

        console.log('🔒 Test kilitli, modal açılıyor:', {
          testNumber,
          testPrice: TEST_PRICES[testNumber],
          userCoins: user.coins,
          isPreviousTestSuccessful: checkPreviousTestSuccess(testNumber)
        });

        // Satın alma modalını göster
        setSelectedTest(testNumber);
        setShowUnlockModal(true);
        return;
      }
    }
  }, [user, mainTopic, subTopic, navigate, updateUser, getTestStatus, checkPreviousTestSuccess, unlockedTests]);

  // Optimize edilmiş confetti animasyonu - sadece gerekli olduğunda çalıştır
  const triggerConfetti = useCallback(() => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    // Confetti sayısını azalt ve performansı artır
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 3000);
    }
  }, []);

  // Test açma handler'ı - useCallback ile optimize et
  const handleUnlockTest = useCallback(async () => {
    if (!user || !selectedTest) return;

    setUnlockLoading(true);
    setUnlockMessage(null);

    try {
      // Önceki test başarılı mı kontrol et
      if (!checkPreviousTestSuccess(selectedTest)) {
        setUnlockMessage(`Bu testi açmak için önce Test ${selectedTest - 1}'de %70 başarı sağlamanız gerekli.`);
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
      const currentUnlockedTests = user.unlockedTests || {};
      const currentTopicUnlockedTests = currentUnlockedTests[subjectTopicKey] || [];
      const updatedTopicUnlockedTests = [...currentTopicUnlockedTests, selectedTest];
      
      const updatedUnlockedTests = {
        ...currentUnlockedTests,
        [subjectTopicKey]: updatedTopicUnlockedTests
      };

      // Firestore'a kaydet
      try {
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, {
          coins: increment(-testPrice),
          [`unlockedTests.${subjectTopicKey}`]: updatedTopicUnlockedTests
        });
        console.log('✅ Firestore\'a test açma kaydedildi');
      } catch (firestoreError) {
        console.error('❌ Firestore hatası (test açma):', firestoreError);
        setUnlockMessage('❌ Test açılırken bir hata oluştu. Lütfen tekrar deneyin.');
        return;
      }

      // Local user state'ini güncelle
      const updatedUser = { ...user };
      updatedUser.coins = (user.coins || 0) - testPrice;
      updatedUser.unlockedTests = updatedUnlockedTests;
      updateUser(updatedUser);
      
      // Firestore'dan güncel veriyi çek
      await refreshUser();

      setUnlockMessage('✅ Test başarıyla açıldı!');
      triggerConfetti(); // Confetti animasyonu
      setTimeout(async () => {
        setShowUnlockModal(false);
        setUnlockMessage(null);
        setSelectedTest(null);
        
        // Enerji kontrolü ve quiz sayfasına yönlendirme
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
          updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: now });
          navigate(`/quiz/${mainTopic}/${subTopic}/${selectedTest}`);
        } catch (err) {
          setEnergyError('Enerji güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      }, 1500);

    } catch (error) {
      console.error('Test açma hatası:', error);
      setUnlockMessage('❌ Test açılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setUnlockLoading(false);
    }
  }, [user, selectedTest, subjectTopicKey, checkPreviousTestSuccess, updateUser, refreshUser, triggerConfetti, navigate, mainTopic, subTopic]);

  // Modal kapatma handler'ı - useCallback ile optimize et
  const handleCloseModal = useCallback(() => {
    setShowUnlockModal(false);
    setSelectedTest(null);
    setUnlockMessage(null);
  }, []);

  // Test kartlarını useMemo ile optimize et
  const testCards = useMemo(() => {
    return Array.from({ length: TEST_COUNT }, (_, index) => {
      const testNumber = index + 1;
      const testStatus = getTestStatus(testNumber);
      
      // Test 2 ve sonrası için özel kontrol - eski sistemden kalan açık testleri temizle
      let isTestUnlocked = unlockedTests.includes(testNumber) || testNumber === 1;
      
      // Test 2 ve sonrası için coin sistemi kontrolü
      if (testNumber > 1) {
        // Test 2 ve sonrası için hem başarı şartı hem de coin gerekli
        const isPreviousTestSuccessful = checkPreviousTestSuccess(testNumber);
        
        // Eğer önceki test başarılı değilse, test kilitli
        if (!isPreviousTestSuccessful) {
          isTestUnlocked = false;
        }
        // Eğer önceki test başarılıysa ama test henüz satın alınmamışsa, kilitli
        else if (!unlockedTests.includes(testNumber)) {
          isTestUnlocked = false;
        }
        
        // Debug için Test 2 durumunu logla
        if (testNumber === 2) {
          console.log('🔍 Test 2 Durumu:', {
            isTestUnlocked,
            isPreviousTestSuccessful,
            unlockedTests,
            isLocked: testNumber > 1 && !isTestUnlocked
          });
        }
      }
      
      const isLocked = testNumber > 1 && !isTestUnlocked;
      const testPrice = TEST_PRICES[testNumber];
      const isPreviousTestSuccessful = checkPreviousTestSuccess(testNumber);
      
      return (
        <TestCard
          key={testNumber}
          testNumber={testNumber}
          testStatus={testStatus}
          isTestUnlocked={isTestUnlocked}
          isLocked={isLocked}
          isPreviousTestSuccessful={isPreviousTestSuccessful}
          testPrice={testPrice}
          onClick={handleTestClick}
          animationDelay={index * 0.09}
        />
      );
    });
  }, [getTestStatus, unlockedTests, checkPreviousTestSuccess, handleTestClick, user?.coins]);

  // Early return - hooks'lardan sonra
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

  // Debug bilgileri
  console.log('🔍 Test Seçim Ekranı Debug:', {
    mainTopic,
    subTopic,
    subjectTopicKey,
    testResults,
    unlockedTests,
    userId: user?.id,
    userCoins: user?.coins,
    userTestResults: user?.testResults,
    userUnlockedTests: user?.unlockedTests,
    test2Unlocked: unlockedTests.includes(2),
    test2Status: getTestStatus(2),
    test1Status: getTestStatus(1),
    test1Completed: testResults['1']?.completed,
    test1Percentage: testResults['1']?.percentage,
    test2Price: TEST_PRICES[2],
    hasEnoughCoins: (user?.coins || 0) >= (TEST_PRICES[2] || 0),
    isPreviousTestSuccessful: checkPreviousTestSuccess(2)
  });

  return (
    <GradientBackground variant="purple-blue" showParticles={true} particleCount={5}>
      <BackButton />
      
      <div className="test-selection-content">
        {/* Header with Back Button */}
        <SubjectHeader 
          title={`${mainTopicLabels[mainTopic] || mainTopic} - ${subTopic}`}
        />
        
        <div className="test-selection-header">
          <h1 className="test-selection-title">Aşağıdan bir test seçerek başlayabilirsin</h1>
          <p className="test-selection-subtitle">Testleri çözerek XP ve Coin kazanabilirsin</p>
        </div>

        {energyError && (
          <div className="error-message">{energyError}</div>
        )}
        
        <div className="test-grid">
          {testCards}
        </div>

        {/* Optimize edilmiş Unlock Modal */}
        <UnlockModal
          isOpen={showUnlockModal}
          selectedTest={selectedTest}
          unlockLoading={unlockLoading}
          unlockMessage={unlockMessage}
          userCoins={user?.coins || 0}
          checkPreviousTestSuccess={checkPreviousTestSuccess}
          onClose={handleCloseModal}
          onUnlock={handleUnlockTest}
        />

        {/* Confetti Animation Container */}
        <div id="confetti-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}></div>
      </div>
    </GradientBackground>
  );
});

TestSelection.displayName = 'TestSelection';

export default TestSelection; 