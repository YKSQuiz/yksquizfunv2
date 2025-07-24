import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { FiArrowLeft, FiTarget, FiClock, FiCheckCircle, FiXCircle, FiBarChart2, FiPercent, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { UserStats } from '../../../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { GradientBackground } from '../../common/ui';
import './Stats.css';

// interface ChartData {
//   date: string;
//   correct: number;
//   incorrect: number;
//   successRate: number;
// }

// interface SubjectData {
//   name: string;
//   correct: number;
//   incorrect: number;
//   successRate: number;
// }

// Zaman aralığına göre dailyActivity verisini filtreleyen fonksiyon
// function filterDailyActivity(dailyActivity: { [date: string]: any }, range: 'week' | 'month' | '3months') {
//   if (!dailyActivity) return [];
//   const today = new Date();
//   const startDate = new Date();
//   if (range === 'week') {
//     startDate.setDate(today.getDate() - 6);
//   } else if (range === 'month') {
//     startDate.setDate(today.getDate() - 29);
//   } else if (range === '3months') {
//     startDate.setDate(today.getDate() - 89);
//   }
//   // Tarihleri sırala ve filtrele
//   return Object.entries(dailyActivity)
//     .map(([date, stats]) => ({ date, ...stats }))
//     .filter(item => {
//       const d = new Date(item.date);
//       return d >= startDate && d <= today;
//     })
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
// }

// Yardımcı: Belirli bir aralık için tüm günleri dizi olarak döndür
function getDateRangeArray(range: 'week' | 'month' | '3months') {
  const today = new Date();
  let days = 7;
  if (range === 'month') days = 30;
  else if (range === '3months') days = 90;
  const arr = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(d);
  }
  return arr;
}

const Istatistiklerim: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  // const [timeData, setTimeData] = useState<{day: string, minutes: number}[]>([
  //   { day: 'Pazartesi', minutes: 30 },
  //   { day: 'Salı', minutes: 45 },
  //   { day: 'Çarşamba', minutes: 20 },
  //   { day: 'Perşembe', minutes: 50 },
  //   { day: 'Cuma', minutes: 35 },
  //   { day: 'Cumartesi', minutes: 60 },
  //   { day: 'Pazar', minutes: 25 },
  // ]);
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | '3months'>('week');

  // Memoized subjects array
  // const subjects = React.useMemo(() => [
  //   { id: 'all', label: 'Tüm Dersler' },
  //   { id: 'tyt-turkce', label: 'TYT Türkçe' },
  //   { id: 'tyt-tarih', label: 'TYT Tarih' },
  //   { id: 'tyt-cografya', label: 'TYT Coğrafya' },
  //   { id: 'tyt-felsefe', label: 'TYT Felsefe' },
  //   { id: 'tyt-din', label: 'TYT Din' },
  //   { id: 'tyt-matematik', label: 'TYT Matematik' },
  //   { id: 'tyt-fizik', label: 'TYT Fizik' },
  //   { id: 'tyt-kimya', label: 'TYT Kimya' },
  //   { id: 'tyt-biyoloji', label: 'TYT Biyoloji' },
  //   { id: 'ayt-matematik', label: 'AYT Matematik' },
  //   { id: 'ayt-fizik', label: 'AYT Fizik' },
  //   { id: 'ayt-kimya', label: 'AYT Kimya' },
  //   { id: 'ayt-biyoloji', label: 'AYT Biyoloji' },
  //   { id: 'ayt-edebiyat', label: 'AYT Edebiyat' },
  //   { id: 'ayt-tarih', label: 'AYT Tarih' },
  //   { id: 'ayt-cografya', label: 'AYT Coğrafya' },
  //   { id: 'ayt-felsefe', label: 'AYT Felsefe' },
  //   { id: 'ayt-din', label: 'AYT Din' },
  // ], []);

  // Memoized colors array
  // const COLORS = React.useMemo(() => ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'], []);

  // Modern ve okunaklı özel tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 2px 12px #2563eb22', minWidth: 120 }}>
          <div style={{ fontWeight: 700, color: '#2563eb', marginBottom: 6 }}>{label}</div>
          {payload.map((p: any) => (
            <div key={p.dataKey} style={{ color: p.stroke, fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
              {p.name}: {p.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Genel istatistik kutuları için değerler
  const totalCorrect = userStats?.correctAnswers || 0;
  const totalQuestions = userStats?.totalQuestions || 0;
  const totalQuizzes = userStats?.totalQuizzes || 0;
  const experience = userStats?.experience || 0;
  const level = userStats?.level || 1;
  const rank = userStats?.rank || '';
  // const totalQuizTime = userStats?.totalQuizTime || 0; // saniye
  // const totalSessionTime = userStats?.totalSessionTime || 0; // dakika
  const successRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Zaman hesaplamaları - quizHistory kaldırıldığı için sadeleştirildi
  const calculateTimeStats = () => {
    // Quiz süresi: doğrudan totalQuizTime (saniye -> dakika)
    const totalQuizSeconds = userStats?.totalQuizTime || 0;
    const quizMinutes = Math.floor(totalQuizSeconds / 60);
    // Session süresi: Firebase'den totalSessionTime (dakika cinsinden)
    const sessionMinutes = userStats?.totalSessionTime || 0;
    return {
      quizMinutes,
      sessionMinutes,
      totalQuizSeconds
    };
  };
  const { quizMinutes, sessionMinutes } = calculateTimeStats();

  // Motivasyon sözleri
  const MOTIVATION_QUOTES = [
    "Başarı, tekrar tekrar denemekten geçer!",
    "Bugün attığın küçük adımlar, yarının büyük başarısıdır.",
    "Vazgeçme, en zor anlar en yakın olduğun anlardır.",
    "Her gün bir adım daha ileri!",
    "Kendine inan, başarabilirsin!",
    "Zorluklar, seni daha güçlü yapar.",
    "Hayallerin için çalışmaya devam et!",
    "Başlamak için mükemmel olmak zorunda değilsin."
  ];
  const todayIdx = new Date().getDate() % MOTIVATION_QUOTES.length;
  const todayQuote = MOTIVATION_QUOTES[todayIdx];

  // dailyActivity verisini seçilen aralığa göre filtrele
  // const filteredActivity = filterDailyActivity(userStats?.dailyActivity || {}, selectedRange);

  // Grafik için veri hazırlama (eksik günler 0'lı olacak)
  const dateArray = getDateRangeArray(selectedRange);
  const chartData = dateArray.map(dateObj => {
    const dateKey = dateObj.toISOString().split('T')[0];
    const activity = userStats?.dailyActivity?.[dateKey!] || { questionsSolved: 0, correctAnswers: 0 };
    return {
      date: dateObj.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }), // örn. 13 Tem
      solved: activity.questionsSolved || 0,
      correct: activity.correctAnswers || 0,
      incorrect: (activity.questionsSolved || 0) - (activity.correctAnswers || 0)
    };
  });

  // Grafik altı özet istatistikler
  const chartTotalSolved = chartData.reduce((sum, d) => sum + d.solved, 0);
  const chartTotalCorrect = chartData.reduce((sum, d) => sum + d.correct, 0);
  const chartTotalIncorrect = chartData.reduce((sum, d) => sum + d.incorrect, 0);
  const chartSuccessRate = chartTotalSolved > 0 ? Math.round((chartTotalCorrect / chartTotalSolved) * 100) : 0;
  const chartAvgDaily = chartData.length > 0 ? Math.round(chartTotalSolved / chartData.length) : 0;


  // Sayfa açıldığında Firestore'dan kullanıcı verisini her zaman güncel olarak çek
  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          // stats object'ini al ve root level totalSessionTime'ı da ekle
          const statsWithSessionTime = {
            ...userData.stats,
            totalSessionTime: userData.totalSessionTime || userData.stats?.totalSessionTime || 0
          };
          setUserStats(statsWithSessionTime);
        }
      }
      setLoading(false);
    };
    fetchStats();
    // eslint-disable-next-line
  }, [user]);

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loading">
          <div className="stats-loading-spinner"></div>
          <p>İstatistikler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <GradientBackground variant="stats" showParticles={true} particleCount={10}>
      <div className="container stats-page">
      {/* Modern Üst Başlık, Selamlama ve Ana Sayfaya Dön Butonu */}
      <div className="stats-header-modern" style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
        <button className="btn btn-secondary" onClick={() => navigate('/')}
          style={{display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, marginRight: 12}}>
          <FiArrowLeft size={18}/> Ana Sayfaya Dön
        </button>
        <div style={{flex: 1, textAlign: 'center'}}>
          <h1 className="stats-main-title animated-stats-title" style={{marginBottom: 6}}>Detaylı Analiz & İstatistiklerim</h1>
          <div className="stats-user-greeting">Merhaba, {user?.displayName || "Kullanıcı"}!</div>
        </div>
      </div>

      {/* Genel İstatistikler */}
      <div className="stats modern-stats-grid">
        <div className="stat-card success-card">
          <div className="stat-icon stat-icon-success"><FiTarget size={32}/></div>
          <h3>Genel Başarı Oranı</h3>
          <div className="stat-value">{successRate}%</div>
          <div className="stat-detail">{totalCorrect} / {totalQuestions} doğru</div>
        </div>
        <div className="stat-card test-card">
          <div className="stat-icon stat-icon-test"><FiClock size={32}/></div>
          <h3>Toplam Test</h3>
          <div className="stat-value">{totalQuizzes}</div>
          <div className="stat-detail">Çözülmüş Test</div>
          {/* Son çözülen test bilgisi kaldırıldı */}
        </div>
        <div className="stat-card time-card">
          <div className="stat-icon stat-icon-time"><FiClock size={32}/></div>
          <h3>Zaman İstatistikleri</h3>
          <div className="time-stats-container" style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {/* Quiz Süresi */}
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '12px 16px', 
              background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15) 0%, rgba(244, 114, 182, 0.05) 100%)', 
              borderRadius: 12,
              border: '1px solid rgba(244, 114, 182, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <span style={{fontSize: '20px'}}>🎯</span>
                <span style={{fontSize: '1rem', color: '#831843', fontWeight: 600}}>
                  Quiz Süresi
                </span>
              </div>
              <span style={{fontSize: '1.3rem', fontWeight: 800, color: '#f472b6'}}>
                {quizMinutes} dk
              </span>
            </div>
            
            {/* Uygulama Süresi */}
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '12px 16px', 
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)', 
              borderRadius: 12,
              border: '1px solid rgba(124, 58, 237, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <span style={{fontSize: '20px'}}>📱</span>
                <span style={{fontSize: '1rem', color: '#581c87', fontWeight: 600}}>
                  Uygulama Süresi
                </span>
              </div>
              <span style={{fontSize: '1.3rem', fontWeight: 800, color: '#7c3aed'}}>
                {sessionMinutes} dk
              </span>
            </div>
          </div>
        </div>
        <div className="stat-card xp-card">
          <div className="stat-icon stat-icon-xp"><FiTarget size={32}/></div>
          <h3>XP & Seviye</h3>
          <div className="stat-value xp-animated">{experience} <span style={{fontSize: '1.1rem', color: '#b45309', fontWeight: 700}}>XP</span></div>
          <div className="stat-detail xp-level">Seviye: <span style={{color: '#7c3aed', fontWeight: 900}}>{level}</span></div>
          {rank && (
            <div className="stat-detail xp-rank">{rank}</div>
          )}
        </div>
      </div>

      {/* 1. Grafik ve özet istatistikler bölümü */}
      <div style={{ marginTop: 32, background: '#f8f9fa', borderRadius: 16, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 18, marginTop: 8 }}>
          <h2 style={{
            fontWeight: 900,
            fontSize: 28,
            letterSpacing: 1,
            margin: 0,
            lineHeight: 1.2,
            display: 'inline-block',
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 4s ease infinite',
            textShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
          }}>
            Zamana Göre Soru Çözüm Grafiği
          </h2>
          <div style={{ width: 80, height: 3, background: 'linear-gradient(90deg, #2563eb 0%, #764ba2 100%)', borderRadius: 2, margin: '10px auto 0 auto', opacity: 0.25 }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 18, marginTop: 8 }}>
          <button
            className={`stats-range-btn${selectedRange === 'week' ? ' active' : ''}`}
            style={{ transition: 'all 0.22s cubic-bezier(.4,2,.6,1)', transform: selectedRange === 'week' ? 'scale(1.08)' : 'scale(1)', boxShadow: selectedRange === 'week' ? '0 4px 16px #2563eb22' : 'none' }}
            onClick={() => setSelectedRange('week')}
          >Son 1 Hafta</button>
          <button
            className={`stats-range-btn${selectedRange === 'month' ? ' active' : ''}`}
            style={{ transition: 'all 0.22s cubic-bezier(.4,2,.6,1)', transform: selectedRange === 'month' ? 'scale(1.08)' : 'scale(1)', boxShadow: selectedRange === 'month' ? '0 4px 16px #2563eb22' : 'none' }}
            onClick={() => setSelectedRange('month')}
          >Son 1 Ay</button>
          <button
            className={`stats-range-btn${selectedRange === '3months' ? ' active' : ''}`}
            style={{ transition: 'all 0.22s cubic-bezier(.4,2,.6,1)', transform: selectedRange === '3months' ? 'scale(1.08)' : 'scale(1)', boxShadow: selectedRange === '3months' ? '0 4px 16px #2563eb22' : 'none' }}
            onClick={() => setSelectedRange('3months')}
          >Son 3 Ay</button>
        </div>
        <div style={{ minHeight: 440, position: 'relative', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #2563eb11', padding: 8, margin: '0 auto', maxWidth: 990 }}>
          {chartData.length === 0 ? (
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', color: '#888', fontSize: '1.15rem', fontWeight: 500
            }}>
              Bu aralıkta gösterilecek veri yok.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={440}>
              <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ef" />
                <XAxis dataKey="date" tick={{ fontSize: 14, fill: '#64748b' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 14, fill: '#64748b' }} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: 15, paddingTop: 8 }} />
                <Area type="monotone" dataKey="solved" stroke="#2563eb" fill="#2563eb22" name="Çözülen Soru" fillOpacity={0.25} />
                <Line type="monotone" dataKey="solved" name="Çözülen Soru" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="correct" name="Doğru" stroke="#22c55e" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="incorrect" name="Yanlış" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        {/* Grafik altı özet istatistik kutuları */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 24, justifyContent: 'center' }}>
          <div style={{ background: '#f1f5ff', borderRadius: 12, padding: '16px 22px', minWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #2563eb11', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiBarChart2 size={28} color="#2563eb" style={{marginBottom: 6}} />
            <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 15 }}>Çözülen Soru</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#2563eb' }}>{chartTotalSolved}</div>
          </div>
          <div style={{ background: '#e0fce7', borderRadius: 12, padding: '16px 22px', minWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #22c55e11', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiCheckCircle size={28} color="#22c55e" style={{marginBottom: 6}} />
            <div style={{ fontWeight: 700, color: '#22c55e', fontSize: 15 }}>Toplam Doğru</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#22c55e' }}>{chartTotalCorrect}</div>
          </div>
          <div style={{ background: '#ffe4e6', borderRadius: 12, padding: '16px 22px', minWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #ef444411', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiXCircle size={28} color="#ef4444" style={{marginBottom: 6}} />
            <div style={{ fontWeight: 700, color: '#ef4444', fontSize: 15 }}>Toplam Yanlış</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#ef4444' }}>{chartTotalIncorrect}</div>
          </div>
          <div style={{ background: '#fef9c3', borderRadius: 12, padding: '16px 22px', minWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #facc1511', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiPercent size={28} color="#facc15" style={{marginBottom: 6}} />
            <div style={{ fontWeight: 700, color: '#facc15', fontSize: 15 }}>Başarı Oranı</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#facc15' }}>{chartSuccessRate}%</div>
          </div>
          <div style={{ background: '#e0e7ff', borderRadius: 12, padding: '16px 22px', minWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #2563eb11', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FiCalendar size={28} color="#6366f1" style={{marginBottom: 6}} />
            <div style={{ fontWeight: 700, color: '#6366f1', fontSize: 15 }}>Ortalama Günlük Soru</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#6366f1' }}>{chartAvgDaily}</div>
          </div>
        </div>
      </div>

      {/* 2. Toplam Kullanılan Joker ve joker kartları bölümü */}
      <div style={{ height: 32 }} />
      {user?.jokersUsed && (
        <div>
          <style>{`
            @keyframes hologramShimmer {
              0% { transform: translateX(-100%) skewX(-15deg); }
              100% { transform: translateX(200%) skewX(-15deg); }
            }
            
            @keyframes particleFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
              50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
            
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            @keyframes cardHover {
              0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1); }
              100% { transform: perspective(1000px) rotateX(10deg) rotateY(-10deg) scale(1.05); }
            }
            
            .hologram-card {
              position: relative;
              background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.3);
              border-radius: 16px;
              padding: 16px;
              min-width: 140px;
              max-width: 180px;
              min-height: 140px;
              box-shadow: 
                0 6px 24px rgba(0,0,0,0.1),
                0 3px 12px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,0.8);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              overflow: hidden;
              cursor: pointer;
            }
            
            .hologram-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,0.6),
                transparent
              );
              animation: hologramShimmer 3s infinite;
            }
            
            .hologram-card::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 4px;
              height: 4px;
              background: rgba(255,255,255,0.8);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              animation: particleFloat 2s infinite;
            }
            
            .hologram-card:hover {
              animation: cardHover 0.4s ease forwards;
              box-shadow: 
                0 20px 60px rgba(0,0,0,0.15),
                0 8px 32px rgba(0,0,0,0.1),
                inset 0 1px 0 rgba(255,255,255,0.9);
            }
            
            .hologram-card:hover::before {
              animation: hologramShimmer 1.5s infinite;
            }
            
            .joker-icon-3d {
              font-size: 2.5rem;
              margin-bottom: 12px;
              filter: drop-shadow(0 3px 10px rgba(0,0,0,0.3));
              transition: all 0.3s ease;
              display: block;
            }
            
            .hologram-card:hover .joker-icon-3d {
              transform: scale(1.2) rotateY(15deg);
              filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
            }
            
            .joker-label-3d {
              font-weight: 800;
              font-size: 1rem;
              margin-bottom: 8px;
              text-align: center;
              background: linear-gradient(45deg, #667eea, #764ba2);
              background-size: 200% 200%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: gradientShift 3s ease infinite;
            }
            
            .joker-value-3d {
              font-weight: 900;
              font-size: 1.2rem;
              text-align: center;
              color: #f093fb;
              padding: 6px 12px;
              border-radius: 10px;
              background: rgba(255,255,255,0.9);
              backdrop-filter: blur(5px);
              box-shadow: 0 3px 12px rgba(0,0,0,0.1);
              border: 1px solid rgba(240, 147, 251, 0.3);
              transition: all 0.3s ease;
            }
            
            .hologram-card:hover .joker-value-3d {
              background: rgba(255,255,255,0.95);
              box-shadow: 0 6px 20px rgba(0,0,0,0.15);
              transform: scale(1.05);
            }
            
            .joker-cards-container {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              justify-content: center;
              align-items: center;
              max-width: 900px;
              margin: 0 auto;
              padding: 16px;
            }
            
            @media (max-width: 768px) {
              .joker-cards-container {
                gap: 12px;
                padding: 12px;
              }
              .hologram-card {
                min-width: 120px;
                max-width: 140px;
                min-height: 120px;
                padding: 14px;
              }
              .joker-icon-3d {
                font-size: 2rem;
              }
              .joker-label-3d {
                font-size: 0.9rem;
              }
              .joker-value-3d {
                font-size: 1rem;
              }
            }
            
            @media (max-width: 480px) {
              .joker-cards-container {
                flex-direction: column;
                gap: 10px;
              }
              .hologram-card {
                min-width: 100px;
                max-width: 100%;
                min-height: 110px;
                padding: 12px;
              }
            }
          `}</style>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            margin: '0 auto',
            maxWidth: '990px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Başlık kısmı */}
            <div style={{
              textAlign: 'center',
              marginBottom: '24px',
              paddingBottom: '18px',
              borderBottom: '2px solid rgba(102, 126, 234, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 4s ease infinite',
                letterSpacing: 1,
                textShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                marginBottom: '6px'
              }}>
                Toplam Kullanılan Joker
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#f7971e',
                textShadow: '0 2px 8px rgba(247, 151, 30, 0.4)',
                letterSpacing: 2
              }}>
                {Object.values(user.jokersUsed).reduce((a, b) => a + b, 0)}
              </div>
            </div>
            {/* Beyaz kutu içindeki hologram efekti */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent)',
              animation: 'hologramShimmer 4s infinite',
              pointerEvents: 'none'
            }} />
            
            <div className="joker-cards-container" style={{
              background: 'transparent',
              padding: '0',
              margin: '0'
            }}>
              {[{
                icon: '➗', 
                label: '%50 Joker Hakkı', 
                value: user.jokersUsed.eliminate || 0,
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }, {
                icon: '⏰', 
                label: 'Ekstra Süre', 
                value: user.jokersUsed.extraTime || 0,
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              }, {
                icon: '2️⃣', 
                label: 'Çift Cevap', 
                value: user.jokersUsed.doubleAnswer || 0,
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              }, {
                icon: '✅', 
                label: 'Otomatik Doğru', 
                value: user.jokersUsed.autoCorrect || 0,
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              }].map((joker, i) => (
                <div
                  key={joker.label}
                  className="hologram-card"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(-10deg) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                  }}
                >
                  <span
                    className="joker-icon-3d"
                    style={{ 
                      color: joker.gradient.includes('667eea') ? '#667eea' : 
                              joker.gradient.includes('f093fb') ? '#f093fb' : 
                              joker.gradient.includes('4facfe') ? '#4facfe' : '#43e97b',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    {joker.icon}
                  </span>
                  <div className="joker-label-3d" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    {joker.label}
                  </div>
                  <div 
                    className="joker-value-3d"
                    style={{
                      color: joker.gradient.includes('667eea') ? '#667eea' : 
                             joker.gradient.includes('f093fb') ? '#f093fb' : 
                             joker.gradient.includes('4facfe') ? '#4facfe' : '#43e97b',
                      borderColor: joker.gradient.includes('667eea') ? 'rgba(102, 126, 234, 0.3)' : 
                                  joker.gradient.includes('f093fb') ? 'rgba(240, 147, 251, 0.3)' : 
                                  joker.gradient.includes('4facfe') ? 'rgba(79, 172, 254, 0.3)' : 'rgba(67, 233, 123, 0.3)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    {joker.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Eğer hiç veri yoksa motive edici mesaj */}
      {(!userStats || userStats.totalQuestions === 0) && (
        <div className="extra-empty-msg">
          <FiTarget size={28} style={{marginBottom: 8, color: '#2563eb'}}/>
          <div className="extra-empty-title">Henüz hiç test çözmedin!</div>
          <div className="extra-empty-desc">Haydi ilk testini çöz, gelişimini buradan takip edebilirsin!</div>
        </div>
      )}
      <div className="section-spacing" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: 'linear-gradient(90deg, #667eea 0%, #f093fb 100%)',
          borderRadius: 24,
          padding: 32,
          color: '#fff',
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 8px 32px #764ba222',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 38, marginBottom: 12, filter: 'drop-shadow(0 2px 8px #fff8)' }}>✨</div>
          <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12, letterSpacing: 0.5 }}>Günün Motivasyonu</h3>
          <div style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 500, opacity: 0.97 }}>{todayQuote}</div>
        </div>
      </div>
    </div>
    </GradientBackground>
  );
});

export default Istatistiklerim; 