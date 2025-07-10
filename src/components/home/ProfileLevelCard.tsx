import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ProfileLevelCardProps {
  avatar: string;
  displayName: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: string;
}

const rankIcons = [
  '🥉', // Bronz
  '🥈', // Gümüş
  '🥇', // Altın
  '💎', // Platin
  '👑'  // Elmas
];

function getRankIcon(level: number) {
  if (level >= 100) return rankIcons[4];
  if (level >= 80) return rankIcons[3];
  if (level >= 60) return rankIcons[2];
  if (level >= 40) return rankIcons[1];
  return rankIcons[0];
}

const ProfileLevelCard: React.FC<ProfileLevelCardProps> = ({ avatar, displayName, level, xp, xpToNext, rank }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const prevLevel = useRef(level);
  const rankIconRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const percent = Math.min(100, Math.round((xpToNext > 0 ? (xp / (xp + xpToNext)) : 1) * 100));

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = percent + '%';
    }
  }, [percent]);

  // Seviye atlama confetti ve animasyonlar
  useEffect(() => {
    if (level > prevLevel.current) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 },
        zIndex: 9999
      });
      // Rank ikonunu döndür
      if (rankIconRef.current) {
        rankIconRef.current.classList.add('rank-spin');
        setTimeout(() => rankIconRef.current?.classList.remove('rank-spin'), 1200);
      }
      // Avatar bounce
      if (avatarRef.current) {
        avatarRef.current.classList.add('avatar-bounce');
        setTimeout(() => avatarRef.current?.classList.remove('avatar-bounce'), 900);
      }
    }
    prevLevel.current = level;
  }, [level]);

  return (
    <div className="profile-level-card-unified modern-glass-card">
      <div className="plc-avatar-row">
        <div className="plc-avatar-big modern-avatar-glow" ref={avatarRef}>{avatar || '👤'}</div>
      </div>
      <div className="plc-name-row">{displayName}</div>
      <div className="plc-rank-row">
        {/* <span className="plc-rank-icon" ref={rankIconRef}>{getRankIcon(level)}</span> */}
        <span className="plc-rank-name">{rank}</span>
      </div>
      <div className="plc-level-row">
        <span className="plc-level-label">Seviye</span>
        <span className="plc-level-value-glow modern-level-glow">{level}</span>
      </div>
      <div className="plc-xp-bar-bg modern-xp-bar-bg">
        <div className="plc-xp-bar modern-xp-bar" ref={barRef}></div>
      </div>
      <div className="plc-xp-info-row modern-xp-info-row">
        <span className="plc-xp-value">{xp} / {xp + xpToNext} XP</span>
        {xpToNext > 0 && <span className="plc-xp-next">({xpToNext} XP kaldı)</span>}
      </div>
      <style>{`
        .modern-glass-card {
          background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
          background-blend-mode: lighten;
          box-shadow: 0 9px 36px #764ba244, 0 1.125px 6px #fff8;
          border-radius: 36px;
          padding: 49.5px 40.5px 36px 40.5px;
          min-width: 360px; max-width: 472.5px; margin: 0 auto 6px auto;
          border: 1.6875px solid rgba(120, 80, 220, 0.13);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          backdrop-filter: blur(15.75px) saturate(1.2);
          position: relative;
        }
        .plc-avatar-row { margin-bottom: 11.25px; }
        .modern-avatar-glow {
          width: 103.5px; height: 103.5px; border-radius: 50%; background: linear-gradient(135deg,#764ba2 0%,#667eea 100%);
          display: flex; align-items: center; justify-content: center; font-size: 3.4875rem; color: #fff; font-weight: 900;
          box-shadow: 0 4.5px 27px #764ba244, 0 0 0 9px #fff2;
          border: 4.5px solid #fff; margin-bottom: 2.25px;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .modern-avatar-glow:hover {
          box-shadow: 0 9px 36px #764ba288, 0 0 0 13.5px #fff4;
          transform: scale(1.06);
        }
        .plc-name-row {
          font-size: 1.51875rem; font-weight: 900; color: #333; margin-bottom: 2.25px; margin-top: 9px;
          letter-spacing: 0.5625px;
        }
        .plc-rank-row {
          display: flex; align-items: center; gap: 11.25px; margin-bottom: 20.25px;
        }
        .plc-rank-icon { font-size: 1.9125rem; filter: drop-shadow(0 2.25px 9px #fff8); }
        .plc-rank-name { font-size: 1.29375rem; font-weight: 700; color: #764ba2; letter-spacing: 1.125px; }
        .plc-level-row {
          display: flex; align-items: center; gap: 11.25px; margin-bottom: 11.25px;
        }
        .plc-level-label { font-size: 1.2375rem; color: #764ba2; font-weight: 700; }
        .plc-level-value-glow.modern-level-glow {
          font-size: 3.0375rem; font-weight: 900; color: #fff; text-shadow: 0 0 20.25px #764ba2cc, 0 2.25px 9px #fff8;
          letter-spacing: 1.6875px;
        }
        .modern-xp-bar-bg {
          width: 202.5px; height: 22.5px; background: #e0e7ff; border-radius: 13.5px; overflow: hidden; margin-bottom: 9px;
          box-shadow: 0 2.25px 9px #764ba222;
        }
        .modern-xp-bar {
          height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 60%, #fff 100%);
          background-size: 200% 100%;
          animation: shineBar 2.5s linear infinite;
          border-radius: 13.5px; transition: width 1.1s cubic-bezier(.39,.575,.56,1.000);
          box-shadow: 0 0 13.5px #764ba288;
        }
        @keyframes shineBar {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
        .modern-xp-info-row {
          display: flex; align-items: center; gap: 11.25px; font-size: 1.215rem; color: #764ba2; font-weight: 700; margin-bottom: 0;
        }
        .plc-xp-next { color: #333; font-weight: 600; font-size: 1.1475rem; }
        @media (max-width: 600px) {
          .modern-glass-card { min-width: 0; max-width: 98vw; padding: 20.25px 4.5vw 20.25px 4.5vw; }
          .modern-xp-bar-bg { width: 90vw; max-width: 247.5px; }
        }
      `}</style>
    </div>
  );
};

export default ProfileLevelCard; 