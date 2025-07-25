import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { GradientBackground } from '../../common/ui';

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Meslekler');
  const [showAvatarAnimation, setShowAvatarAnimation] = useState(false);

  // Avatar categories memoized
  const avatarCategories: { [key: string]: string[] } = useMemo(() => ({
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
  }), []);

  // Common styles memoized
  const styles = useMemo(() => ({
    container: {
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      width: '100%',
      animation: 'slideInUp 0.5s ease-out'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '32px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#764ba2',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#666',
      margin: '0'
    },
    label: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '16px',
      fontSize: '1.1rem',
      border: '2px solid #e1e5e9',
      borderRadius: '12px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box' as const
    },
    avatarPreview: {
      textAlign: 'center' as const,
      marginBottom: '20px',
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
      borderRadius: '16px',
      border: '2px solid #764ba2'
    },
    avatarEmoji: {
      fontSize: '4rem',
      marginBottom: '8px'
    },
    avatarLabel: {
      fontSize: '1rem',
      color: '#666',
      margin: '0',
      fontWeight: '500'
    },
    categoryContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap' as const,
      alignItems: 'center'
    },
    categoryButton: (isSelected: boolean) => ({
      padding: '8px 16px',
      fontSize: '0.9rem',
      fontWeight: '600',
      border: isSelected ? '2px solid #764ba2' : '2px solid #e1e5e9',
      borderRadius: '20px',
      background: isSelected ? '#f8f9ff' : 'white',
      color: isSelected ? '#764ba2' : '#666',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }),
    randomButton: {
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
    },
    avatarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: '12px',
      maxHeight: '300px',
      overflowY: 'auto' as const,
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: '12px',
      border: '2px solid #e1e5e9'
    },
    categoryHeader: {
      gridColumn: '1 / -1',
      textAlign: 'center' as const,
      marginBottom: '12px',
      padding: '8px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e1e5e9'
    },
    categoryTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#764ba2'
    },
    avatarButton: (isSelected: boolean) => ({
      fontSize: '2.2rem',
      padding: '12px',
      border: isSelected ? '3px solid #764ba2' : '2px solid #e1e5e9',
      borderRadius: '12px',
      background: isSelected ? '#f8f9ff' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60px'
    }),
    message: (isSuccess: boolean) => ({
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '24px',
      fontSize: '1rem',
      textAlign: 'center' as const,
      background: isSuccess ? '#d4edda' : '#f8d7da',
      color: isSuccess ? '#155724' : '#721c24',
      border: `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`
    }),
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center'
    },
    cancelButton: {
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
    },
    saveButton: (isLoading: boolean) => ({
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
    })
  }), []);

  // Optimized functions
  const triggerAvatarAnimation = useCallback(() => {
    setShowAvatarAnimation(true);
    setTimeout(() => setShowAvatarAnimation(false), 500);
  }, []);

  const getRandomAvatar = useCallback(() => {
    const categories = Object.keys(avatarCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const avatars = avatarCategories[randomCategory!] || [];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)] || '👤';
    setSelectedCategory(randomCategory!);
    setAvatar(randomAvatar);
    triggerAvatarAnimation();
  }, [avatarCategories, triggerAvatarAnimation]);

  const handleAvatarSelect = useCallback((selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    triggerAvatarAnimation();
  }, [triggerAvatarAnimation]);

  const handleSave = useCallback(async () => {
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
  }, [user, displayName, avatar, updateUser, navigate]);

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }, []);

  const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#764ba2';
  }, []);

  const handleInputBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#e1e5e9';
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleCategoryHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    if (selectedCategory !== category) {
      e.currentTarget.style.borderColor = '#764ba2';
      e.currentTarget.style.color = '#764ba2';
    }
  }, [selectedCategory]);

  const handleCategoryLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    if (selectedCategory !== category) {
      e.currentTarget.style.borderColor = '#e1e5e9';
      e.currentTarget.style.color = '#666';
    }
  }, [selectedCategory]);

  const handleRandomHover = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
  }, []);

  const handleRandomLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  }, []);

  const handleAvatarHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, emoji: string) => {
    if (avatar !== emoji) {
      e.currentTarget.style.borderColor = '#764ba2';
      e.currentTarget.style.background = '#f8f9ff';
      e.currentTarget.style.transform = 'scale(1.05)';
    }
  }, [avatar]);

  const handleAvatarLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>, emoji: string) => {
    if (avatar !== emoji) {
      e.currentTarget.style.borderColor = '#e1e5e9';
      e.currentTarget.style.background = 'white';
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, [avatar]);

  const handleCancelHover = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = '#764ba2';
    e.currentTarget.style.color = '#764ba2';
  }, []);

  const handleCancelLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = '#e1e5e9';
    e.currentTarget.style.color = '#666';
  }, []);

  const handleSaveHover = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoading) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(118, 75, 162, 0.3)';
    }
  }, [isLoading]);

  const handleSaveLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoading) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, [isLoading]);

  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  const isSuccessMessage = message.includes('başarıyla');

  return (
    <GradientBackground variant="auth" showParticles={true} particleCount={6}>
      <div className="edit-profile-container" style={styles.container}>
        <div className="edit-profile-card" style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              Profil Düzenle
            </h1>
            <p style={styles.subtitle}>
              Profil bilgilerinizi güncelleyin
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={styles.label}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={displayName}
              onChange={handleInputChange}
              placeholder="Kullanıcı adınızı girin"
              style={styles.input}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={styles.label}>
              Avatar Seçin
            </label>
            
            {avatar && (
              <div style={{
                ...styles.avatarPreview,
                animation: showAvatarAnimation ? 'avatarPulse 0.5s ease-in-out' : 'none'
              }}>
                <div style={{
                  ...styles.avatarEmoji,
                  animation: showAvatarAnimation ? 'avatarBounce 0.5s ease-in-out' : 'none'
                }}>
                  {avatar}
                </div>
                <p style={styles.avatarLabel}>
                  Seçilen Avatar
                </p>
              </div>
            )}
            
            <div style={styles.categoryContainer}>
              {Object.keys(avatarCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  style={styles.categoryButton(selectedCategory === category)}
                  onMouseEnter={(e) => handleCategoryHover(e, category)}
                  onMouseLeave={(e) => handleCategoryLeave(e, category)}
                >
                  {category}
                </button>
              ))}
              
              <button
                onClick={getRandomAvatar}
                style={styles.randomButton}
                onMouseEnter={handleRandomHover}
                onMouseLeave={handleRandomLeave}
              >
                🎲 Rastgele
              </button>
            </div>

            <div style={styles.avatarGrid}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryTitle}>
                  {selectedCategory} ({avatarCategories[selectedCategory]?.length || 0} seçenek)
                </span>
              </div>
              {avatarCategories[selectedCategory]?.map((emoji: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAvatarSelect(emoji)}
                  style={styles.avatarButton(avatar === emoji)}
                  onMouseEnter={(e) => handleAvatarHover(e, emoji)}
                  onMouseLeave={(e) => handleAvatarLeave(e, emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <div style={styles.message(isSuccessMessage)}>
              {message}
            </div>
          )}

          <div style={styles.buttonContainer}>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              style={styles.cancelButton}
              onMouseEnter={handleCancelHover}
              onMouseLeave={handleCancelLeave}
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              style={styles.saveButton(isLoading)}
              onMouseEnter={handleSaveHover}
              onMouseLeave={handleSaveLeave}
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
    </GradientBackground>
  );
};

export default EditProfile; 