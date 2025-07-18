import React from 'react';
import { FaEdit, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

interface SettingsActionsProps {
  onEditProfile?: () => void;
  onLogout: () => void;
}

const SettingsActions: React.FC<SettingsActionsProps> = ({ onEditProfile, onLogout }) => {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="settings-actions-panel">
      <div className="settings-actions-btns">
        <button className="settings-btn" onClick={onEditProfile}>
          <FaEdit className="settings-btn-icon" /> Profil Düzenle
        </button>
        <button className="settings-btn settings-btn-logout" onClick={onLogout}>
          <FaSignOutAlt className="settings-btn-icon" /> Çıkış Yap
        </button>
      </div>
      <div className="settings-actions-footer">
        {/* <a href="/privacy" className="settings-footer-link">Gizlilik Politikası</a>
        <span className="settings-footer-sep">·</span>
        <span className="settings-footer-version">v1.0.0</span> */}
      </div>
    </div>
  );
};

export default SettingsActions;

export const DarkModeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const [bouncing, setBouncing] = React.useState(false);
  const handleToggleDarkMode = () => {
    setBouncing(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => setBouncing(false), 400);
  };

  // SVG ikonları
  const SunSVG = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="9" fill="#FFD93B" />
      <g stroke="#FFD93B" strokeWidth="2">
        <line x1="16" y1="3" x2="16" y2="7" />
        <line x1="16" y1="25" x2="16" y2="29" />
        <line x1="3" y1="16" x2="7" y2="16" />
        <line x1="25" y1="16" x2="29" y2="16" />
        <line x1="6.2" y1="6.2" x2="9.5" y2="9.5" />
        <line x1="22.5" y1="22.5" x2="25.8" y2="25.8" />
        <line x1="6.2" y1="25.8" x2="9.5" y2="22.5" />
        <line x1="22.5" y1="9.5" x2="25.8" y2="6.2" />
      </g>
    </svg>
  );

  const MoonSVG = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 23C21.5 25.5 16.5 25 13.5 22C10.5 19 10 13.5 13 10.5C13.5 10 14 9.5 14.7 9.1C14.9 9 14.9 8.7 14.7 8.6C13.7 8.1 12.5 7.8 11.5 7.8C6.9 7.8 3.5 11.2 3.5 15.8C3.5 20.4 6.9 23.8 11.5 23.8C16.1 23.8 19.5 20.4 19.5 15.8C19.5 14.8 19.3 13.8 18.8 12.8C18.7 12.6 18.3 12.6 18.2 12.8C17.8 13.5 17.1 14.2 16.2 14.7C15 15.3 13.5 15.6 12.2 15.1C11.6 14.9 11.1 14.3 10.9 13.7C10.7 13.1 11.1 12.4 11.7 12.2C12.3 12 13 12.4 13.2 13C13.4 13.6 13 14.3 12.4 14.5C12 14.6 11.7 14.3 11.6 13.9C11.5 13.5 11.8 13.2 12.2 13.1C12.6 13 12.9 13.3 13 13.7C13.1 14.1 12.8 14.4 12.4 14.5" fill="#fff" stroke="#fff" strokeWidth="1.5"/>
      {/* Yıldızlar */}
      <circle cx="25" cy="10" r="1.4" fill="#fff" />
      <circle cx="28" cy="14" r="0.8" fill="#fff" />
      <ellipse cx="22.5" cy="13" rx="0.7" ry="1.1" fill="#fff" />
      {/* Bulut efekti */}
      <ellipse cx="27" cy="20" rx="2.5" ry="1.1" fill="#bbb" opacity="0.7" />
      <ellipse cx="24.5" cy="21.5" rx="1.5" ry="0.7" fill="#bbb" opacity="0.5" />
    </svg>
  );

  // Animasyon ve efektler için keyframe
  const bounceAnim = bouncing ? {
    animation: 'switch-bounce 0.4s cubic-bezier(.5,1.8,.5,1)'
  } : {};

  return (
    <>
      <style>{`
        @keyframes switch-bounce {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.12, 0.92) translateY(-2px); }
          60% { transform: scale(0.96, 1.08) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={darkMode}
        onClick={handleToggleDarkMode}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleToggleDarkMode(); }}
        style={{
          width: 90,
          height: 46,
          borderRadius: 30,
          background: darkMode
            ? 'linear-gradient(90deg, #181c2a 0%, #23243b 100%)'
            : 'linear-gradient(90deg, #a7c7ff 0%, #7b9fff 100%)',
          boxShadow: darkMode
            ? '0 0 0 3px #ffd93b, 0 2px 24px #000a'
            : '0 2px 16px #7b9fff88',
          border: darkMode ? '2.5px solid #ffd93b' : '2.5px solid #b3cfff',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s, border 0.5s',
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: darkMode ? 46 : 8,
            top: 3, // Eskiden 5'ti, şimdi 3
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: darkMode ? '#353545' : '#fff',
            boxShadow: darkMode
              ? '0 0 16px 2px #ffd93b88, 0 0 0 2px #23243b'
              : '0 2px 12px #bbb8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.5s cubic-bezier(.4,0,.2,1), background 0.5s',
            zIndex: 2,
            ...bounceAnim,
          }}
        >
          {darkMode ? MoonSVG : SunSVG}
        </div>
      </div>
    </>
  );
}; 