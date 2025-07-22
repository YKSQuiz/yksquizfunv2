import React, { useState, useMemo, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/common/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { MarketItem } from '../../../types';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { GradientBackground } from '../../common/ui';
import './Market.css';

// Onay Dialog Bileşeni - React.memo ile optimize edildi
const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  upgrade: EnergyUpgrade | null;
  userCoins: number;
}> = React.memo(({ isOpen, onClose, onConfirm, upgrade, userCoins }) => {
  if (!isOpen || !upgrade) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onClose}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <span className="confirm-dialog-icon">⚡</span>
          <h3>Satın Alma Onayı</h3>
        </div>
        
        <div className="confirm-dialog-content">
          <p>Bu geliştirmeyi satın almak istediğinizden emin misiniz?</p>
          
          <div className="confirm-dialog-details">
            <div className="detail-item">
              <span className="detail-label">Yeni Değer:</span>
              <span className="detail-value">{upgrade.value}{upgrade.unit}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fiyat:</span>
              <span className="detail-value">{upgrade.price} 🪙</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mevcut Coin:</span>
              <span className="detail-value">{userCoins} 🪙</span>
            </div>
          </div>
          
          <div className="confirm-dialog-balance">
            <span className={`balance-status ${userCoins >= upgrade.price ? 'sufficient' : 'insufficient'}`}>
              {userCoins >= upgrade.price ? '✅ Yeterli Bakiye' : '❌ Yetersiz Bakiye'}
            </span>
          </div>
        </div>
        
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-cancel" onClick={onClose}>
            İptal
          </button>
          <button 
            className={`confirm-dialog-confirm ${userCoins >= upgrade.price ? 'available' : 'disabled'}`}
            onClick={userCoins >= upgrade.price ? onConfirm : undefined}
            disabled={userCoins < upgrade.price}
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
});

// Enerji Upgrade Interface
interface EnergyUpgrade {
  level: number;
  value: number;
  price: number;
  isCompleted: boolean;
  isAvailable: boolean;
  unit: string;
}

// Segmentli Progress Bar Bileşeni - React.memo ile optimize edildi
const SegmentedProgressBar: React.FC<{
  upgrades: EnergyUpgrade[];
  currentValue: number;
  maxValue: number;
  onUpgrade: (upgrade: EnergyUpgrade) => void;
  title: string;
  subtitle: string;
  unit: string;
}> = React.memo(({ upgrades, currentValue, maxValue, onUpgrade, title, subtitle, unit }) => {
  // Progress hesaplamasını düzelt
  const minValue = upgrades[0]?.value || 0;
  const progress = Math.min(((currentValue - minValue) / (maxValue - minValue)) * 100, 100);

  return (
    <div className="energy-upgrade-card">
      <div className="energy-upgrade-header">
        <div className="energy-upgrade-icon">⚡</div>
        <div className="energy-upgrade-info">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      
      <div className="segmented-progress-container">
        <div className="segmented-progress-bar">
          {upgrades.map((upgrade) => (
            <div
              key={upgrade.level}
              className={`progress-segment ${
                upgrade.isCompleted ? 'completed' : 
                upgrade.isAvailable ? 'available' : 'locked'
              }`}
              onClick={() => upgrade.isAvailable && onUpgrade(upgrade)}
              title={upgrade.isAvailable ? `${upgrade.value}${unit} - ${upgrade.price} coin` : `${upgrade.value}${unit} - Kilitli`}
            >
              {/* Kilit ikonu - üstte */}
              {!upgrade.isAvailable && !upgrade.isCompleted && (
                <div className="segment-lock-icon">
                  🔒
                </div>
              )}
              
              {/* Değer - altta */}
              <div className="segment-value">
                {upgrade.value}{unit}
              </div>
            </div>
          ))}
          <div className="progress-percentage">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
      
      <div className="energy-upgrade-stats">
        <div className="current-value">
          <span className="value-label">Mevcut:</span>
          <span className="value-number">{currentValue}{unit}</span>
        </div>
        <div className="max-value">
          <span className="value-label">Maksimum:</span>
          <span className="value-number">{maxValue}{unit}</span>
        </div>
      </div>
    </div>
  );
});

const Market: React.FC = React.memo(() => {
  // const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'joker' | 'energy'>('joker');
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    upgrade: EnergyUpgrade | null;
  }>({ isOpen: false, upgrade: null });

  // Tab değiştirme fonksiyonları - useCallback ile optimize edildi
  const handleJokerTab = useCallback(() => setActiveTab('joker'), []);
  const handleEnergyTab = useCallback(() => setActiveTab('energy'), []);

  // Enerji Limiti Upgrade'leri - useMemo ile optimize edildi
  const energyLimitUpgrades = useMemo(() => {
    const upgrades: EnergyUpgrade[] = [];
    for (let level = 1; level <= 30; level++) {
      const value = 100 + ((level - 1) * 5);
      const price = 1000 + ((level - 1) * 500);
      const isCompleted = (user?.energyLimit || 100) >= value;
      const isAvailable = (user?.energyLimit || 100) >= (value - 5) && !isCompleted;
      
      upgrades.push({
        level,
        value,
        price,
        isCompleted,
        isAvailable,
        unit: ''
      });
    }
    return upgrades;
  }, [user?.energyLimit]);

  // Enerji Hızı Upgrade'leri - useMemo ile optimize edildi
  const energySpeedUpgrades = useMemo(() => {
    const upgrades: EnergyUpgrade[] = [];
    for (let level = 1; level <= 20; level++) {
      const value = 300 - ((level - 1) * 10);
      const price = 1000 + ((level - 1) * 500);
      const isCompleted = (user?.energyRegenSpeed || 300) <= value;
      const isAvailable = (user?.energyRegenSpeed || 300) === (value + 10) && !isCompleted;
      
      upgrades.push({
        level,
        value,
        price,
        isCompleted,
        isAvailable,
        unit: 's'
      });
    }
    return upgrades;
  }, [user?.energyRegenSpeed]);

  // Joker Market ürünleri - useMemo ile optimize edildi
  const jokerItems = useMemo((): MarketItem[] => [
    {
      id: 'eliminate',
      name: '%50 Joker Hakkı',
      description: 'Yanlış cevaplardan rastgele 2 tanesini siler',
      price: 50,
      category: 'joker',
      type: 'single',
      icon: '➗',
      isAvailable: true
    },
    {
      id: 'extraTime',
      name: 'Ekstra Süre',
      description: 'Quiz süresini 60 saniye arttırır',
      price: 75,
      category: 'joker',
      type: 'single',
      icon: '⏰',
      isAvailable: true
    },
    {
      id: 'doubleAnswer',
      name: 'Çift Cevap',
      description: 'Doğru cevabı bulmak için 2 defa deneme hakkı verir',
      price: 100,
      category: 'joker',
      type: 'single',
      icon: '2️⃣',
      isAvailable: true
    },
    {
      id: 'autoCorrect',
      name: 'Otomatik Doğru',
      description: 'Otomatik olarak doğru cevabı seçer ve soruyu çözer',
      price: 150,
      category: 'joker',
      type: 'single',
      icon: '✅',
      isAvailable: true
    },
    {
      id: 'refill_all_jokers',
      name: 'Joker Haklarını Yenile',
      description: 'Tüm Jokerleri 3\'er adet yapar',
      price: 300,
      category: 'joker',
      type: 'refill',
      icon: '🔄',
      isAvailable: true
    }
  ], []);

  const handleEnergyUpgrade = useCallback((upgrade: EnergyUpgrade) => {
    setConfirmDialog({ isOpen: true, upgrade });
  }, []);

  const handleConfirmUpgrade = useCallback(async () => {
    if (!confirmDialog.upgrade || !user) return;
    
    setConfirmDialog({ isOpen: false, upgrade: null });
    await handlePurchase(confirmDialog.upgrade);
  }, [confirmDialog.upgrade, user]);

  const handlePurchase = useCallback(async (upgrade: EnergyUpgrade) => {
    if (!user) return;
    
    setPurchaseLoading(`upgrade_${upgrade.level}`);
    setPurchaseMessage(null);

    try {
      // Coin kontrolü
      if ((user.coins || 0) < upgrade.price) {
        setPurchaseMessage('Yetersiz coin! Bu geliştirmeyi satın almak için daha fazla coin gerekli.');
        return;
      }

      const userRef = doc(db, 'users', user.id);
      const updates: any = {
        coins: increment(-upgrade.price)
      };

      // Upgrade tipine göre güncelleme
      if (upgrade.unit === '') {
        // Enerji Limiti
        updates.energyLimit = upgrade.value;
      } else {
        // Enerji Hızı
        updates.energyRegenSpeed = upgrade.value;
      }

      await updateDoc(userRef, updates);

      // Local user state'ini güncelle
      const updatedUser = { ...user };
      updatedUser.coins = (user.coins || 0) - upgrade.price;

      if (upgrade.unit === '') {
        updatedUser.energyLimit = upgrade.value;
      } else {
        updatedUser.energyRegenSpeed = upgrade.value;
      }

      updateUser(updatedUser);
      setPurchaseMessage('✅ Satın alma başarılı!');
      setTimeout(() => setPurchaseMessage(null), 3000);

    } catch (error) {
      console.error('Satın alma hatası:', error);
      setPurchaseMessage('❌ Satın alma sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setPurchaseLoading(null);
    }
  }, [user, updateUser]);

  const handleJokerPurchase = useCallback(async (item: MarketItem) => {
    if (!user) return;
    
    setPurchaseLoading(item.id);
    setPurchaseMessage(null);

    try {
      // Coin kontrolü
      if ((user.coins || 0) < item.price) {
        setPurchaseMessage('Yetersiz coin! Bu ürünü satın almak için daha fazla coin gerekli.');
        return;
      }

      // Joker miktar kontrolü
      if (item.type === 'single') {
        const jokerType = item.id as keyof typeof user.jokers;
        const currentCount = user.jokers?.[jokerType]?.count || 0;
        
        if (currentCount >= 3) {
          setPurchaseMessage(`Bu jokerden zaten maksimum miktarda (3 adet) sahipsiniz!`);
          return;
        }
      }

      const userRef = doc(db, 'users', user.id);
      const updates: any = {
        coins: increment(-item.price)
      };

      if (item.type === 'single') {
        const jokerType = item.id as keyof typeof user.jokers;
        updates[`jokers.${jokerType}.count`] = increment(1);
      } else if (item.type === 'refill') {
        updates.jokers = {
          eliminate: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          extraTime: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          doubleAnswer: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          autoCorrect: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        };
      }

      await updateDoc(userRef, updates);

      // Local user state'ini güncelle
      const updatedUser = { ...user };
      updatedUser.coins = (user.coins || 0) - item.price;

      if (item.type === 'single') {
        const jokerType = item.id as keyof typeof user.jokers;
        const currentCount = user.jokers?.[jokerType]?.count || 0;
        updatedUser.jokers = { ...user.jokers };
        updatedUser.jokers[jokerType].count = Math.min(currentCount + 1, 3);
      } else if (item.type === 'refill') {
        updatedUser.jokers = {
          eliminate: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          extraTime: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          doubleAnswer: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          autoCorrect: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        };
      }

      updateUser(updatedUser);
      setPurchaseMessage('✅ Satın alma başarılı!');
      setTimeout(() => setPurchaseMessage(null), 3000);

    } catch (error) {
      console.error('Satın alma hatası:', error);
      setPurchaseMessage('❌ Satın alma sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setPurchaseLoading(null);
    }
  }, [user, updateUser]);

  // Enerji doldurma fonksiyonu
  const handleEnergyRefill = useCallback(async () => {
    if (!user) return;
    
    setPurchaseLoading('refill_energy');
    setPurchaseMessage(null);

    try {
      const price = 100;
      
      // Coin kontrolü
      if ((user.coins || 0) < price) {
        setPurchaseMessage('Yetersiz coin! Enerjiyi doldurmak için 100 coin gerekli.');
        return;
      }

      // Enerji zaten dolu mu kontrolü
      if ((user.energy || 0) >= (user.energyLimit || 100)) {
        setPurchaseMessage('Enerjin zaten dolu!');
        return;
      }

      const userRef = doc(db, 'users', user.id);
      const updates: any = {
        coins: increment(-price),
        energy: user.energyLimit || 100
      };

      await updateDoc(userRef, updates);

      // Local user state'ini güncelle
      const updatedUser = { ...user };
      updatedUser.coins = (user.coins || 0) - price;
      updatedUser.energy = user.energyLimit || 100;

      updateUser(updatedUser);
      setPurchaseMessage('✅ Enerji başarıyla dolduruldu!');
      setTimeout(() => setPurchaseMessage(null), 3000);

    } catch (error) {
      console.error('Enerji doldurma hatası:', error);
      setPurchaseMessage('❌ Enerji doldurma sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setPurchaseLoading(null);
    }
  }, [user, updateUser]);

  if (!user) {
    return <div>Kullanıcı oturumu bulunamadı.</div>;
  }

  return (
    <GradientBackground variant="market" showParticles={true} particleCount={8}>
      <div className="market-container">
        <div className="market-card">
        {/* Header */}
        <div className="market-header">
          <BackButton 
            variant="modern" 
            color="purple" 
            size="medium" 
            text="Geri Dön" 
            showIcon={true} 
          />
          <h1 className="market-title">
            🛒 MARKET
          </h1>
          <div className="coin-display">
            <span className="coin-icon">🪙</span>
            <span className="coin-amount">
              {user.coins || 0}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-container">
          <button
            onClick={handleJokerTab}
            className={`tab-button ${activeTab === 'joker' ? 'active' : ''}`}
          >
            <span>🎯 Joker Market</span>
          </button>
          <button
            onClick={handleEnergyTab}
            className={`tab-button ${activeTab === 'energy' ? 'active' : ''}`}
          >
            <span>⚡ Enerji Market</span>
          </button>
        </div>

        {/* Purchase Message */}
        {purchaseMessage && (
          <div className={`purchase-message ${purchaseMessage.includes('✅') ? 'success' : 'error'}`}>
            {purchaseMessage}
          </div>
        )}

        {/* Content */}
        <div className="market-content">
          {activeTab === 'energy' ? (
            /* Modern Energy Market */
            <div className="energy-market-container">
              <div className="energy-market-header">
                <h2 className="energy-market-title">
                  ⚡ Enerji Geliştirme Merkezi
                </h2>
                <p className="energy-market-subtitle">
                  Enerji limitini ve yenilenme hızını geliştir
                </p>
              </div>

              {/* Enerji Limiti Progress Bar */}
              <SegmentedProgressBar
                upgrades={energyLimitUpgrades}
                currentValue={user.energyLimit || 100}
                maxValue={250}
                onUpgrade={handleEnergyUpgrade}
                title="Enerji Limiti"
                subtitle="Maksimum enerji kapasitesi"
                unit=""
              />

              {/* Enerji Hızı Progress Bar */}
              <SegmentedProgressBar
                upgrades={energySpeedUpgrades}
                currentValue={user.energyRegenSpeed || 300}
                maxValue={100}
                onUpgrade={handleEnergyUpgrade}
                title="Enerji Hızı"
                subtitle="Yenilenme süresi (saniye)"
                unit="s"
              />

              {/* Enerjiyi Fulle Kartı */}
              <div className="energy-refill-card">
                <div className="energy-refill-header">
                  <div className="energy-refill-icon">🔋</div>
                  <div className="energy-refill-info">
                    <h3>Enerjiyi Fulle</h3>
                    <p>Enerjini anında maksimum seviyeye çıkar</p>
                  </div>
                </div>
                
                <div className="energy-refill-content">
                  <div className="energy-refill-price">
                    <span className="price-icon">🪙</span>
                    <span className="price-amount">100</span>
                  </div>
                  
                  <button
                    onClick={handleEnergyRefill}
                    disabled={purchaseLoading === 'refill_energy'}
                    className={`energy-refill-button ${
                      purchaseLoading === 'refill_energy' ? 'loading' :
                      (user.coins || 0) >= 100 ? 'available' : 'disabled'
                    }`}
                  >
                    {purchaseLoading === 'refill_energy' ? 'Yükleniyor...' : 'Fulle'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Joker Market Items */
            <>
              {/* Joker Durumu */}
              <div className="joker-status-container">
                <h3 className="joker-status-title">
                   Joker Durumun
                </h3>
                <div className="joker-status-grid">
                  <div className="joker-status-item">
                    <span className="joker-status-icon">➗</span>
                    <div className="joker-status-info">
                      <span className="joker-status-name">%50 Joker Hakkı</span>
                      <span className="joker-status-count">{Math.min(user.jokers?.eliminate?.count || 0, 3)}/3</span>
                    </div>
                  </div>
                  <div className="joker-status-item">
                    <span className="joker-status-icon">⏰</span>
                    <div className="joker-status-info">
                      <span className="joker-status-name">Ekstra Süre</span>
                      <span className="joker-status-count">{Math.min(user.jokers?.extraTime?.count || 0, 3)}/3</span>
                    </div>
                  </div>
                  <div className="joker-status-item">
                    <span className="joker-status-icon">2️⃣</span>
                    <div className="joker-status-info">
                      <span className="joker-status-name">Çift Cevap</span>
                      <span className="joker-status-count">{Math.min(user.jokers?.doubleAnswer?.count || 0, 3)}/3</span>
                    </div>
                  </div>
                  <div className="joker-status-item">
                    <span className="joker-status-icon">✅</span>
                    <div className="joker-status-info">
                      <span className="joker-status-name">Otomatik Doğru</span>
                      <span className="joker-status-count">{Math.min(user.jokers?.autoCorrect?.count || 0, 3)}/3</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="market-grid">
                {jokerItems.map((item) => (
                  <div key={item.id} className="market-item-card">
                    <div className="market-item-header">
                      <span className="market-item-icon">{item.icon}</span>
                      <div className="market-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>

                    <div className="market-item-footer">
                      <div className="price-container">
                        <span className="price-icon">🪙</span>
                        <span className="price-amount">{item.price}</span>
                      </div>

                      <button
                        onClick={() => handleJokerPurchase(item)}
                        disabled={purchaseLoading === item.id}
                        className={`purchase-button ${
                          purchaseLoading === item.id ? 'loading' :
                          (user.coins || 0) >= item.price ? 'available' : 'disabled'
                        }`}
                      >
                        {purchaseLoading === item.id ? 'Satın Alınıyor...' : 'Satın Al'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

      {/* Onay Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, upgrade: null })}
        onConfirm={handleConfirmUpgrade}
        upgrade={confirmDialog.upgrade}
        userCoins={user.coins || 0}
      />
    </GradientBackground>
  );
});

export default Market; 