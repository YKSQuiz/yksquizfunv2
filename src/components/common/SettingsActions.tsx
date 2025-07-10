import React from 'react';
const FaEdit = require('react-icons/fa').FaEdit;
const FaSignOutAlt = require('react-icons/fa').FaSignOutAlt;

interface SettingsActionsProps {
  onEditProfile?: () => void;
  onLogout: () => void;
}

const SettingsActions: React.FC<SettingsActionsProps> = ({ onEditProfile, onLogout }) => {
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