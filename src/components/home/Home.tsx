import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileLevelCard from './ProfileLevelCard';
import SettingsActions from '../common/SettingsActions';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { User } from '../../types/index';
import { updateUserEnergy } from '../../services/firebase';
import { DarkModeSwitch } from '../common/SettingsActions';

const Home: React.FC = React.memo(() => {
  const { user, logout, updateUser, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [levelModalData, setLevelModalData] = useState<any>(null);
  const [energyPopup, setEnergyPopup] = useState<string | null>(null);
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
      ENERGY_REGEN_MINUTES,
      ENERGY_PER_REGEN,
      lastUpdate,
      diffMs,
      diffSeconds,
      regenCount
    } = energyCalculation;

    let interval: NodeJS.Timeout | null = null;
    
    if (regenCount > 0 && (user.energy ?? 0) < ENERGY_MAX) {
      let newEnergy = Math.min(ENERGY_MAX, (user.energy ?? 0) + regenCount * ENERGY_PER_REGEN);
      let secondsUsed = regenCount * ENERGY_REGEN_SPEED;
      let newLastUpdate = new Date(lastUpdate.getTime() + secondsUsed * 1000);
      updateUserEnergy(user.id, newEnergy, newLastUpdate.toISOString());
      updateUser({ ...user, energy: newEnergy, lastEnergyUpdate: newLastUpdate.toISOString() });
      setEnergyPopup(`${Math.floor(diffSeconds / 60)} dakika içinde ${regenCount} enerji kazandınız!`);
      setTimeout(() => setEnergyPopup(null), 5000);
      
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
            setEnergyPopup(`${Math.floor(ENERGY_REGEN_SPEED / 60)} dakika geçti, 1 enerji kazandınız!`);
            setTimeout(() => setEnergyPopup(null), 4000);
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
        if (process.env.NODE_ENV === 'development') {
          console.log('Home - Joker hakları güncellendi:', user?.jokers);
        }
      });
    }
  }, [refreshUser]);

  // Joker haklarını kontrol et
  useEffect(() => {
    if (user?.jokers && process.env.NODE_ENV === 'development') {
      console.log('Home - Mevcut joker hakları:', user.jokers);
      console.log('Home - Joker kullanım sayıları:', user.jokersUsed);
    }
  }, [user?.jokers, user?.jokersUsed]);

  const handleEditProfile = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Profil düzenleme sayfasına git...");
    }
    navigate('/edit-profile');
  }, [navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
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
          <style>{`
            .levelup-modal-overlay {
              position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh;
              background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center;
            }
            .levelup-modal {
              background: #fff; border-radius: 24px; padding: 40px 32px 32px 32px; box-shadow: 0 8px 32px #764ba244; min-width: 340px; text-align: center; position: relative;
              animation: popIn 0.7s cubic-bezier(.39,.575,.56,1.000) both;
            }
            .levelup-modal h2 { font-size: 2.2rem; color: #764ba2; margin-bottom: 12px; }
            .levelup-modal p { font-size: 1.2rem; color: #333; margin: 10px 0; }
            .close-modal-btn {
              margin-top: 18px; padding: 12px 32px; background: linear-gradient(90deg,#667eea,#764ba2); color: #fff; border: none; border-radius: 12px; font-weight: 700; font-size: 1.1rem; cursor: pointer;
            }
            .confetti {
              position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none;
              background: url('https://cdn.jsdelivr.net/gh/omerbyrk/confetti-bg/confetti-bg.svg');
              background-size: cover; opacity: 0.7; border-radius: 24px;
              animation: confetti-fade 1.5s;
            }
            @keyframes confetti-fade { 0% { opacity: 0; } 100% { opacity: 0.7; } }
            @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
      {/* Profil Kartı */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '18px 0 12px 0',
      }}>
        <div style={{
          background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
          borderRadius: 22,
          boxShadow: '0 6px 24px 0 #6c63ff33, 0 1px 8px #fff2',
          padding: '22px 22px 16px 22px',
          minWidth: 320,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(12px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.1)',
        }}>
          {/* Sağ üst köşeye sadece darkmode switch */}
          <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <DarkModeSwitch />
          </div>
          {/* Profil/Seviye Kartı */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ width: 100.8, height: 100.8, borderRadius: '50%', background: 'linear-gradient(135deg,#764ba2 0%,#667eea 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 55.2, color: '#fff', fontWeight: 900, boxShadow: '0 4.32px 25.92px #764ba244, 0 0 0 8.64px #fff2', border: '4.32px solid #fff', marginBottom: 2.88 }}>
                {user.avatar || '👤'}
              </div>
            </div>
            <div style={{ fontSize: 25.92, fontWeight: 900, color: '#333', marginBottom: 2.88, marginTop: 5.76, letterSpacing: 0.72 }}>{user.displayName}</div>
            <div style={{ fontSize: 18.72, fontWeight: 700, color: '#764ba2', marginBottom: 11.52 }}>{user.stats.rank || ''}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10.08, marginBottom: 8.64 }}>
              <span style={{ fontSize: 18.72, color: '#764ba2', fontWeight: 700 }}>Seviye</span>
              <span style={{ fontSize: 37.44, fontWeight: 900, color: '#fff', textShadow: '0 0 17.28px #764ba2cc, 0 2.16px 8.64px #fff8', letterSpacing: 1.44 }}>{user.stats.level || 1}</span>
            </div>
            <div style={{ width: 201.6, height: 17.28, background: '#e0e7ff', borderRadius: 10.08, overflow: 'hidden', marginBottom: 5.76, boxShadow: '0 2.16px 8.64px #764ba222' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 60%, #fff 100%)', backgroundSize: '200% 100%', animation: 'shineBar 2.5s linear infinite', borderRadius: 10.08, transition: 'width 1.1s cubic-bezier(.39,.575,.56,1.000)', boxShadow: '0 0 10.08px #764ba288', width: `${Math.min(100, Math.round((user.stats.experienceToNext > 0 ? (user.stats.experience / (user.stats.experience + user.stats.experienceToNext)) : 1) * 100))}%` }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8.64, fontSize: 15.84, color: '#764ba2', fontWeight: 700, marginBottom: 11.52 }}>
              <span>{user.stats.experience} / {user.stats.experience + user.stats.experienceToNext} XP</span>
              {user.stats.experienceToNext > 0 && <span style={{ color: '#333', fontWeight: 600, fontSize: 14.4 }}>({user.stats.experienceToNext} XP kaldı)</span>}
            </div>
            {/* Coin Bilgisi - Enerji Barının Üstünde, Ortalanmış */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 0 12px 0',
              position: 'relative',
              zIndex: 2,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8, // %20 küçültüldü
                background: 'linear-gradient(90deg, #fffbe7cc 0%, #ffe082cc 100%)',
                borderRadius: 13,
                boxShadow: '0 2px 10px #ffecb355',
                padding: '8px 22px', // %20 küçültüldü
                fontWeight: 900,
                fontSize: 21,
                color: '#ffb300',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                minWidth: 96,
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 32, marginRight: 6 }}>🪙</span>
                <span style={{ fontFamily: 'Orbitron, monospace', letterSpacing: 1, fontSize: 44 }}>{user.coins ?? 0}</span>
                <span style={{ fontWeight: 700, fontSize: 25, color: '#bfa040', marginLeft: 6 }}>coin</span>
              </div>
            </div>
          </div>
          {/* Enerji Barı ve motivasyon */}
          <div style={{ width: '100%', height: 25.92, background: 'rgba(35,41,70,0.7)', borderRadius: 14.4, position: 'relative', overflow: 'hidden', boxShadow: '0 0 17.28px #6c63ff22', marginBottom: 5.76 }}>
            <div style={{
              width: `${((user.energy ?? 0) / (user.energyLimit || 100)) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, #00fff0 0%, #6c63ff 60%, #a084ee 100%)`,
              borderRadius: 14.4,
              transition: 'width 0.7s cubic-bezier(.39,.575,.56,1.000)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'relative',
              boxShadow: (user.energy ?? 0) === (user.energyLimit || 100) ? '0 0 28.8px 8.64px #00fff088, 0 0 57.6px 0 #6c63ffcc' : '0 0 14.4px 2.88px #00fff055',
              animation: (user.energy ?? 0) === (user.energyLimit || 100) ? 'futuristicPulse 1.2s infinite alternate' : 'futuristicBarMove 2.5s linear infinite',
              zIndex: 2,
            }}>
              {/* Bar ucunda pulse ve glow efekti */}
              <span style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 23.04,
                height: 23.04,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00fff0cc 0%, #6c63ff00 80%)',
                opacity: 0.7,
                filter: 'blur(1.44px)',
                animation: (user.energy ?? 0) === 100 ? 'pulseGlow 1.2s infinite alternate' : 'none',
                zIndex: 3,
              }} />
              {/* Şimşek/Yıldırım animasyonu */}
              <span style={{
                position: 'absolute',
                right: 10.08,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 23.04,
                color: '#fffbe7',
                textShadow: '0 0 11.52px #00fff0, 0 0 23.04px #6c63ff',
                animation: 'futuristicLightning 0.7s infinite alternate, lightningShake 1.2s infinite',
                pointerEvents: 'none',
                filter: (user.energy ?? 0) === 100 ? 'drop-shadow(0 0 17.28px #00fff0)' : 'none',
                transition: 'color 0.5s, text-shadow 0.5s',
                zIndex: 4,
              }}>⚡</span>
            </div>
          </div>
          <div style={{ marginTop: 2.88, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <span style={{ fontWeight: 900, color: '#e0e0ff', fontSize: 25.92, letterSpacing: 0.72, fontFamily: 'Orbitron, monospace', textShadow: '0 0 8.64px #6c63ff' }}>{user.energy ?? 0}</span>
              <span style={{ fontWeight: 400, fontSize: 17.28, color: '#e0e0ff', marginLeft: 1.44, fontFamily: 'Orbitron, monospace' }}>/ {user.energyLimit || 100}</span>
            </span>
            <div style={{ fontWeight: 700, color: '#00fff0', fontSize: 14.4, marginTop:2.88, fontFamily: 'Orbitron, monospace', textShadow: '0 0 7.2px #00fff0', display: 'flex', alignItems: 'center', gap: 5.76 }}>
              {/* Dönen saat ikonu */}
              <span style={{ display: 'inline-block', animation: 'spinClock 2s linear infinite', fontSize: 15.84 }}>⏳</span>
              {regenCountdown > 0 && regenCountdown < 10000 && (
                <>Yeni enerji için: {Math.floor(regenCountdown / 60)}:{(regenCountdown % 60).toString().padStart(2, '0')}</>
              )}
            </div>
          </div>
          <style>{`
            @keyframes futuristicLightning {
              0% { filter: brightness(1.2) drop-shadow(0 0 8px #00fff0); }
              100% { filter: brightness(2.5) drop-shadow(0 0 24px #6c63ff); }
            }
            @keyframes lightningShake {
              0% { transform: translateY(-50%) translateX(0); }
              20% { transform: translateY(-50%) translateX(-2px); }
              40% { transform: translateY(-50%) translateX(2px); }
              60% { transform: translateY(-50%) translateX(-1px); }
              80% { transform: translateY(-50%) translateX(1px); }
              100% { transform: translateY(-50%) translateX(0); }
            }
            @keyframes futuristicPulse {
              0% { box-shadow: 0 0 40px 12px #00fff088, 0 0 80px 0 #6c63ffcc; }
              100% { box-shadow: 0 0 80px 24px #00fff0cc, 0 0 160px 0 #6c63ff; }
            }
            @keyframes pulseGlow {
              0% { opacity: 0.7; transform: scale(1); }
              100% { opacity: 1; transform: scale(1.15); }
            }
            @keyframes futuristicBarMove {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
            @keyframes spinClock {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes particleMove1 {
              0% { top: 18%; left: 12%; opacity: 0.7; }
              100% { top: 10%; left: 20%; opacity: 0.2; }
            }
            @keyframes particleMove2 {
              0% { top: 10%; left: 70%; opacity: 0.5; }
              100% { top: 20%; left: 60%; opacity: 0.1; }
            }
            @keyframes particleMove3 {
              0% { top: 80%; left: 40%; opacity: 0.6; }
              100% { top: 70%; left: 50%; opacity: 0.2; }
            }
            @keyframes particleMove4 {
              0% { top: 60%; left: 85%; opacity: 0.4; }
              100% { top: 50%; left: 75%; opacity: 0.1; }
            }
          `}</style>
        </div>
      </div>
      <SettingsActions onEditProfile={handleEditProfile} onLogout={logout} />
      
      {/* MARKET Butonu */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 8 }}>
        <button
          onClick={() => navigate('/market')}
          style={{
            background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
            color: '#764ba2',
            border: 'none',
            borderRadius: 16,
            padding: '12px 36px',
            fontSize: 20,
            fontWeight: 800,
            boxShadow: '0 4px 18px #ffb34744, 0 1px 8px #fff2',
            cursor: 'pointer',
            letterSpacing: 1,
            transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            marginBottom: 0,
            outline: 'none',
            textShadow: '0 1px 6px #fff8',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ffcc33 0%, #ffb347 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 28px #ffb34766, 0 0 0 8px #fff4'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px #ffb34744, 0 1px 8px #fff2'; }}
        >
          🛒 MARKET
        </button>
      </div>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4px',
            marginBottom: '0',
          }}
        >
          <div
            className="welcome-card-animated"
            style={{
              position: 'relative',
              padding: '17.71px 35.42px',
              minWidth: '193.2px',
              borderRadius: '22.54px',
              border: '2.415px solid #b39ddb',
              textAlign: 'center',
              fontSize: '1.4875rem',
              fontWeight: 900,
              color: '#764ba2',
              letterSpacing: '0.4375px',
              margin: 0,
              userSelect: 'none',
              overflow: 'hidden',
              boxShadow: '0 4.83px 25.76px #764ba244, 0 1.61px 9.66px #fff8',
              cursor: 'pointer',
              background: 'linear-gradient(120deg, #ffffffcc 0%, #e0c3fc99 100%)',
              animation: 'welcomeFadeBounce 1.2s cubic-bezier(.39,.575,.56,1.000) 0.1s both, borderGlow 3.5s infinite alternate',
              transition: 'box-shadow 0.25s, transform 0.18s',
              backdropFilter: 'blur(6.44px) saturate(1.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.035)'; e.currentTarget.style.boxShadow = '0 9.66px 38.64px #764ba288, 0 0 0 14.49px #fff4'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4.83px 25.76px #764ba244, 0 1.61px 9.66px #fff8'; }}
          >
            <div className="welcome-bg-gradient" style={{
              position: 'absolute',
              left: 0, top: 0, width: '100%', height: '100%',
              zIndex: 0,
              borderRadius: '22.54px',
              pointerEvents: 'none',
              background: 'linear-gradient(270deg, #e0c3fc 0%, #8ec5fc 100%, #f8ffae 100%)',
              opacity: 0.45,
              animation: 'gradientMove 8s ease-in-out infinite alternate',
            }} />
            <div className="welcome-shine" style={{
              position: 'absolute',
              left: '-48.3%', top: 0, width: '48.3%', height: '100%',
              background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.12) 100%)',
              transform: 'skewX(-24deg)',
              filter: 'blur(1.61px)',
              zIndex: 2,
              animation: 'shineMove 2.8s cubic-bezier(.39,.575,.56,1.000) 0.7s infinite',
              pointerEvents: 'none',
            }} />
            <span style={{ position: 'relative', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 8.75 }}>
              <span style={{ fontSize: '1.8375rem', marginRight: 5.25, filter: 'drop-shadow(0 1.75px 7px #fff8)' }}>👋</span>
              <span style={{ fontWeight: 900, color: '#5a3399', fontSize: '1.09375em', letterSpacing: '0.875px', textShadow: '0 1.75px 7px #fff8' }}>
                Hoşgeldin,
              </span>
              <span style={{ fontWeight: 900, color: '#ff6b6b', fontSize: '1.09375em', marginLeft: 7, textShadow: '0 1.75px 7px #fff8' }}>
                {user.displayName || 'Kullanıcı'}
              </span>
              <span style={{ fontSize: '1.4875rem', marginLeft: 5.25, filter: 'drop-shadow(0 1.75px 7px #fff8)' }}>🎉</span>
            </span>
            <style>
              {`
                @keyframes welcomeFadeBounce {
                  0% { opacity: 0; transform: translateY(-24.15px) scale(0.95); }
                  60% { opacity: 1; transform: translateY(6.44px) scale(1.04); }
                  80% { transform: translateY(-3.22px) scale(0.98); }
                  100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes borderGlow {
                  0% { box-shadow: 0 0 0 0 #b39ddb44, 0 4.83px 25.76px #764ba244, 0 1.61px 9.66px #fff8; border-color: #b39ddb; }
                  100% { box-shadow: 0 0 19.32px 4.83px #b39ddb88, 0 4.83px 25.76px #764ba244, 0 1.61px 9.66px #fff8; border-color: #9575cd; }
                }
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  100% { background-position: 100% 50%; }
                }
                @keyframes shineMove {
                  0% { left: -48.3%; }
                  100% { left: 88.55%; }
                }
              `}
            </style>
          </div>
        </div>

        <div className="action-buttons" style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 48, margin: '8px 0 0px 0', flexWrap: 'wrap'
        }}>
          <div
            className="category-card tyt-animated-card"
            onClick={() => navigate('/tyt-subjects')}
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              fontWeight: 900,
              cursor: 'pointer',
              userSelect: 'none',
              width: 320,
              height: 220,
              borderRadius: 28,
              boxShadow: '0 8px 32px #43e97b33',
              border: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              animation: 'popIn 0.7s cubic-bezier(.39,.575,.56,1.000) 0.1s both',
              position: 'relative',
              outline: 'none',
              textAlign: 'center',
              padding: 0,
              overflow: 'hidden'
            }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/tyt-subjects'); }}
          >
            <div className="tyt-animated-icon" style={{ fontSize: 64, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>📝</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>TYT</span>
              <span style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.18, marginTop: 2, maxWidth: '90%', whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>Temel Yeterlilik<br />Testi</span>
            </div>
            <span className="tyt-shine" />
          </div>
          <div
            className="category-card tyt-animated-card"
            onClick={() => navigate('/ayt-ea-subjects')}
            style={{
              background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
              color: 'white',
              fontWeight: 900,
              cursor: 'pointer',
              userSelect: 'none',
              width: 320,
              height: 220,
              borderRadius: 28,
              boxShadow: '0 8px 32px #43cea233',
              border: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              animation: 'popIn 0.7s cubic-bezier(.39,.575,.56,1.000) 0.2s both',
              position: 'relative',
              outline: 'none',
              textAlign: 'center',
              padding: 0,
              overflow: 'hidden'
            }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-ea-subjects'); }}
          >
            <div className="tyt-animated-icon" style={{ fontSize: 64, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>⚖️</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>AYT</span>
              <span style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.18, marginTop: 2, maxWidth: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Eşit Ağırlık</span>
            </div>
            <span className="tyt-shine" />
          </div>
          <div
            className="category-card tyt-animated-card"
            onClick={() => navigate('/ayt-say-subjects')}
            style={{
              background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
              color: 'white',
              fontWeight: 900,
              cursor: 'pointer',
              userSelect: 'none',
              width: 320,
              height: 220,
              borderRadius: 28,
              boxShadow: '0 8px 32px #f7971e33',
              border: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              animation: 'popIn 0.7s cubic-bezier(.39,.575,.56,1.000) 0.3s both',
              position: 'relative',
              outline: 'none',
              textAlign: 'center',
              padding: 0,
              overflow: 'hidden'
            }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-say-subjects'); }}
          >
            <div className="tyt-animated-icon" style={{ fontSize: 64, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>🧮</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>AYT</span>
              <span style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.18, marginTop: 2, maxWidth: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Sayısal</span>
            </div>
            <span className="tyt-shine" />
          </div>
          <div
            className="category-card tyt-animated-card"
            onClick={() => navigate('/ayt-soz-subjects')}
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              fontWeight: 900,
              cursor: 'pointer',
              userSelect: 'none',
              width: 320,
              height: 220,
              borderRadius: 28,
              boxShadow: '0 8px 32px #fa709a33',
              border: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              animation: 'popIn 0.7s cubic-bezier(.39,.575,.56,1.000) 0.4s both',
              position: 'relative',
              outline: 'none',
              textAlign: 'center',
              padding: 0,
              overflow: 'hidden'
            }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate('/ayt-soz-subjects'); }}
          >
            <div className="tyt-animated-icon" style={{ fontSize: 64, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>📖</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>AYT</span>
              <span style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.18, marginTop: 2, maxWidth: '90%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Sözel</span>
            </div>
            <span className="tyt-shine" />
          </div>
          <div
            className="category-card tyt-animated-card"
            onClick={() => navigate('/istatistikler')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 900,
              cursor: 'pointer',
              userSelect: 'none',
              width: 320,
              height: 220,
              borderRadius: 28,
              boxShadow: '0 8px 32px #667eea33',
              border: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              animation: 'popIn 0.7s cubic-bezier(.39,.575,.56,1.000) 0.5s both',
              position: 'relative',
              outline: 'none',
              textAlign: 'center',
              padding: 0,
              overflow: 'hidden'
            }}
            tabIndex={0}
          >
            <div className="tyt-animated-icon" style={{ fontSize: 64, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>📊</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontWeight: 900, fontSize: 38, lineHeight: 1.3, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', paddingTop: 2 }}>İSTATİSTİK</span>
              <span style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.18, marginTop: 2, maxWidth: '90%', whiteSpace: 'normal', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>Detaylı Analiz<br />ve Raporlar</span>
            </div>
            <span className="tyt-shine" />
          </div>
        </div>
        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.7) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .tyt-animated-card {
            position: relative;
            overflow: hidden;
          }
          .tyt-animated-card:hover, .tyt-animated-card:focus {
            filter: brightness(1.13) saturate(1.15);
            transform: scale(1.06) rotate(-1deg);
            box-shadow: 0 12px 36px #0003, 0 0 0 4px #fff4;
            z-index: 2;
          }
          .tyt-animated-card:active {
            filter: brightness(1.22) saturate(1.2);
            transform: scale(0.97) rotate(1deg);
            box-shadow: 0 2px 8px #0002;
          }
          .tyt-animated-card:hover .tyt-animated-icon {
            animation: tyt-icon-spin 0.7s cubic-bezier(.39,.575,.56,1.000);
          }
          @keyframes tyt-icon-spin {
            0% { transform: rotate(0deg) scale(1); }
            60% { transform: rotate(18deg) scale(1.18); }
            100% { transform: rotate(0deg) scale(1); }
          }
          .tyt-shine {
            content: '';
            position: absolute;
            top: -60%;
            left: -60%;
            width: 220%;
            height: 220%;
            background: linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 60%);
            transform: rotate(25deg);
            pointer-events: none;
            z-index: 1;
            animation: tyt-shine-move 2.2s linear infinite;
          }
          @keyframes tyt-shine-move {
            0% { left: -60%; top: -60%; }
            100% { left: 100%; top: 100%; }
          }
          @keyframes lightning-flicker {
            0%, 100% { opacity: 1; filter: brightness(1.2); }
            10% { opacity: 0.7; filter: brightness(2); }
            20% { opacity: 1; filter: brightness(1.5); }
            30% { opacity: 0.6; filter: brightness(2.5); }
            40% { opacity: 1; filter: brightness(1.2); }
            50% { opacity: 0.8; filter: brightness(2); }
            60% { opacity: 1; filter: brightness(1.2); }
            70% { opacity: 0.7; filter: brightness(2.2); }
            80% { opacity: 1; filter: brightness(1.2); }
            90% { opacity: 0.9; filter: brightness(2); }
          }
        `}</style>
      </div>
    </div>
  );
});

export default Home; 