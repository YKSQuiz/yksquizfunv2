import React, { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      let success = false;
      if (registerMode) {
        success = await register(email, password, name);
      } else {
        success = await login(email, password);
      }
      if (success) {
        navigate('/');
      } else {
        setError(registerMode ? 'Kayıt başarısız. Bilgileri kontrol edin.' : 'Giriş başarısız. Bilgileri kontrol edin.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate('/');
      } else {
        setError('Google ile giriş başarısız.');
      }
    } catch (err) {
      setError('Bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setTotalSessionTime(null);
    setError('');

    // E-posta formatı uygunsa Firestore'dan çek
    if (value && value.includes('@')) {
      setIsLoading(true);
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', value));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc?.data();
          // Root level totalSessionTime'ı kontrol et, yoksa stats içindekini al
          const sessionTime = userData?.['totalSessionTime'] || userData?.['stats']?.totalSessionTime || 0;
          setTotalSessionTime(sessionTime);
        } else {
          setTotalSessionTime(null);
          setError('Kullanıcı bulunamadı.');
        }
      } catch (err) {
        setError('Bir hata oluştu.');
        setTotalSessionTime(null);
      }
      setIsLoading(false);
    } else {
      setTotalSessionTime(null);
      setError('');
    }
  };

  return (
    <GradientBackground variant="auth" showParticles={true} particleCount={8}>
      <div className="auth-container">
        {/* Arka plan SVG Dünya - sağ alt köşe */}
        <svg
          viewBox="0 0 800 800"
          width="350"
          height="350"
          className="auth-background"
        >
        <circle cx="400" cy="400" r="350" fill="#fff" />
        <path d="M400,50 Q500,200 400,400 Q300,600 400,750" stroke="#667eea" strokeWidth="18" fill="none" />
        <path d="M400,50 Q300,200 400,400 Q500,600 400,750" stroke="#764ba2" strokeWidth="18" fill="none" />
        <ellipse cx="400" cy="400" rx="320" ry="120" fill="none" stroke="#667eea" strokeWidth="10" />
        </svg>

      <div className="auth-header">
        <h1>YKS Quiz</h1>
      </div>
      
      <div className="auth-card">
        {/* Dünya ikonu */}
        <div className="auth-icon">
          <span>🌍</span>
        </div>
        <h2 className="auth-title">
          {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
        </h2>
        
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
                onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (registerMode ? 'Kayıt olunuyor...' : 'Giriş yapılıyor...') : (registerMode ? 'Kayıt Ol' : 'Giriş Yap')}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="auth-btn-secondary"
          disabled={isLoading}
        >
          <span style={{ fontSize: 20 }}>🔵</span> Google ile {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            type="button"
            className="auth-btn-link"
            onClick={() => {
              setRegisterMode(!registerMode);
              setError('');
            }}
            disabled={isLoading}
          >
            {registerMode ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
          </button>
        </div>

        <div className="auth-info">
          Demo için Google veya e-posta ile giriş/kayıt olabilirsiniz.
        </div>

        {isLoading && <div className="auth-loading">Süre yükleniyor...</div>}
        {totalSessionTime !== null && !isLoading && !error && (
          <div className="auth-session-time">
            Tüm zamanlarda uygulamada geçirilen süre: {Math.floor(totalSessionTime / 60)} dk
          </div>
        )}
      </div>
    </div>
    </GradientBackground>
  );
};

export default Login; 