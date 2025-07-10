import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProfileLevelCard from './ProfileLevelCard';
import SettingsActions from '../common/SettingsActions';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { User } from '../../types/index';

const Home: React.FC = () => {
  const { user, logout, updateUser, refreshUser, manualResetJokers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [levelModalData, setLevelModalData] = useState<any>(null);

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

  useEffect(() => {
    if (refreshUser) {
      refreshUser().then(() => {
        console.log('Home - Joker hakları güncellendi:', user?.jokers);
      });
    }
  }, [refreshUser]);

  // Joker haklarını kontrol et
  useEffect(() => {
    if (user?.jokers) {
      console.log('Home - Mevcut joker hakları:', user.jokers);
      console.log('Home - Joker kullanım sayıları:', user.jokersUsed);
    }
  }, [user?.jokers, user?.jokersUsed]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleEditProfile = () => {
    console.log("Profil düzenleme sayfasına git...");
    navigate('/edit-profile');
  };

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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 2 }}>
        <ProfileLevelCard
          avatar={user.avatar}
          displayName={user.displayName}
          level={user.stats.level || 1}
          xp={user.stats.experience || 0}
          xpToNext={user.stats.experienceToNext || 0}
          rank={user.stats.rank || ''}
        />
      </div>
      
      {/* Manuel Joker Yenileme Butonu */}
      {user && user.jokers && user.jokersUsed && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 16,
          marginTop: 8,
        }}>
          <button
            onClick={async () => {
              try {
                await manualResetJokers();
                await refreshUser();
                alert('🎉 Joker hakları yenilendi! Tüm jokerler 3\'e sıfırlandı.');
              } catch (error) {
                console.error('Joker yenileme hatası:', error);
                alert('❌ Joker yenileme sırasında bir hata oluştu.');
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(118, 75, 162, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(118, 75, 162, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(118, 75, 162, 0.3)';
            }}
          >
            🔄 Joker Haklarını Yenile
          </button>
        </div>
      )}
      
      <SettingsActions onEditProfile={handleEditProfile} onLogout={logout} />
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
                Welcome,
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
};

export default Home; 