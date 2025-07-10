import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Quiz from './components/quiz/Quiz';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import EditProfile from './components/auth/EditProfile';
import TYTSubjects from './components/subjects/tyt/TYTSubjects';
import AYTEASubjects from './components/subjects/ayt/AYTEASubjects';
import AYTSaySubjects from './components/subjects/ayt/AYTSaySubjects';
import AYTSOZSubjects from './components/subjects/ayt/AYTSOZSubjects';
import TYTTrAltKonular from './components/subjects/tyt/TYTTrAltKonular';
import TYTTarihAltKonular from './components/subjects/tyt/TYTTarihAltKonular';
import TYTCografyaAltKonular from './components/subjects/tyt/TYTCografyaAltKonular';
import TYTFelsefeAltKonular from './components/subjects/tyt/TYTFelsefeAltKonular';
import TYTDinAltKonular from './components/subjects/tyt/TYTDinAltKonular';
import TYTMatematikAltKonular from './components/subjects/tyt/TYTMatematikAltKonular';
import TYTFizikAltKonular from './components/subjects/tyt/TYTFizikAltKonular';
import TYTKimyaAltKonular from './components/subjects/tyt/TYTKimyaAltKonular';
import TYTBiyolojiAltKonular from './components/subjects/tyt/TYTBiyolojiAltKonular';
import TestSelection from './components/quiz/TestSelection';
import AYTEdebiyatAltKonular from './components/subjects/ayt/AYTEdebiyatAltKonular';
import AYTTarihAltKonular from './components/subjects/ayt/AYTTarihAltKonular';
import AYTCografyaAltKonular from './components/subjects/ayt/AYTCografyaAltKonular';
import AYTMatematikAltKonular from './components/subjects/ayt/AYTMatematikAltKonular';
import AYTFizikAltKonular from './components/subjects/ayt/AYTFizikAltKonular';
import AYTKimyaAltKonular from './components/subjects/ayt/AYTKimyaAltKonular';
import AYTBiyolojiAltKonular from './components/subjects/ayt/AYTBiyolojiAltKonular';
import AYTFelsefeAltKonular from './components/subjects/ayt/AYTFelsefeAltKonular';
import AYTDinAltKonular from './components/subjects/ayt/AYTDinAltKonular';
import Istatistiklerim from './components/stats/Istatistiklerim';
import { FiArrowLeft } from "react-icons/fi";

const APP_ACTIVE_KEY = 'totalAppActiveSeconds';

function addActiveSeconds(seconds: number) {
  const prev = parseInt(localStorage.getItem(APP_ACTIVE_KEY) || '0', 10);
  localStorage.setItem(APP_ACTIVE_KEY, String(prev + seconds));
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  useEffect(() => {
    let start = Date.now();
    function saveSession() {
      const end = Date.now();
      const diffSeconds = Math.floor((end - start) / 1000);
      if (diffSeconds > 0) addActiveSeconds(diffSeconds);
      start = Date.now();
    }
    window.addEventListener('blur', saveSession);
    window.addEventListener('beforeunload', saveSession);
    window.addEventListener('focus', () => { start = Date.now(); });
    return () => {
      saveSession();
      window.removeEventListener('blur', saveSession);
      window.removeEventListener('beforeunload', saveSession);
      window.removeEventListener('focus', () => { start = Date.now(); });
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Giriş */}
            <Route path="/login" element={<Login />} />
            {/* Ana Sayfa */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            {/* Konu Seçimi */}
            {/* Removed: <Route path="/topics" element={<PrivateRoute><TopicSelection /></PrivateRoute>} /> */}
            {/* TYT Ana Konular */}
            <Route path="/tyt-subjects" element={<PrivateRoute><TYTSubjects /></PrivateRoute>} />
            {/* TYT Alt Konular */}
            <Route path="/tyt-turkce-altkonular" element={<PrivateRoute><TYTTrAltKonular /></PrivateRoute>} />
            <Route path="/tyt-tarih-altkonular" element={<PrivateRoute><TYTTarihAltKonular /></PrivateRoute>} />
            <Route path="/tyt-cografya-altkonular" element={<PrivateRoute><TYTCografyaAltKonular /></PrivateRoute>} />
            <Route path="/tyt-felsefe-altkonular" element={<PrivateRoute><TYTFelsefeAltKonular /></PrivateRoute>} />
            <Route path="/tyt-din-altkonular" element={<PrivateRoute><TYTDinAltKonular /></PrivateRoute>} />
            <Route path="/tyt-matematik-altkonular" element={<PrivateRoute><TYTMatematikAltKonular /></PrivateRoute>} />
            <Route path="/tyt-fizik-altkonular" element={<PrivateRoute><TYTFizikAltKonular /></PrivateRoute>} />
            <Route path="/tyt-kimya-altkonular" element={<PrivateRoute><TYTKimyaAltKonular /></PrivateRoute>} />
            <Route path="/tyt-biyoloji-altkonular" element={<PrivateRoute><TYTBiyolojiAltKonular /></PrivateRoute>} />
            {/* TYT Test Seçimi */}
            <Route path="/turkce/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/tarih/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/cografya/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/felsefe/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/din/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/matematik/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/fizik/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/kimya/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/biyoloji/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            {/* AYT Ana Konular */}
            <Route path="/ayt-say-subjects" element={<PrivateRoute><AYTSaySubjects /></PrivateRoute>} />
            <Route path="/ayt-ea-subjects" element={<PrivateRoute><AYTEASubjects /></PrivateRoute>} />
            <Route path="/ayt-soz-subjects" element={<PrivateRoute><AYTSOZSubjects /></PrivateRoute>} />
            {/* AYT Alt Konular */}
            <Route path="/ayt-matematik-altkonular" element={<PrivateRoute><AYTMatematikAltKonular /></PrivateRoute>} />
            <Route path="/ayt-fizik-altkonular" element={<PrivateRoute><AYTFizikAltKonular /></PrivateRoute>} />
            <Route path="/ayt-kimya-altkonular" element={<PrivateRoute><AYTKimyaAltKonular /></PrivateRoute>} />
            <Route path="/ayt-biyoloji-altkonular" element={<PrivateRoute><AYTBiyolojiAltKonular /></PrivateRoute>} />
            <Route path="/ayt-edebiyat-altkonular" element={<PrivateRoute><AYTEdebiyatAltKonular /></PrivateRoute>} />
            <Route path="/ayt-tarih-altkonular" element={<PrivateRoute><AYTTarihAltKonular /></PrivateRoute>} />
            <Route path="/ayt-cografya-altkonular" element={<PrivateRoute><AYTCografyaAltKonular /></PrivateRoute>} />
            <Route path="/ayt-felsefe-altkonular" element={<PrivateRoute><AYTFelsefeAltKonular /></PrivateRoute>} />
            <Route path="/ayt-din-altkonular" element={<PrivateRoute><AYTDinAltKonular /></PrivateRoute>} />
            {/* AYT Test Seçimi */}
            <Route path="/ayt-matematik/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-fizik/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-kimya/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-biyoloji/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-edebiyat/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-tarih/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-cografya/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-felsefe/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            <Route path="/ayt-din/:subTopic" element={<PrivateRoute><TestSelection /></PrivateRoute>} />
            {/* Quiz (TYT ve AYT ortak) */}
            <Route path="/quiz/:mainTopic/:subTopic/:testNumber" element={<PrivateRoute><Quiz /></PrivateRoute>} />
            {/* Edit Profile */}
            <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            {/* Istatistiklerim */}
            <Route path="/istatistikler" element={<PrivateRoute><Istatistiklerim /></PrivateRoute>} />
            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 