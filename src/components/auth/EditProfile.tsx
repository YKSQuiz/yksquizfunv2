import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const avatarCategories: { [key: string]: string[] } = {
    'Meslekler': [
      '👨‍🎓', '👩‍🎓', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', 
      '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '👨‍💻', '👩‍💻',
      '👨‍🚀', '👩‍🚀', '👨‍🎨', '👩‍🎨', '👨‍🎭', '👩‍🎭',
      '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🚒', '👩‍🚒'
    ],
    'Hayvanlar': [
      '🦊', '🐱', '🐶', '🐼', '🐨', '🐯', '🦁', '🐸',
      '🐰', '🐹', '🐭', '🐻', '🐷', '🐮', '🐙', '🦄',
      '🐲', '🐉', '🦕', '🦖', '🐊', '🦈', '🐋', '🦒'
    ],
    'Fantastik': [
      '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧛‍♂️', '🧛‍♀️',
      '🧜‍♂️', '🧜‍♀️', '🧝‍♂️', '🧝‍♀️', '🧞‍♂️', '🧞‍♀️',
      '🧟‍♂️', '🧟‍♀️', '🧌', '👹', '👺', '👻', '👽', '🤖'
    ],
    'Eğlenceli': [
      '🤡', '👻', '💀', '☠️', '🎃', '👿', '😈', '🤠',
      '🦹‍♂️', '🦹‍♀️', '🦸‍♂️', '🦸‍♀️', '🤪', '🤨', '🤩', '🤯'
    ],
    'Spor': [
      '🏃‍♂️', '🏃‍♀️', '🚴‍♂️', '🚴‍♀️', '🏊‍♂️', '🏊‍♀️',
      '⛷️', '🏂', '🏋️‍♂️', '🏋️‍♀️', '🤸‍♂️', '🤸‍♀️'
    ],
    'Yüzler': [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
      '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
      '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜'
    ],
    'Özel': [
      '👾', '🤖', '🎮', '🕹️', '🎲', '🧩', '🎯', '🎪',
      '🎨', '🎭', '🎬', '🎤', '🎧', '🎼', '🎵', '🥁'
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState('Meslekler');
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false);

  const getRandomAvatar = () => {
    const categories = Object.keys(avatarCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const avatars = avatarCategories[randomCategory!] || [];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)] || '👤';
    setSelectedCategory(randomCategory!);
    setAvatar(randomAvatar);
    setShowAvatarAnimation(true);
    setTimeout(() => setShowAvatarAnimation(false), 500);
  };

  const handleAvatarSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    setShowAvatarAnimation(true);
    setTimeout(() => setShowAvatarAnimation(false), 500);
  };

  const handleSave = async () => {
    if (!user || !displayName.trim()) {
      setMessage('Lütfen bir kullanıcı adı girin');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        avatar: avatar
      });

      // AuthContext'teki user bilgisini güncelle
      if (updateUser) {
        updateUser({
          ...user,
          displayName: displayName.trim(),
          avatar: avatar
        });
      }

      setMessage('Profil başarıyla güncellendi!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      setMessage('Profil güncellenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="edit-profile-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="edit-profile-card" style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        animation: 'slideInUp 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#764ba2',
            margin: '0 0 8px 0'
          }}>
            Profil Düzenle
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0'
          }}>
            Profil bilgilerinizi güncelleyin
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px'
          }}>
            Kullanıcı Adı
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Kullanıcı adınızı girin"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.1rem',
              border: '2px solid #e1e5e9',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#764ba2'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px'
          }}>
            Avatar Seçin
          </label>
          
          {/* Seçilen Avatar Önizlemesi */}
          {avatar && (
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
              borderRadius: '16px',
              border: '2px solid #764ba2',
              animation: showAvatarAnimation ? 'avatarPulse 0.5s ease-in-out' : 'none'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '8px',
                animation: showAvatarAnimation ? 'avatarBounce 0.5s ease-in-out' : 'none'
              }}>
                {avatar}
              </div>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                margin: '0',
                fontWeight: '500'
              }}>
                Seçilen Avatar
              </p>
            </div>
          )}
          
          {/* Kategori Seçimi */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {Object.keys(avatarCategories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: selectedCategory === category ? '2px solid #764ba2' : '2px solid #e1e5e9',
                  borderRadius: '20px',
                  background: selectedCategory === category ? '#f8f9ff' : 'white',
                  color: selectedCategory === category ? '#764ba2' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#764ba2';
                    e.currentTarget.style.color = '#764ba2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#e1e5e9';
                    e.currentTarget.style.color = '#666';
                  }
                }}
              >
                {category}
              </button>
            ))}
            
            {/* Rastgele Avatar Butonu */}
            <button
              onClick={getRandomAvatar}
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '2px solid #ff6b6b',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🎲 Rastgele
            </button>
          </div>

          {/* Avatar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '12px',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #e1e5e9'
          }}>
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              marginBottom: '12px',
              padding: '8px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e1e5e9'
            }}>
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#764ba2'
              }}>
                {selectedCategory} ({avatarCategories[selectedCategory]?.length || 0} seçenek)
              </span>
            </div>
            {avatarCategories[selectedCategory]?.map((emoji: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAvatarSelect(emoji)}
                style={{
                  fontSize: '2.2rem',
                  padding: '12px',
                  border: avatar === emoji ? '3px solid #764ba2' : '2px solid #e1e5e9',
                  borderRadius: '12px',
                  background: avatar === emoji ? '#f8f9ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '60px'
                }}
                onMouseEnter={(e) => {
                  if (avatar !== emoji) {
                    e.currentTarget.style.borderColor = '#764ba2';
                    e.currentTarget.style.background = '#f8f9ff';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (avatar !== emoji) {
                    e.currentTarget.style.borderColor = '#e1e5e9';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '1rem',
            textAlign: 'center',
            background: message.includes('başarıyla') ? '#d4edda' : '#f8d7da',
            color: message.includes('başarıyla') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('başarıyla') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            style={{
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: '2px solid #e1e5e9',
              borderRadius: '12px',
              background: 'white',
              color: '#666',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#764ba2';
              e.currentTarget.style.color = '#764ba2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e1e5e9';
              e.currentTarget.style.color = '#666';
            }}
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(118, 75, 162, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes avatarPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes avatarBounce {
            0% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(0.9); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default EditProfile; 