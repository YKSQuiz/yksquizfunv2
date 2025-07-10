import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { FiArrowLeft, FiTrendingUp, FiClock, FiTarget, FiBarChart, FiCalendar, FiBookOpen, FiAlertTriangle, FiCheckCircle, FiXCircle, FiHelpCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { TYT_SUBJECTS, AYT_SAY_SUBJECTS, AYT_EA_SUBJECTS, AYT_SOZ_SUBJECTS } from '../../utils/constants';
import { UserStats } from '../../types';
import { TooltipProps } from 'recharts';

interface ChartData {
  date: string;
  correct: number;
  incorrect: number;
  successRate: number;
}

interface SubjectData {
  name: string;
  correct: number;
  incorrect: number;
  successRate: number;
  timeSpent: number;
}

const Istatistiklerim: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [worstSubject, setWorstSubject] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [timeData, setTimeData] = useState<{day: string, minutes: number}[]>([
    { day: 'Pazartesi', minutes: 30 },
    { day: 'Salı', minutes: 45 },
    { day: 'Çarşamba', minutes: 20 },
    { day: 'Perşembe', minutes: 50 },
    { day: 'Cuma', minutes: 35 },
    { day: 'Cumartesi', minutes: 60 },
    { day: 'Pazar', minutes: 25 },
  ]);

  // Tüm dersler (TYT/AYT ayrımı olmadan, label ve id ile)
  const subjects = [
    { id: 'all', label: 'Tüm Dersler' },
    { id: 'tyt-turkce', label: 'TYT Türkçe' },
    { id: 'tyt-tarih', label: 'TYT Tarih' },
    { id: 'tyt-cografya', label: 'TYT Coğrafya' },
    { id: 'tyt-felsefe', label: 'TYT Felsefe' },
    { id: 'tyt-din', label: 'TYT Din' },
    { id: 'tyt-matematik', label: 'TYT Matematik' },
    { id: 'tyt-fizik', label: 'TYT Fizik' },
    { id: 'tyt-kimya', label: 'TYT Kimya' },
    { id: 'tyt-biyoloji', label: 'TYT Biyoloji' },
    { id: 'ayt-matematik', label: 'AYT Matematik' },
    { id: 'ayt-fizik', label: 'AYT Fizik' },
    { id: 'ayt-kimya', label: 'AYT Kimya' },
    { id: 'ayt-biyoloji', label: 'AYT Biyoloji' },
    { id: 'ayt-edebiyat', label: 'AYT Edebiyat' },
    { id: 'ayt-tarih', label: 'AYT Tarih' },
    { id: 'ayt-cografya', label: 'AYT Coğrafya' },
    { id: 'ayt-felsefe', label: 'AYT Felsefe' },
    { id: 'ayt-din', label: 'AYT Din' },
  ];

  // Genel istatistikler (her zaman tüm zamanlar)
  const generalStats = {
    totalQuizzes: userStats?.totalQuizzes || 0,
    totalCorrect: userStats?.correctAnswers || 0,
    totalQuestions: userStats?.totalQuestions || 0,
    successRate: userStats?.totalQuestions && userStats?.totalQuestions > 0 
      ? Math.round((userStats?.correctAnswers! / userStats?.totalQuestions!) * 100) 
      : 0
  };

  // Zaman hesaplamaları - sıfırdan yeniden düzenlendi
  const calculateTimeStats = () => {
    // Quiz süresi: quizHistory'den duration toplamı (saniye -> dakika)
    const totalQuizSeconds = userStats?.quizHistory?.reduce((total, quiz) => {
      return total + (quiz.duration || 0);
    }, 0) || 0;
    const quizMinutes = Math.floor(totalQuizSeconds / 60);
    
    // Session süresi: Firebase'den totalSessionTime (dakika cinsinden)
    const sessionMinutes = userStats?.totalSessionTime || 0;
    
    // Debug: Zaman hesaplamaları
    console.log('🕒 Zaman hesaplamaları:', {
      totalQuizSeconds,
      quizMinutes,
      sessionMinutes,
      totalQuizzes: generalStats.totalQuizzes
    });
    
    return {
      quizMinutes,
      sessionMinutes,
      totalQuizSeconds
    };
  };
  
  const { quizMinutes, sessionMinutes } = calculateTimeStats();

  // Zaman aralığı seçenekleri
  const TIME_RANGES = [
    { value: '1d', label: 'Bugün' },
    { value: '1w', label: 'Son 1 Hafta' },
    { value: '1m', label: 'Son 1 Ay' },
    { value: '3m', label: 'Son 3 Ay' },
  ];
  const [selectedTimeRange, setSelectedTimeRange] = useState('1w');

  // Grafik için zaman aralığına göre eksiksiz gün listesiyle veri
  const getFilteredChartData = () => {
    if (!userStats || !userStats.quizHistory) return [];
    // Istanbul saatine göre 'now'
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    let days = 7;
    if (selectedTimeRange === '1d') days = 1;
    if (selectedTimeRange === '1m') days = 30;
    if (selectedTimeRange === '3m') days = 90;
    if (selectedTimeRange === '6m') days = 180;
    if (selectedTimeRange === 'all') days = 365; // 1 yıl sınırı, istenirse artırılabilir

    // Son N günün tarihlerini oluştur
    const dateList: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      // Eğer 1 gün ise saat bazında göster
      if (selectedTimeRange === '1d') {
        for (let h = 0; h < 24; h++) {
          const hourLabel = d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }) + ' ' + h + ':00';
          dateList.push(hourLabel);
        }
        break;
      } else {
        dateList.push(d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }));
      }
    }

    // Her gün/saat için quizHistory'den veri topla
    const chartMap: { [date: string]: { correct: number; incorrect: number; total: number } } = {};
    dateList.forEach(date => {
      chartMap[date] = { correct: 0, incorrect: 0, total: 0 };
    });
    userStats.quizHistory.forEach(q => {
      // UTC tarihini Istanbul saatine çevir
      const d = new Date(new Date(q.date).toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
      if (selectedTimeRange === '1d') {
        // Sadece bugünün kayıtlarını dahil et
        const todayStr = now.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const dStr = d.toLocaleDateString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        if (todayStr !== dStr) return;
        const hour = d.getHours();
        const key = d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }) + ' ' + hour + ':00';
        if (!chartMap[key]) chartMap[key] = { correct: 0, incorrect: 0, total: 0 };
        chartMap[key].correct += q.score;
        chartMap[key].incorrect += (q.totalQuestions - q.score);
        chartMap[key].total += q.totalQuestions;
      } else {
        if ((now.getTime() - d.getTime()) / (1000*60*60*24) > days - 1) return;
        const key = d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });
        if (!chartMap[key]) chartMap[key] = { correct: 0, incorrect: 0, total: 0 };
        chartMap[key].correct += q.score;
        chartMap[key].incorrect += (q.totalQuestions - q.score);
        chartMap[key].total += q.totalQuestions;
      }
    });
    return dateList.map(date => ({
      date,
      correct: chartMap[date].correct,
      incorrect: chartMap[date].incorrect,
      total: chartMap[date].total
    }));
  };
  const filteredChartData = getFilteredChartData();

  // Zaman aralığına göre özet istatistikler hesapla
  const summaryStats = (() => {
    const data = filteredChartData;
    const totalSolved = data.reduce((acc, d) => acc + d.total, 0);
    const totalCorrect = data.reduce((acc, d) => acc + d.correct, 0);
    const totalIncorrect = data.reduce((acc, d) => acc + d.incorrect, 0);
    const avgDaily = data.length > 0 ? Math.round(totalSolved / data.length) : 0;
    const successRate = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
    // En aktif gün
    let mostActiveDay = null;
    if (data.length > 0) {
      const max = Math.max(...data.map(d => d.total));
      const found = data.find(d => d.total === max);
      if (found && found.total > 0) mostActiveDay = found;
    }
    return { totalSolved, totalCorrect, totalIncorrect, avgDaily, successRate, mostActiveDay };
  })();
  // İlerleme mesajı (sadece 1w, 1m, 3m için)
  let progressMsg = null;
  if (["1w","1m","3m"].includes(selectedTimeRange)) {
    // Önceki dönemle kıyasla
    let prevDays = 7;
    if (selectedTimeRange === "1m") prevDays = 30;
    if (selectedTimeRange === "3m") prevDays = 90;
    const now = new Date();
    const prevStart = new Date(now);
    prevStart.setDate(now.getDate() - prevDays * 2 + 1);
    const prevEnd = new Date(now);
    prevEnd.setDate(now.getDate() - prevDays);
    // Önceki dönem verisi
    const prevData = (userStats?.quizHistory || []).filter(q => {
      const d = new Date(q.date);
      return d >= prevStart && d < prevEnd;
    });
    const prevTotal = prevData.reduce((acc, q) => acc + q.totalQuestions, 0);
    if (prevTotal > 0) {
      const diff = summaryStats.totalSolved - prevTotal;
      if (diff > 0) progressMsg = `Harika! Önceki döneme göre ${diff} daha fazla soru çözdün.`;
      else if (diff < 0) progressMsg = `Dikkat! Önceki döneme göre ${-diff} daha az soru çözdün.`;
      else progressMsg = `Aynı sayıda soru çözdün.`;
    }
  }

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



  // Zaman analiz bar grafiği için veri hazırlama
  const getTimeSpentData = () => {
    if (!userStats || !userStats.quizHistory) return [];
    const now = new Date();
    let days = 7;
    if (selectedTimeRange === '1d') days = 1;
    if (selectedTimeRange === '1m') days = 30;
    if (selectedTimeRange === '3m') days = 90;
    // Bugün için saatlik, diğerleri için günlük
    if (selectedTimeRange === '1d') {
      const hours = Array.from({length: 24}, (_, h) => h);
      const data = hours.map(hour => {
        const totalMinutes = userStats.quizHistory.filter(q => {
          const d = new Date(q.date);
          return d.toDateString() === now.toDateString() && d.getHours() === hour;
        }).reduce((acc, q) => acc + Math.round(q.duration / 60), 0);
        return { label: `${hour}:00`, minutes: totalMinutes };
      });
      return data;
    } else {
      const data = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const label = d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });
        const totalMinutes = userStats.quizHistory.filter(q => {
          const qd = new Date(q.date);
          return qd.toDateString() === d.toDateString();
        }).reduce((acc, q) => acc + Math.round(q.duration / 60), 0);
        data.push({ label, minutes: totalMinutes });
      }
      return data;
    }
  };
  const timeSpentData = getTimeSpentData();

  // totalSessionTime için zaman aralığına göre veri hazırla
  const getSessionTimeData = () => {
    if (!userStats) return [];
    // Eğer sessionHistory yoksa quizHistory'den otomatik oluştur
    // let sessionHistory = userStats.sessionHistory;
    // if (!sessionHistory && userStats.quizHistory) {
    //   sessionHistory = generateSessionHistoryFromQuizHistory(userStats.quizHistory);
    // }
    // if (!sessionHistory) {
    //   // Sadece toplamı göster
    // }
    // Günlük kırılım varsa, filtre uygula
    const now = new Date();
    let days = 7;
    if (selectedTimeRange === '1d') days = 1;
    if (selectedTimeRange === '1m') days = 30;
    if (selectedTimeRange === '3m') days = 90;
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });
      // sessionHistory: [{date: '2024-06-01', seconds: 1234}, ...]
      const entry = userStats.sessionHistory?.find((s: any) => {
        const sd = new Date(s.date);
        return sd.toDateString() === d.toDateString();
      });
      const minutes = entry ? Math.floor(entry.seconds / 60) : 0;
      data.push({ label, minutes });
    }
    return data;
  };
  const sessionTimeData = getSessionTimeData();

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

  const getTimeFilterLabel = () => {
    switch (timeFilter) {
      case 'daily': return 'Günlük';
      case 'weekly': return 'Haftalık';
      case 'monthly': return 'Aylık';
      default: return 'Haftalık';
    }
  };

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  // Tooltip için özel bileşen
  const CustomChartTooltip = ({ active, payload, label }: TooltipProps<any, string>) => {
    if (active && payload && payload.length) {
      const correct = payload.find((p: any) => p.name === 'Doğru');
      const incorrect = payload.find((p: any) => p.name === 'Yanlış');
      const total = payload.find((p: any) => p.name === 'Çözülen Soru');
      return (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px #0001' }}>
          <div style={{ marginBottom: 4 }}>{label}</div>
          {correct && <div style={{ color: '#22c55e' }}>Doğru : {correct.value}</div>}
          {incorrect && <div style={{ color: '#ef4444' }}>Yanlış : {incorrect.value}</div>}
          {total && <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.25rem' }}>Çözülen Soru : {total.value}</div>}
        </div>
      );
    }
    return null;
  };

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
          <div className="stat-value">{generalStats.successRate}%</div>
          <div className="stat-detail">{generalStats.totalCorrect} / {generalStats.totalQuestions} doğru</div>
        </div>
        <div className="stat-card test-card">
          <div className="stat-icon stat-icon-test"><FiBookOpen size={32}/></div>
          <h3>Toplam Test</h3>
          <div className="stat-value">{generalStats.totalQuizzes}</div>
          <div className="stat-detail">Çözülmüş Test</div>
          {/* Son çözülen test bilgisi */}
          {userStats?.quizHistory && userStats.quizHistory.length > 0 ? (
            (() => {
              const lastQuiz = userStats.quizHistory.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              const dateStr = new Date(lastQuiz.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
              return (
                <div className="stat-detail" style={{fontSize: '0.98rem', color: '#7c3aed', marginTop: 6}}>
                  Son test: <b>{lastQuiz.subjectName}</b>, {dateStr}
                </div>
              );
            })()
          ) : (
            <div className="stat-detail" style={{fontSize: '0.98rem', color: '#7c3aed', marginTop: 6}}>
              Henüz test çözülmedi
            </div>
          )}
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
          <div className="stat-icon stat-icon-xp"><FiTrendingUp size={32}/></div>
          <h3>XP & Seviye</h3>
          <div className="stat-value xp-animated">{userStats?.experience || 0} <span style={{fontSize: '1.1rem', color: '#b45309', fontWeight: 700}}>XP</span></div>
          <div className="stat-detail xp-level">Seviye: <span style={{color: '#7c3aed', fontWeight: 900}}>{userStats?.level || 1}</span></div>
          {userStats?.rank && (
            <div className="stat-detail xp-rank">{userStats.rank}</div>
          )}
        </div>
      </div>

      {/* Filtreler ve Grafik Alanı */}
      <div className="card stats-graph-summary-modern">
        <div className="stats-section-title">
          <FiTrendingUp style={{marginRight: 8}}/> Zamana göre soru çözüm grafiği
        </div>
        {/* Zaman filtresi radiobox grubu birleşik kutuda */}
        <div className="stats-filters-modern" style={{gap: 24, alignItems: 'center', background: 'none', boxShadow: 'none', padding: '0 0 18px 0', marginBottom: 0}}>
          <div className="filter-group" style={{flexDirection: 'row', gap: 18}}>
            {TIME_RANGES.map(opt => (
              <React.Fragment key={opt.value}>
                <input
                  type="radio"
                  name="timeRange"
                  value={opt.value}
                  checked={selectedTimeRange === opt.value}
                  onChange={e => setSelectedTimeRange(e.target.value)}
                  className="stats-time-range-radio"
                  id={`time-range-${opt.value}`}
                />
                <label
                  htmlFor={`time-range-${opt.value}`}
                  className="stats-time-range-label"
                  style={{marginRight: 0}}
                >
                  {opt.label}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={filteredChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomChartTooltip />} />
            <Line type="monotone" dataKey="correct" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} name="Doğru" />
            <Line type="monotone" dataKey="incorrect" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Yanlış" />
            <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} name="Çözülen Soru" />
          </LineChart>
        </ResponsiveContainer>
        <div className="stats-summary-modern" style={{boxShadow: 'none', background: 'none', marginBottom: 0, marginTop: 24}}>
          <div className="summary-row">
            <div className="summary-item"><FiBarChart className="summary-icon summary-blue"/> <span className="summary-label">Toplam Çözülen Soru:</span> <span className="summary-value">{summaryStats.totalSolved}</span></div>
            <div className="summary-item"><FiCheckCircle className="summary-icon summary-green"/> <span className="summary-label">Toplam Doğru:</span> <span className="summary-value">{summaryStats.totalCorrect}</span></div>
            <div className="summary-item"><FiXCircle className="summary-icon summary-red"/> <span className="summary-label">Toplam Yanlış:</span> <span className="summary-value">{summaryStats.totalIncorrect}</span></div>
            <div className="summary-item"><FiTrendingUp className="summary-icon summary-purple"/> <span className="summary-label">Başarı Oranı:</span> <span className="summary-value">{summaryStats.successRate}%</span></div>
          </div>
          <div className="summary-row">
            <div className="summary-item"><FiClock className="summary-icon summary-orange"/> <span className="summary-label">Ortalama Günlük Soru:</span> <span className="summary-value">{summaryStats.avgDaily}</span></div>
            {summaryStats.mostActiveDay && (
              <div className="summary-item"><FiCalendar className="summary-icon summary-blue"/> <span className="summary-label">En Aktif Gün:</span> <span className="summary-value">{summaryStats.mostActiveDay.date} ({summaryStats.mostActiveDay.total} soru)</span></div>
            )}
          </div>
          {progressMsg && (
            <div className="summary-progress-msg">{progressMsg}</div>
          )}
        </div>
      </div>

      {/* Gelişmiş Motivasyon Bölümü */}
      {/* Toplam Joker Kullanımı */}
      {user?.jokersUsed && (
        <div style={{
          margin: '0 auto 32px auto',
          maxWidth: 1100,
          background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
          borderRadius: 36,
          padding: '40px 0 40px 0',
          color: '#3a2500',
          fontWeight: 700,
          fontSize: '1rem',
          boxShadow: '0 12px 48px 0 rgba(80,80,180,0.10)',
          textAlign: 'center',
          letterSpacing: 0.2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeInDown 0.8s cubic-bezier(.23,1.01,.32,1)'
        }}>
          <style>{`
            @keyframes fadeInDown {
              0% { opacity: 0; transform: translateY(-40px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes iconBounce {
              0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
              30% { transform: scale(1.18) rotate(-10deg); filter: brightness(1.3); }
              60% { transform: scale(0.95) rotate(8deg); filter: brightness(1.1); }
              100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
            }
            @media (max-width: 800px) {
              .joker-cards-row { flex-wrap: wrap !important; gap: 24px !important; }
              .joker-card { min-width: 120px !important; max-width: 160px !important; margin-bottom: 18px !important; }
            }
            @media (max-width: 600px) {
              .joker-cards-row { flex-direction: column !important; gap: 18px !important; }
              .joker-card { min-width: 90px !important; max-width: 100% !important; margin-bottom: 12px !important; }
            }
          `}</style>
          <div style={{
            fontSize: '1.7rem',
            fontWeight: 900,
            marginBottom: 36,
            background: 'linear-gradient(90deg, #7c3aed 0%, #f7971e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 0.5,
            textShadow: '0 2px 12px #f7971e22',
            transition: 'all 0.3s',
          }}>
            Toplam Kullanılan Joker: <span style={{color:'#b45309', WebkitTextFillColor: '#b45309', textShadow: '0 2px 8px #f7971e33'}}>{Object.values(user.jokersUsed).reduce((a, b) => a + b, 0)}</span>
          </div>
          <div className="joker-cards-row" style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 48,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'gap 0.3s',
          }}>
            {[{
              icon: '➗', color: '#7c3aed', label: 'Elenen Şık', labelColor: '#a16207', value: user.jokersUsed.eliminate || 0, valueColor: '#b45309', shadow: '#a78bfa33'
            }, {
              icon: '⏰', color: '#f43f5e', label: 'Ekstra Süre', labelColor: '#2563eb', value: user.jokersUsed.extraTime || 0, valueColor: '#1e293b', shadow: '#f43f5e33'
            }, {
              icon: '2️⃣', color: '#0ea5e9', label: 'Çift Cevap', labelColor: '#0ea5e9', value: user.jokersUsed.doubleAnswer || 0, valueColor: '#1e293b', shadow: '#0ea5e933'
            }, {
              icon: '✅', color: '#22c55e', label: 'Otomatik Doğru', labelColor: '#22c55e', value: user.jokersUsed.autoCorrect || 0, valueColor: '#16a34a', shadow: '#22c55e33'
            }].map((joker, i) => (
              <div
                key={joker.label}
                className="joker-card"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'radial-gradient(circle at 60% 40%, #fff 80%, #f1f5ff 100%)',
                  borderRadius: '50%',
                  padding: 0,
                  minWidth: 140, maxWidth: 180, width: '100%',
                  minHeight: 170, height: 170,
                  boxShadow: `0 4px 24px ${joker.shadow}, 0 1.5px 0 #e0e7ef inset`,
                  margin: 1,
                  border: '2.5px solid #f1f5f9',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s, transform 0.25s, background 0.25s',
                  willChange: 'transform',
                  position: 'relative',
                  animation: `fadeInDown 0.7s ${0.1 + i * 0.1}s cubic-bezier(.23,1.01,.32,1) both`,
                  filter: 'drop-shadow(0 2px 8px #fff8)',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 36px ${joker.shadow}, 0 1.5px 0 #e0e7ef inset`;
                  e.currentTarget.style.transform = 'scale(1.10)';
                  const icon = e.currentTarget.querySelector('.joker-icon') as HTMLElement | null;
                  if (icon) icon.style.animation = 'iconBounce 0.7s';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 4px 24px ${joker.shadow}, 0 1.5px 0 #e0e7ef inset`;
                  e.currentTarget.style.transform = 'scale(1)';
                  const icon = e.currentTarget.querySelector('.joker-icon') as HTMLElement | null;
                  if (icon) icon.style.animation = 'none';
                }}
              >
                <span
                  className="joker-icon"
                  style={{
                    fontSize:'2.7rem', color: joker.color, marginBottom:14, transition: 'filter 0.3s, transform 0.3s', filter: 'drop-shadow(0 2px 8px #7c3aed22)',
                    display: 'inline-block',
                  }}
                >{joker.icon}</span>
                <span style={{fontWeight:800, color: joker.labelColor, fontSize:'1.18rem', marginBottom:10, letterSpacing:0.1, textShadow: `0 1px 8px ${joker.shadow}`}}>{joker.label}</span>
                <span style={{fontWeight:900, color: joker.valueColor, fontSize:'1.35rem', letterSpacing:0.2, background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '2px 12px', marginTop: 0, boxShadow: `0 1px 6px ${joker.shadow}`}}>{joker.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{
        marginTop: 32,
        padding: 0,
        background: 'none'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          borderRadius: 32,
          padding: 44,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(118, 75, 162, 0.18), 0 8px 32px rgba(102, 126, 234, 0.13)',
          color: 'white',
          textAlign: 'center',
          minHeight: 210,
          maxWidth: 700,
          margin: '0 auto',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1.5px solid #e0e7ef44',
          animation: 'fadeInMotivation 1.1s cubic-bezier(.23,1.01,.32,1)'
        }}>
          <style>{`
            @keyframes fadeInMotivation {
              0% { opacity: 0; transform: translateY(40px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes shine {
              0% { filter: brightness(1) drop-shadow(0 0 0 #fff); }
              50% { filter: brightness(1.5) drop-shadow(0 0 12px #fff6); }
              100% { filter: brightness(1) drop-shadow(0 0 0 #fff); }
            }
            @media (max-width: 600px) {
              .motivation-title { font-size: 1.1rem !important; }
              .motivation-quote { font-size: 0.95rem !important; }
            }
          `}</style>
          {/* Dekoratif elemanlar */}
          <div style={{
            position: 'absolute',
            top: -20, right: -20, width: 100, height: 100,
            background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', opacity: 0.5
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: -30, left: -30, width: 80, height: 80,
            background: 'rgba(255, 255, 255, 0.10)', borderRadius: '50%', opacity: 0.7
          }}></div>
          {/* Ana içerik */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <div style={{
              fontSize: '3rem',
              marginBottom: 18,
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))',
              animation: 'shine 2.2s infinite',
              display: 'inline-block',
              transition: 'transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(-12deg) scale(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >✨</div>
            {/* Başlık */}
            <h2 className="motivation-title" style={{
              fontSize: '1.7rem',
              fontWeight: 900,
              marginBottom: 18,
              background: 'linear-gradient(90deg, #fff 0%, #ffe082 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 12px #fff3',
              letterSpacing: '0.5px',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}>
              Günün Motivasyonu
            </h2>
            {/* Quote */}
            <div className="motivation-quote" style={{
              fontSize: '1.15rem',
              lineHeight: 1.7,
              fontWeight: 600,
              marginBottom: 20,
              fontStyle: 'italic',
              textShadow: '0 1px 8px rgba(0,0,0,0.13)',
              maxWidth: '600px',
              margin: '0 auto 20px',
              color: '#fff',
              opacity: 0.95,
              animation: 'fadeInMotivation 1.5s 0.3s both',
              position: 'relative',
              display: 'inline-block',
            }}>
              “{todayQuote}”
              <div style={{
                width: '60%', height: 3, background: 'linear-gradient(90deg, #fff 0%, #ffe082 100%)',
                borderRadius: 2, margin: '12px auto 0 auto', opacity: 0.5
              }}></div>
            </div>
            {/* Decorative element */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.6)' }}></div>
              <div style={{ width: 24, height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.8)' }}></div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.6)' }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Eğer hiç veri yoksa motive edici mesaj */}
      {(!userStats || userStats.totalQuestions === 0) && (
        <div className="extra-empty-msg">
          <FiHelpCircle size={28} style={{marginBottom: 8, color: '#2563eb'}}/>
          <div className="extra-empty-title">Henüz hiç test çözmedin!</div>
          <div className="extra-empty-desc">Haydi ilk testini çöz, gelişimini buradan takip edebilirsin!</div>
        </div>
      )}
    </div>
  );
};

export default Istatistiklerim; 