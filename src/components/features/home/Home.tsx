import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
// import ProfileLevelCard from './ProfileLevelCard';
import { SettingsActions } from '../../../components/common/ui';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../../../services/firebase';
// import { User } from '../../../types/index';
import { updateUserEnergy } from '../../../services/firebase';
// import { DarkModeSwitch } from '../common/SettingsActions';
import '../../../styles/components/features/home.css';

const Home: React.FC = React.memo(() => {
  const { user, logout, updateUser, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [levelModalData, setLevelModalData] = useState<any>(null);
  // const [energyPopup, setEnergyPopup] = useState<string | null>(null);
  const [energyTimer, setEnergyTimer] = useState<NodeJS.Timeout | null>(null);
  const [regenCountdown, setRegenCountdown] = useState<number>(0);
  const [justRegenerated, setJustRegenerated] = useState(false);
  const userRef = useRef(user);
  const cleanupRef = useRef<(() => void) | null>(null);

  // user değiştikçe ref'i güncelle
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Cleanup function for memory management
  const cleanup = useCallback(() => {
    if (energyTimer) {
      clearInterval(energyTimer);
      setEnergyTimer(null);
    }
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, [energyTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Memoized energy calculation
  const energyCalculation = useMemo(() => {
    if (!user) return null;
    
    const ENERGY_MAX = user.energyLimit || 100;
    const ENERGY_REGEN_SPEED = user.energyRegenSpeed || 300; // saniye cinsinden
    const ENERGY_REGEN_MINUTES = ENERGY_REGEN_SPEED / 60; // dakika cinsinden
    const ENERGY_PER_REGEN = 1;
    const now = new Date();
    const lastUpdate = user.lastEnergyUpdate ? new Date(user.lastEnergyUpdate) : now;
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const regenCount = Math.floor(diffSeconds / ENERGY_REGEN_SPEED);
    
    return {
      ENERGY_MAX,
      ENERGY_REGEN_SPEED,
      ENERGY_REGEN_MINUTES,
      ENERGY_PER_REGEN,
      now,
      lastUpdate,
      diffMs,
      diffSeconds,
      regenCount
    };
  }, [user]);

  useEffect(() => {
    if (location.state && location.state.xpResult) {
      const { xpResult } = location.state;
      if (xpResult.levelUp || xpResult.newRankUnlocked) {
        setLevelModalData(xpResult);
        setShowLevelModal(true);
      }
      // State'i temizle (geri gelince tekrar gösterilmesin)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Optimized energy regeneration algorithm
  useEffect(() => {
    if (!user || !energyCalculation) return;
    
    const {
      ENERGY_MAX,
      ENERGY_REGEN_SPEED,
      // ENERGY_REGEN_MINUTES,
      ENERGY_PER_REGEN,
      lastUpdate,
      diffMs,
      // diffSeconds,
      regenCount
    } = energyCalculation;

    let interval: NodeJS.Timeout | null = null;
    
    if (regenCount > 0 && (user.energy ?? 0) < ENERGY_MAX) {
      const newEnergy = Math.min(ENERGY_MAX, (user.energy ?? 0) + regenCount * ENERGY_PER_REGEN);
      const secondsUsed = regenCount * ENERGY_REGEN_SPEED;
      const newLastUpdate = new Date(lastUpdate.getTime() + secondsUsed * 1000);
      updateUserEnergy(user.id, newEnergy, newLastUpdate.toISOString());
      updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: newLastUpdate.toISOString() });
      // setEnergyPopup(`${Math.floor(diffSeconds / 60)} dakika içinde ${regenCount} enerji kazandınız!`);
      // setTimeout(() => setEnergyPopup(null), 5000);
      
      const now2 = new Date();
      const diffMs2 = now2.getTime() - newLastUpdate.getTime();
      const secondsSinceLast2 = Math.floor(diffMs2 / 1000);
      const secondsToNext2 = Math.max(0, ENERGY_REGEN_SPEED - (secondsSinceLast2 % ENERGY_REGEN_SPEED));
      setRegenCountdown(secondsToNext2);
      setJustRegenerated(true);
    } else {
      const secondsSinceLast = Math.floor(diffMs / 1000);
      const secondsToNext = Math.max(0, ENERGY_REGEN_SPEED - (secondsSinceLast % ENERGY_REGEN_SPEED));
      setRegenCountdown(secondsToNext);
      setJustRegenerated(false);
    }
    
    // Real-time energy increase interval
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      setRegenCountdown(prev => {
        if (prev <= 1) {
          if (justRegenerated) {
            setJustRegenerated(false);
            return ENERGY_REGEN_SPEED;
          }
          
          const currentUser = userRef.current;
          if (currentUser && (currentUser.energy ?? 0) < (currentUser.energyLimit || 100)) {
            const newEnergy = Math.min(currentUser.energyLimit || 100, (currentUser.energy ?? 0) + 1);
            const newLastUpdate = new Date().toISOString();
            updateUserEnergy(currentUser.id, newEnergy, newLastUpdate);
            updateUser({ ...currentUser, energy: newEnergy, lastEnergyUpdate: newLastUpdate });
            // setEnergyPopup(`${Math.floor(ENERGY_REGEN_SPEED / 60)} dakika geçti, 1 enerji kazandınız!`);
            // setTimeout(() => setEnergyPopup(null), 4000);
          }
          return ENERGY_REGEN_SPEED;
        }
        return prev - 1;
      });
    }, 1000);
    
    setEnergyTimer(interval);
    
    // Store cleanup function
    cleanupRef.current = () => {
      if (interval) clearInterval(interval);
    };
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user?.id, energyCalculation, justRegenerated, updateUser]);

  useEffect(() => {
    if (refreshUser) {
      refreshUser().then(() => {
        if (process.env['NODE_ENV'] === 'development') {
          console.log('Home - Joker hakları güncellendi:', user?.jokers);
        }
      });
    }
  }, [refreshUser]);

  // Joker haklarını kontrol et
  useEffect(() => {
    if (user?.jokers && process.env['NODE_ENV'] === 'development') {
      console.log('Home - Mevcut joker hakları:', user.jokers);
      console.log('Home - Joker kullanım sayıları:', user.jokersUsed);
    }
  }, [user?.jokers, user?.jokersUsed]);

  const handleEditProfile = useCallback(() => {
    if (process.env['NODE_ENV'] === 'development') {
      console.log("Profil düzenleme sayfasına git...");
    }
    navigate('/edit-profile');
  }, [navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {showLevelModal && levelModalData && (
          <div className="levelup-modal-overlay">
            <div className="levelup-modal">
              <div className="confetti"></div>
              <h2>Tebrikler!</h2>
              {levelModalData.levelUp && (
                <p><b>{levelModalData.newLevel}. Seviye</b> oldun!</p>
              )}
              {levelModalData.newRankUnlocked && (
                <p><b>{levelModalData.newRank}</b> ünvanını almaya hak kazandın!</p>
              )}
              <p>Başarı Oranı: %{Math.round(levelModalData.percent)}<br/>Kazandığın XP: <b>{levelModalData.gainedXp} XP</b></p>
              <button className="close-modal-btn" onClick={() => setShowLevelModal(false)}>Kapat</button>
            </div>
          </div>
        )}
        
        {/* Profil Kartı */}
        <div className="profile-card">
          <div className="profile-card-inner">
            {/* Profil/Seviye Kartı */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ marginBottom: 12 }}>
                <div className="profile-avatar">
                  {user.avatar || '👤'}
                </div>
              </div>
              <div className="profile-name">{user.displayName}</div>
              <div className="profile-rank">{user.stats.rank || ''}</div>
              <div className="profile-level">
                <span className="profile-level-label">Seviye</span>
                <span className="profile-level-number">{user.stats.level || 1}</span>
              </div>
              <div className="xp-progress-container">
                <div 
                  className="xp-progress-bar"
                  style={{ width: `${Math.min(100, Math.round((user.stats.experienceToNext > 0 ? (user.stats.experience / (user.stats.experience + user.stats.experienceToNext)) : 1) * 100))}%` }}
                ></div>
              </div>
              <div className="xp-info">
                <span>{user.stats.experience} / {user.stats.experience + user.stats.experienceToNext} XP</span>
                {user.stats.experienceToNext > 0 && <span className="xp-remaining">({user.stats.experienceToNext} XP kaldı)</span>}
              </div>
              {/* Coin Bilgisi */}
              <div className="coin-display">
                <div className="coin-container">
                  <span className="coin-icon">🪙</span>
                  <span className="coin-amount">{user.coins ?? 0}</span>
                  <span className="coin-label">coin</span>
                </div>
              </div>
            </div>
            
            {/* Enerji Barı */}
            <div className="energy-container">
              <div 
                className={`energy-bar ${(user.energy ?? 0) === (user.energyLimit || 100) ? 'full' : 'not-full'}`}
                style={{ width: `${((user.energy ?? 0) / (user.energyLimit || 100)) * 100}%` }}
              >
                <span className={`energy-pulse ${(user.energy ?? 0) === 100 ? 'full' : ''}`} />
                <span className={`energy-lightning ${(user.energy ?? 0) === 100 ? 'full' : ''}`}>⚡</span>
              </div>
            </div>
            <div className="energy-info">
              <span className="energy-amount">
                <span className="energy-current">{user.energy ?? 0}</span>
                <span className="energy-max">/ {user.energyLimit || 100}</span>
              </span>
              <div className="energy-timer">
                <span className="energy-clock">⏳</span>
                {regenCountdown > 0 && regenCountdown < 10000 && (
                  <>Yeni enerji için: {Math.floor(regenCountdown / 60)}:{(regenCountdown % 60).toString().padStart(2, '0')}</>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <SettingsActions onEditProfile={handleEditProfile} onLogout={logout} />
        
        {/* MARKET Butonu */}
        <div className="market-button">
          <button
            className="market-btn"
            onClick={() => navigate('/market')}
          >
            🛒 MARKET
          </button>
        </div>
        
        <div className="welcome-container">
          <div className="welcome-card-wrapper">
            <div className="welcome-card">
              <div className="welcome-bg-gradient" />
              <div className="welcome-shine" />
              <div className="welcome-content">
                <span className="welcome-emoji">👋</span>
                <span className="welcome-text">Hoşgeldin,</span>
                <span className="welcome-name">{user.displayName || 'Kullanıcı'}</span>
                <span className="welcome-celebration">🎉</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <div
              className="category-card tyt"
              onClick={() => navigate('/tyt-subjects')}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') navigate('/tyt-subjects'); }}
            >
              <div className="category-icon">📝</div>
              <div className="category-content">
                <span className="category-title">TYT</span>
                <span className="category-subtitle">Temel Yeterlilik<br />Testi</span>
              </div>
              <span className="category-shine" />
            </div>
            
            <div
              className="category-card ayt-ea"
              onClick={() => navigate('/ayt-ea-subjects')}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-ea-subjects'); }}
            >
              <div className="category-icon">⚖️</div>
              <div className="category-content">
                <span className="category-title">AYT</span>
                <span className="category-subtitle single-line">Eşit Ağırlık</span>
              </div>
              <span className="category-shine" />
            </div>
            
            <div
              className="category-card ayt-say"
              onClick={() => navigate('/ayt-say-subjects')}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-say-subjects'); }}
            >
              <div className="category-icon">🧮</div>
              <div className="category-content">
                <span className="category-title">AYT</span>
                <span className="category-subtitle single-line">Sayısal</span>
              </div>
              <span className="category-shine" />
            </div>
            
            <div
              className="category-card ayt-soz"
              onClick={() => navigate('/ayt-soz-subjects')}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-soz-subjects'); }}
            >
              <div className="category-icon">📖</div>
              <div className="category-content">
                <span className="category-title">AYT</span>
                <span className="category-subtitle single-line">Sözel</span>
              </div>
              <span className="category-shine" />
            </div>
            
            <div
              className="category-card stats"
              onClick={() => navigate('/istatistikler')}
              tabIndex={0}
            >
              <div className="category-icon">📊</div>
              <div className="category-content">
                <span className="category-title">İSTATİSTİK</span>
                <span className="category-subtitle">Detaylı Analiz<br />ve Raporlar</span>
              </div>
              <span className="category-shine" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home; 