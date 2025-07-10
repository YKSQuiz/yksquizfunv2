import React from 'react';

interface ProfileCardProps {
  user: any;
  userStats?: any;
}

const getLevel = (stats?: any) => {
  // Demo: 20 soruda bir seviye atla
  const solved = stats?.totalQuestions || 0;
  return Math.floor(solved / 20) + 1;
};

const getExp = (stats?: any) => {
  // Demo: 1 soru = 10 exp, 20 soruda seviye atla
  const solved = stats?.totalQuestions || 0;
  return (solved % 20) * 10;
};

const getExpToNext = (stats?: any) => 200 - getExp(stats);

const ProfileCard: React.FC<ProfileCardProps> = ({ user, userStats }) => {
  const level = getLevel(userStats);
  const exp = getExp(userStats);
  const expToNext = getExpToNext(userStats);

  const handleAvatarClick = () => {
    alert('Profil fotoğrafı değiştirme yakında!');
  };

  return (
    <div className="profile-card">
      <div className="profile-bg-shape" />
      <div className="profile-avatar-wrapper" onClick={handleAvatarClick} tabIndex={0} title="Profil fotoğrafını değiştir">
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'Kullanıcı'}&background=667eea&color=fff&rounded=true&size=128`}
          alt="Profil"
          className="profile-avatar"
        />
        <div className="profile-avatar-edit">✏️</div>
      </div>
      <div className="profile-info">
        <div className="profile-name">{user?.displayName || 'Kullanıcı'}</div>
        <div className="profile-level">
          <span className="profile-level-badge">⭐</span>
          Seviye {level}
        </div>
        <div className="exp-bar-bg">
          <div className="exp-bar-fill" style={{ width: `${(exp/200)*100}%` }} />
        </div>
        <div className="exp-bar-label">
          {exp} / 200 EXP &nbsp; <span style={{ color: '#6366f1', fontWeight: 500 }}>(+{expToNext} EXP)</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 