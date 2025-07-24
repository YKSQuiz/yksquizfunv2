import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { GradientBackground } from '../../common/ui';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalSessionTime, setTotalSessionTime] = useState<number | null>(null);
  const navigate = useNavigate();
  const { login, register, loginWithGoogle } = useAuth();

  // Memoized values
  const buttonText = useMemo(() => ({
    submit: isLoading 
      ? (registerMode ? 'Kayıt olunuyor...' : 'Giriş yapılıyor...') 
      : (registerMode ? 'Kayıt Ol' : 'Giriş Yap'),
    google: `Google ile ${registerMode ? 'Kayıt Ol' : 'Giriş Yap'}`,
    toggle: registerMode ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'
  }), [isLoading, registerMode]);

  const sessionTimeDisplay = useMemo(() => {
    if (totalSessionTime === null) return null;
    return `Tüm zamanlarda uygulamada geçirilen süre: ${Math.floor(totalSessionTime / 60)} dk`;
  }, [totalSessionTime]);

  // Optimized functions
  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    handleError('');
    handleLoading(true);
    
    try {
      const success = registerMode 
        ? await register(email, password, name)
        : await login(email, password);
        
      if (success) {
        navigate('/');
      } else {
        const errorMessage = registerMode 
          ? 'Kayıt başarısız. Bilgileri kontrol edin.' 
          : 'Giriş başarısız. Bilgileri kontrol edin.';
        handleError(errorMessage);
      }
    } catch (err) {
      handleError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      handleLoading(false);
    }
  }, [registerMode, email, password, name, register, login, navigate, handleError, handleLoading]);

  const handleGoogleLogin = useCallback(async () => {
    handleError('');
    handleLoading(true);
    
    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate('/');
      } else {
        handleError('Google ile giriş başarısız.');
      }
    } catch (err) {
      handleError('Bir hata oluştu.');
    } finally {
      handleLoading(false);
    }
  }, [loginWithGoogle, navigate, handleError, handleLoading]);

  const handleEmailChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setTotalSessionTime(null);
    handleError('');

    if (value && value.includes('@')) {
      handleLoading(true);
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', value));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc?.data();
          const sessionTime = userData?.['totalSessionTime'] || userData?.['stats']?.totalSessionTime || 0;
          setTotalSessionTime(sessionTime);
        } else {
          setTotalSessionTime(null);
          handleError('Kullanıcı bulunamadı.');
        }
      } catch (err) {
        handleError('Bir hata oluştu.');
        setTotalSessionTime(null);
      }
      handleLoading(false);
    } else {
      setTotalSessionTime(null);
      handleError('');
    }
  }, [handleError, handleLoading]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleToggleMode = useCallback(() => {
    setRegisterMode(!registerMode);
    handleError('');
  }, [registerMode, handleError]);

  return (
    <GradientBackground variant="auth" showParticles={true} particleCount={8}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-icon">
            <img 
              src="/loginekran.gif" 
              alt="Login Animation" 
              className="auth-gif"
            />
          </div>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} autoComplete="on">
            {registerMode && (
              <div className="auth-form-group">
                <label htmlFor="name">Ad Soyad</label>
                <span className="auth-form-icon name">👤</span>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Adınızı girin"
                  required
                />
              </div>
            )}
            
            <div className="auth-form-group">
              <label htmlFor="email">E-posta</label>
              <span className="auth-form-icon email">✉️</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="ornek@email.com"
                required
              />
            </div>
            
            <div className="auth-form-group">
              <label htmlFor="password">Şifre</label>
              <span className="auth-form-icon password">🔒</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Şifrenizi girin"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-btn-primary"
              disabled={isLoading}
            >
              {buttonText.submit}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="auth-btn-secondary"
            disabled={isLoading}
          >
            <span className="google-icon">🔵</span> {buttonText.google}
          </button>

          <div className="auth-toggle-container">
            <button
              type="button"
              className="auth-btn-link"
              onClick={handleToggleMode}
              disabled={isLoading}
            >
              {buttonText.toggle}
            </button>
          </div>

          <div className="auth-info">
            Google veya e-posta ile giriş/kayıt olabilirsiniz.
          </div>

          {isLoading && <div className="auth-loading">Süre yükleniyor...</div>}
          {sessionTimeDisplay && (
            <div className="auth-session-time">
              {sessionTimeDisplay}
            </div>
          )}
        </div>
      </div>
    </GradientBackground>
  );
};

export default Login; 