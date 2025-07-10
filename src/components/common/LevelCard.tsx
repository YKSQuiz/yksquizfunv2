import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface LevelCardProps {
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

const xpIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#764ba2"/><text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">XP</text></svg>
);

const LevelCard: React.FC<LevelCardProps> = ({ level, xp, xpToNext, rank }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const prevLevel = useRef(level);
  const rankIconRef = useRef<HTMLSpanElement>(null);
  const percent = Math.min(100, Math.round((xpToNext > 0 ? (xp / (xp + xpToNext)) : 1) * 100));

  // Seviye atlama confetti
  useEffect(() => {
    if (level > prevLevel.current) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        zIndex: 9999
      });
      // Rank ikonunu döndür
      if (rankIconRef.current) {
        rankIconRef.current.classList.add('rank-spin');
        setTimeout(() => rankIconRef.current?.classList.remove('rank-spin'), 1200);
      }
    }
    prevLevel.current = level;
  }, [level]);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = percent + '%';
    }
  }, [percent]);

  return (
    <div className="level-card-glass moving-bg">
      <div className="level-rank-row">
        <span className="level-rank-icon" ref={rankIconRef}>{getRankIcon(level)}</span>
        <span className="level-rank-name">{rank}</span>
      </div>
      <div className="level-main-row">
        <div className="level-xp-icon">{xpIcon}</div>
        <div className="level-info">
          <div className="level-label">Seviye</div>
          <div className="level-value-glow bounce-anim">{level}</div>
        </div>
        <div className="level-xp-bar-container">
          <div className="level-xp-bar-bg">
            <div className="level-xp-bar shine-bar" ref={barRef}></div>
          </div>
          <div className="level-xp-text">{xp} XP</div>
        </div>
      </div>
      <div className="level-next-xp">
        {xpToNext > 0 ? `Bir sonraki seviyeye ${xpToNext} XP kaldı!` : 'Maksimum seviyedesin!'}
      </div>
      <style>{`
        .level-card-glass.moving-bg {
          background: linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%);
          background-size: 200% 200%;
          animation: bgMove 8s ease-in-out infinite;
        }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .level-rank-row {
          display: flex; align-items: center; gap: 16px; margin-bottom: 18px;
        }
        .level-rank-icon {
          font-size: 2.2rem; filter: drop-shadow(0 2px 8px #fff8);
          transition: transform 0.5s cubic-bezier(.39,.575,.56,1.000);
        }
        .level-rank-icon:hover {
          transform: scale(1.18) rotate(-10deg);
          filter: brightness(1.2) drop-shadow(0 0 8px #fff8);
        }
        .level-rank-name {
          font-size: 1.3rem; font-weight: 800; color: #764ba2; letter-spacing: 1px;
          text-shadow: 0 2px 8px #fff8;
        }
        .level-main-row { display: flex; align-items: center; gap: 22px; width: 100%; }
        .level-xp-icon { width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; }
        .level-info { display: flex; flex-direction: column; align-items: flex-start; }
        .level-label { font-size: 1.1rem; color: #764ba2; font-weight: 700; }
        .level-value-glow {
          font-size: 2.7rem; font-weight: 900; color: #fff; text-shadow: 0 0 16px #764ba2cc, 0 2px 8px #fff8;
          animation: glow 1.5s infinite alternate;
        }
        @keyframes glow {
          0% { text-shadow: 0 0 16px #764ba2cc, 0 2px 8px #fff8; }
          100% { text-shadow: 0 0 32px #764ba2, 0 2px 16px #fff8; }
        }
        .level-xp-bar-container { flex: 1; display: flex; flex-direction: column; align-items: flex-end; }
        .level-xp-bar-bg {
          width: 140px; height: 18px; background: #e0e7ff; border-radius: 10px; overflow: hidden; margin-bottom: 6px;
          box-shadow: 0 2px 8px #764ba222;
        }
        .level-xp-bar {
          height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px; transition: width 1.1s cubic-bezier(.39,.575,.56,1.000);
        }
        .level-xp-text { font-size: 1.08rem; color: #764ba2; font-weight: 700; }
        .level-next-xp {
          margin-top: 18px; font-size: 1.08rem; color: #333; font-weight: 600; text-align: center;
          background: rgba(255,255,255,0.45); border-radius: 10px; padding: 7px 18px; box-shadow: 0 2px 8px #764ba211;
        }
        @media (max-width: 600px) {
          .level-card-glass { min-width: 0; max-width: 98vw; padding: 18px 4vw 18px 4vw; }
          .level-main-row { flex-direction: column; gap: 10px; }
          .level-xp-bar-bg { width: 90vw; max-width: 220px; }
        }
        @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .level-value-glow.bounce-anim {
          animation: glow 1.5s infinite alternate, bounce 1.1s cubic-bezier(.39,.575,.56,1.000);
        }
        @keyframes bounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.18) translateY(-8px); }
          60% { transform: scale(0.95) translateY(2px); }
          100% { transform: scale(1); }
        }
        .level-xp-bar.shine-bar {
          position: relative;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 60%, #fff 100%);
          background-size: 200% 100%;
          animation: shineBar 2.5s linear infinite;
          box-shadow: 0 0 12px #764ba288;
        }
        @keyframes shineBar {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
        .rank-spin {
          animation: rankSpin 1.1s cubic-bezier(.39,.575,.56,1.000);
        }
        @keyframes rankSpin {
          0% { transform: rotate(0deg) scale(1); }
          60% { transform: rotate(380deg) scale(1.25); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LevelCard; 