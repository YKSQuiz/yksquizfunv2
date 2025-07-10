import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

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
          const userData = userDoc.data();
          // Root level totalSessionTime'ı kontrol et, yoksa stats içindekini al
          const sessionTime = userData.totalSessionTime || userData.stats?.totalSessionTime || 0;
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
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Arka plan SVG Dünya - sağ alt köşe */}
      <svg
        viewBox="0 0 800 800"
        width="350"
        height="350"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          opacity: 0.12,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <circle cx="400" cy="400" r="350" fill="#fff" />
        <path d="M400,50 Q500,200 400,400 Q300,600 400,750" stroke="#667eea" strokeWidth="18" fill="none" />
        <path d="M400,50 Q300,200 400,400 Q500,600 400,750" stroke="#764ba2" strokeWidth="18" fill="none" />
        <ellipse cx="400" cy="400" rx="320" ry="120" fill="none" stroke="#667eea" strokeWidth="10" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="header">
          <h1 style={{ letterSpacing: 1, fontWeight: 800, fontSize: '2.5rem', color: '#fff', textShadow: '0 2px 16px #764ba2' }}>
            YKS Quiz
          </h1>
        </div>
        
        <div 
          className="card"
          style={{ 
            maxWidth: '400px', 
            margin: '40px auto',
            boxShadow: '0 8px 40px rgba(102,126,234,0.18)',
            borderRadius: '24px',
            padding: '40px 32px',
            background: 'rgba(255,255,255,0.98)',
            transition: 'box-shadow 0.3s',
            animation: 'fadeInDown 0.7s cubic-bezier(.39,.575,.56,1.000)'
          }}
        >
          {/* Dünya ikonu */}
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 48, display: 'inline-block', filter: 'drop-shadow(0 2px 8px #667eea44)' }}>🌍</span>
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontWeight: 700, letterSpacing: 0.5 }}>
            {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
          </h2>
          
          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 600
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} autoComplete="on">
            {registerMode && (
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="name">Ad Soyad</label>
                <span style={{
                  position: 'absolute',
                  left: 14,
                  top: 44,
                  color: '#667eea',
                  fontSize: 18,
                  pointerEvents: 'none',
                }}>👤</span>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınızı girin"
                  required
                  style={{ paddingLeft: 40 }}
                />
              </div>
            )}
            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="email">E-posta</label>
              <span style={{
                position: 'absolute',
                left: 14,
                top: 44,
                color: '#667eea',
                fontSize: 18,
                pointerEvents: 'none',
              }}>✉️</span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="ornek@email.com"
                required
                style={{ paddingLeft: 40 }}
              />
            </div>
            
            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="password">Şifre</label>
              <span style={{
                position: 'absolute',
                left: 14,
                top: 44,
                color: '#764ba2',
                fontSize: 18,
                pointerEvents: 'none',
              }}>🔒</span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                required
                style={{ paddingLeft: 40 }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                marginTop: '20px',
                fontSize: 18,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 12px #667eea22',
                transition: 'background 0.3s, transform 0.2s',
              }}
              disabled={isLoading}
              onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)')}
              onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)')}
            >
              {isLoading ? (registerMode ? 'Kayıt olunuyor...' : 'Giriş yapılıyor...') : (registerMode ? 'Kayıt Ol' : 'Giriş Yap')}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-secondary"
            style={{
              width: '100%',
              marginTop: 16,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#fff',
              color: '#333',
              border: '2px solid #667eea',
              fontWeight: 600
            }}
            disabled={isLoading}
          >
            <span style={{ fontSize: 20 }}>🔵</span> Google ile {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button
              type="button"
              className="btn btn-link"
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: 15,
                marginTop: 8
              }}
              onClick={() => {
                setRegisterMode(!registerMode);
                setError('');
              }}
              disabled={isLoading}
            >
              {registerMode ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
            </button>
          </div>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px', 
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '8px',
            fontSize: 14,
            color: '#666',
            fontWeight: 500
          }}>
            Demo için Google veya e-posta ile giriş/kayıt olabilirsiniz.
          </div>

          {isLoading && <div style={{ color: '#888', marginTop: 8, textAlign: 'center' }}>Süre yükleniyor...</div>}
          {totalSessionTime !== null && !isLoading && !error && (
            <div style={{ color: '#764ba2', fontWeight: 700, marginTop: 8, textAlign: 'center' }}>
              Tüm zamanlarda uygulamada geçirilen süre: {Math.floor(totalSessionTime / 60)} dk
            </div>
          )}
        </div>
      </div>
      {/* Animasyon için keyframes */}
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login; 