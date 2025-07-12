import React, { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { updateXpLevelRank, jokerKullan } from '../../contexts/AuthContext';
import './Quiz.css';
import { User } from '../../types/index';
import { usePerformanceMonitor } from '../../utils/performance';
import { useABTest } from '../../utils/abTesting';
import {
  TYT_SUBJECTS, AYT_SAY_SUBJECTS, AYT_EA_SUBJECTS, AYT_SOZ_SUBJECTS,
  TYT_TR_ALT_KONULAR, TYT_DIN_ALT_KONULAR, TYT_FIZIK_ALT_KONULAR, TYT_KIMYA_ALT_KONULAR, TYT_BIYOLOJI_ALT_KONULAR, TYT_COGRAFYA_ALT_KONULAR, TYT_TARIH_ALT_KONULAR,
  AYT_EDEBIYAT_ALT_KONULAR, AYT_FELSEFE_ALT_KONULAR, AYT_BIYOLOJI_ALT_KONULAR, AYT_KIMYA_ALT_KONULAR, AYT_FIZIK_ALT_KONULAR, AYT_COGRAFYA_ALT_KONULAR
} from '../../utils/constants';
import confetti from 'canvas-confetti';

// Dynamic imports for heavy components
const JokerPanel = lazy(() => import("./JokerPanel"));

// Loading component for dynamic imports
const DynamicComponentLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="loading-spinner">Yükleniyor...</div>}>
    {children}
  </Suspense>
);

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  testNumber: number;
  topicId: string;
}

const JOKER_TYPES = ["eliminate", "extraTime", "doubleAnswer", "autoCorrect"] as const;
type JokerType = typeof JOKER_TYPES[number];

const JOKER_ICONS = {
  eliminate: "➗",
  extraTime: "⏰",
  doubleAnswer: "2️⃣",
  autoCorrect: "✅",
};

// Yardımcı fonksiyon: konu ID'sinden konu adını bul
function getSubjectNameById(subjectId: string): string {
  const allSubjects = [
    ...TYT_SUBJECTS,
    ...AYT_SAY_SUBJECTS,
    ...AYT_EA_SUBJECTS,
    ...AYT_SOZ_SUBJECTS,
    ...TYT_TR_ALT_KONULAR,
    ...TYT_DIN_ALT_KONULAR,
    ...TYT_FIZIK_ALT_KONULAR,
    ...TYT_KIMYA_ALT_KONULAR,
    ...TYT_BIYOLOJI_ALT_KONULAR,
    ...TYT_COGRAFYA_ALT_KONULAR,
    ...TYT_TARIH_ALT_KONULAR,
    ...AYT_EDEBIYAT_ALT_KONULAR,
    ...AYT_FELSEFE_ALT_KONULAR,
    ...AYT_BIYOLOJI_ALT_KONULAR,
    ...AYT_KIMYA_ALT_KONULAR,
    ...AYT_FIZIK_ALT_KONULAR,
    ...AYT_COGRAFYA_ALT_KONULAR
  ];
  const found = allSubjects.find(subj => subj.id === subjectId);
  return found ? found.label : subjectId;
}

const Quiz: React.FC = () => {
  const { subTopic, testNumber } = useParams<{ subTopic: string; testNumber: string }>();
  const navigate = useNavigate();
  const { updateUserStats, user, updateUser, refreshUser, manualResetJokers } = useAuth();
  const { measureAsync, measureSync, recordMetric } = usePerformanceMonitor();
  
  // AB Testing
  const { variant: uiVariant, config: uiConfig, trackEvent: trackUIEvent } = useABTest('quiz_ui_variant');
  const { variant: loadingVariant, config: loadingConfig, trackEvent: trackLoadingEvent } = useABTest('question_loading');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isDoubleAnswerActive, setIsDoubleAnswerActive] = useState(false);
  const [isAutoCorrectActive, setIsAutoCorrectActive] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [quizDuration, setQuizDuration] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpInfo, setShowXpInfo] = useState(false);

  // Timer ref for optimization
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Questions cache with AB testing config
  const questionsCache = useRef<Map<string, Question[]>>(new Map());

  // Memoized values
  const progressPercentage = useMemo(() => 
    questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0,
    [currentQuestionIndex, questions.length]
  );

  const currentQuestion = useMemo(() => 
    questions[currentQuestionIndex] || null,
    [questions, currentQuestionIndex]
  );

  // Track quiz start
  useEffect(() => {
    trackUIEvent('quiz_started', {
      variant: uiVariant,
      config: uiConfig
    });
    trackLoadingEvent('quiz_started', {
      variant: loadingVariant,
      config: loadingConfig
    });
  }, [uiVariant, uiConfig, loadingVariant, loadingConfig, trackUIEvent, trackLoadingEvent]);

  useEffect(() => {
    const fetchQuestions = async () => {
      return measureAsync('fetchQuestions', async () => {
        try {
          setIsLoading(true);
          setError(null);

          if (process.env.NODE_ENV === 'development') {
            console.log('🔍 Quiz sorgusu başlatılıyor...');
            console.log('📝 subTopic:', subTopic);
            console.log('📝 testNumber:', testNumber);
            console.log('📝 parseInt(testNumber):', parseInt(testNumber || '1'));
          }

          const cacheKey = `${subTopic}-${testNumber}`;
          
          // Check cache first
          if (questionsCache.current.has(cacheKey)) {
            if (process.env.NODE_ENV === 'development') {
              console.log('📦 Cache\'den sorular yükleniyor...');
            }
            setQuestions(questionsCache.current.get(cacheKey)!);
            setIsLoading(false);
            recordMetric('cache_hit', 1);
            trackLoadingEvent('cache_hit', { cacheKey });
            return;
          }

          const questionsRef = collection(db, 'questions');
          const q = query(
            questionsRef,
            where('topicId', '==', subTopic),
            where('testNumber', '==', parseInt(testNumber || '1'))
          );
          
          if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Firebase sorgusu çalıştırılıyor...');
          }
          const querySnapshot = await getDocs(q);
          
          if (process.env.NODE_ENV === 'development') {
            console.log('📊 Sorgu sonucu:', querySnapshot.size, 'soru bulundu');
          }

          if (querySnapshot.empty) {
            if (process.env.NODE_ENV === 'development') {
              console.log('❌ Hiç soru bulunamadı!');
            }
            setError('Bu test için soru bulunamadı.');
            setIsLoading(false);
            return;
          }

          const fetchedQuestions: Question[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Question[];

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Sorular başarıyla yüklendi:', fetchedQuestions.length, 'adet');
            console.log('📋 İlk soru:', fetchedQuestions[0]);
          }

          // Cache the questions based on AB test config
          const cacheSize = loadingConfig.cacheSize || 10;
          if (questionsCache.current.size < cacheSize) {
            questionsCache.current.set(cacheKey, fetchedQuestions);
          }

          setQuestions(fetchedQuestions);
          setIsLoading(false);
          recordMetric('questions_loaded', fetchedQuestions.length);
          trackLoadingEvent('questions_loaded', { 
            count: fetchedQuestions.length,
            variant: loadingVariant 
          });
        } catch (err) {
          console.error('🚫 Firebase hatası:', err);
          setError('Sorular yüklenirken bir hata oluştu.');
          setIsLoading(false);
          recordMetric('fetch_error', 1);
          trackLoadingEvent('fetch_error', { error: err });
        }
      });
    };

    if (subTopic && testNumber) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 fetchQuestions çağrılıyor...');
      }
      fetchQuestions();
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Geçersiz parametreler:', { subTopic, testNumber });
      }
      setError('Geçersiz quiz parametreleri.');
      setIsLoading(false);
    }
  }, [subTopic, testNumber, measureAsync, recordMetric, trackLoadingEvent, loadingConfig, loadingVariant]);

  useEffect(() => {
    if (refreshUser) {
      refreshUser().then(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Quiz - Joker hakları güncellendi:', user?.jokers);
        }
      });
    }
  }, [refreshUser]);

  // Joker haklarını kontrol et
  useEffect(() => {
    if (user?.jokers && process.env.NODE_ENV === 'development') {
      console.log('Quiz - Mevcut joker hakları:', user.jokers);
      console.log('Quiz - Joker kullanım sayıları:', user.jokersUsed);
    }
  }, [user?.jokers, user?.jokersUsed]);

  // Optimized timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isLoading && questions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, isLoading, questions.length]);

  // Format time display - memoized
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Optimized answer selection handler
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (isAnswered) return;
    if (isDoubleAnswerActive) {
      if (selectedAnswers.includes(answerIndex)) return;
      const newSelected = [...selectedAnswers, answerIndex];
      setSelectedAnswers(newSelected);
      if (newSelected.length === 2) {
        setIsAnswered(true);
        if (newSelected.includes(questions[currentQuestionIndex].correctAnswer)) {
          setScore(prev => prev + 1);
        }
      }
    } else {
      setSelectedAnswer(answerIndex);
      setIsAnswered(true);
      if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  }, [isAnswered, isDoubleAnswerActive, selectedAnswers, questions, currentQuestionIndex]);

  // Optimized next question handler
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setSelectedAnswers([]);
      setIsDoubleAnswerActive(false);
      setIsAutoCorrectActive(false);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, questions.length]);

  // Finish quiz
  const finishQuiz = async () => {
    try {
      setQuizDuration(600 - timeLeft);
      setShowStats(true);
      // 1. İstatistikleri güncelle
      await updateUserStats(
        score,
        questions.length,
        subTopic || '',
        getSubjectNameById(subTopic || ''),
        parseInt(testNumber || '1'),
        600 - timeLeft // duration
      );
      // 2. XP, seviye ve rütbe güncelle
      let xpResult = null;
      if (user) {
        xpResult = await updateXpLevelRank({
          user,
          correct: score,
          total: questions.length,
          testNumber: parseInt(testNumber || '1')
        });
        if (xpResult && typeof xpResult.gainedXp === 'number') {
          setEarnedXp(xpResult.gainedXp);
        }
      }
      // Yönlendirme kaldırıldı, istatistik kartı gösterilecek
    } catch (err) {
      setError('İstatistikler kaydedilemedi. Lütfen tekrar deneyin.');
    }
  };

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Joker kullanımı
  const handleUseJoker = async (type: JokerType) => {
    if (!user || !user.jokers || !user.jokersUsed) return;
    try {
      const { newJokers, newJokersUsed } = await jokerKullan(
        user.id,
        user.jokers,
        user.jokersUsed,
        type
      );
      updateUser({ ...user, jokers: newJokers, jokersUsed: newJokersUsed });
      if (refreshUser) refreshUser();
      if (type === 'eliminate') {
        const currentQ = questions[currentQuestionIndex];
        if (!currentQ) return;
        const wrongOptions = [0,1,2,3].filter(i => i !== currentQ.correctAnswer);
        const shuffled = wrongOptions.sort(() => Math.random() - 0.5);
        setEliminatedOptions(shuffled.slice(0,2));
      }
      if (type === 'extraTime') {
        setTimeLeft(prev => prev + 60);
      }
      if (type === 'doubleAnswer') {
        setIsDoubleAnswerActive(true);
        setSelectedAnswers([]);
      }
      if (type === 'autoCorrect') {
        setIsAutoCorrectActive(true);
        // Otomatik doğru kabul et ama bir sonraki soruya geçme
        setSelectedAnswer(questions[currentQuestionIndex].correctAnswer);
        setIsAnswered(true);
        setScore(prev => prev + 1);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Soru değiştiğinde joker state'lerini sıfırla
  useEffect(() => {
    setEliminatedOptions([]);
    setIsDoubleAnswerActive(false);
    setSelectedAnswers([]);
    setIsAutoCorrectActive(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (showStats) {
      const successRate = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
      if (successRate >= 70) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          zIndex: 9999
        });
      }
    }
    // eslint-disable-next-line
  }, [showStats]);

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">
          <div className="loading-spinner"></div>
          <p>Quiz yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="quiz-error">
          <div className="error-icon">⚠️</div>
          <h2>Hata</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={handleRetry} className="retry-button">
              Tekrar Dene
            </button>
            <button onClick={handleGoBack} className="back-button">
              Geri Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-error">
          <div className="error-icon">📝</div>
          <h2>Soru Bulunamadı</h2>
          <p>Bu test için henüz soru eklenmemiş.</p>
          <button onClick={handleGoBack} className="back-button">
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  if (showStats) {
    const successRate = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="quiz-container">
        <div className="quiz-stats-card animated-stats-card"
          style={{
            maxWidth: 520,
            margin: '64px auto',
            background: 'linear-gradient(120deg, #f8fafc 0%, #e0c3fc 100%)',
            borderRadius: 36,
            boxShadow: '0 12px 48px #764ba244, 0 2px 12px #fff8',
            padding: 48,
            textAlign: 'center',
            position: 'relative',
            minHeight: 420,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'popInStats 1.1s cubic-bezier(.39,.575,.56,1.000)'
          }}>
          <h2 style={{color: '#764ba2', fontWeight: 900, marginBottom: 24, fontSize: 32, letterSpacing: 1}}>Quiz Sonuçları</h2>
          <div style={{fontSize: 26, fontWeight: 800, marginBottom: 18}}>
            Doğru: <span style={{color: '#22c55e'}}>{score}</span> / Yanlış: <span style={{color: '#ef4444'}}>{questions.length - score}</span>
          </div>
          <div style={{fontSize: 22, marginBottom: 10}}>Başarı Oranı: <b style={{color: '#2563eb'}}>{successRate}%</b></div>
          <div style={{fontSize: 22, marginBottom: 10}}>Toplam Süre: <b style={{color: '#7c3aed'}}>{formatTime(quizDuration)}</b></div>
          <div style={{fontSize: 22, marginBottom: 10}}>Kazanılan XP: <b style={{color: '#f59e42'}}>{earnedXp}</b></div>
          <button onClick={() => navigate('/')} style={{marginTop: 32, padding: '16px 44px', background: 'linear-gradient(90deg,#667eea,#764ba2)', color: '#fff', border: 'none', borderRadius: 16, fontWeight: 800, fontSize: 22, cursor: 'pointer', boxShadow: '0 6px 24px #764ba244', letterSpacing: 1}}>Ana Sayfaya Dön</button>
          <div style={{marginTop: 28}}>
            <button onClick={() => setShowXpInfo(v => !v)} style={{background: 'none', border: '2px solid #764ba2', color: '#764ba2', borderRadius: 10, padding: '8px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 17, marginBottom: 8, transition: 'all 0.2s'}}>
              XP Kazanma Kuralları {showXpInfo ? '▲' : '▼'}
            </button>
            {showXpInfo && (
              <div style={{fontSize: 16, color: '#555', marginTop: 8, background: '#f8fafc', borderRadius: 10, padding: 14, textAlign: 'left', boxShadow: '0 2px 12px #764ba211', fontWeight: 500}}>
                <b>XP Kazanma Kuralları:</b><br/>
                Her doğru cevap: <b>20 XP</b><br/>
                %100 başarı: <b>2 katı XP</b><br/>
                %70 ve üzeri: Standart XP<br/>
                Daha düşük başarı: Yarı XP
              </div>
            )}
          </div>
          <style>{`
            @keyframes popInStats {
              0% { opacity: 0; transform: scale(0.7) translateY(60px); }
              60% { opacity: 1; transform: scale(1.08) translateY(-8px); }
              80% { transform: scale(0.98) translateY(4px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Background gradient and geometric shapes */}
      <div className="quiz-background">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </div>
      {/* Main quiz card - TÜM İÇERİK BURADA */}
      <div className="quiz-card">
        {/* Manuel Joker Yenileme Butonu */}
        {user && user.jokers && user.jokersUsed && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16,
            marginTop: 8,
          }}>
            <button
              onClick={async () => {
                try {
                  await manualResetJokers();
                  await refreshUser();
                  alert('🎉 Joker hakları yenilendi! Tüm jokerler 3\'e sıfırlandı.');
                } catch (error) {
                  console.error('Joker yenileme hatası:', error);
                  alert('❌ Joker yenileme sırasında bir hata oluştu.');
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(118, 75, 162, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(118, 75, 162, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(118, 75, 162, 0.3)';
              }}
            >
              🔄 Joker Haklarını Yenile
            </button>
          </div>
        )}

        {/* Kompakt ve sade Joker Barı */}
        {user && user.jokers && user.jokersUsed && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 24,
            marginTop: 16,
            flexWrap: 'wrap',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(118, 75, 162, 0.1)',
          }}>
            {JOKER_TYPES.map((type) => {
              const jokerType = type as JokerType;
              const isDisabled = user.jokers[jokerType].count === 0;
              return (
                <div
                  key={jokerType}
                  className={`joker-emoji-box ${isDisabled ? 'disabled' : ''}`}
                  style={{
                    minWidth: 70,
                    minHeight: 80,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isDisabled ? 0.6 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                  }}
                  title={`${type === 'eliminate' ? '2 Şık Eleme' : 
                          type === 'extraTime' ? 'Ekstra 60sn' :
                          type === 'doubleAnswer' ? 'Çift Cevap' : 'Doğru Kabul'} - Kullanıldı: ${user.jokersUsed[jokerType] || 0}`}
                  onClick={e => {
                    if (!isDisabled) {
                      if (jokerType !== 'autoCorrect') {
                        const el = e.currentTarget;
                        if (el && el.classList) {
                          el.classList.add('joker-emoji-clicked');
                          setTimeout(() => {
                            if (el && el.classList) el.classList.remove('joker-emoji-clicked');
                          }, 400);
                        }
                        handleUseJoker(jokerType);
                      } else {
                        handleUseJoker(jokerType);
                      }
                    }
                  }}
                >
                  <span
                    className="joker-emoji"
                    style={{ 
                      fontSize: 32, 
                      marginBottom: 6,
                      filter: isDisabled ? 'grayscale(1)' : 'none'
                    }}
                  >
                    {JOKER_ICONS[jokerType]}
                  </span>
                  <span style={{ 
                    fontSize: 16, 
                    color: '#764ba2', 
                    fontWeight: 700, 
                    marginBottom: 2 
                  }}>
                    {user.jokers[jokerType].count}
                  </span>
                  <span style={{ 
                    fontSize: 10, 
                    color: '#999', 
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}>
                    Kullanıldı: {user.jokersUsed[jokerType] || 0}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {/* Header section */}
        <div className="quiz-header">
          <h1 className="quiz-title">Quiz</h1>
          <div className="quiz-meta">
            <div className="timer">
              <span className="timer-icon">⏱️</span>
              <span className="timer-text">{formatTime(timeLeft)}</span>
            </div>
            <div className="question-counter">
              Soru {currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        {/* Question section */}
        <div className="question-section">
          <div className="question-number">
            Soru {currentQuestionIndex + 1}
          </div>
          <div className="question-text">
            {currentQuestion.question}
          </div>
        </div>
        {/* Answer options */}
        <div className="answer-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${
                isDoubleAnswerActive
                  ? selectedAnswers.includes(index)
                    ? (index === currentQuestion.correctAnswer ? 'correct' : 'incorrect')
                    : ''
                  : selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
              } ${isAnswered && index === currentQuestion.correctAnswer ? 'correct' : ''} ${
                eliminatedOptions.includes(index) ? 'eliminated' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span className="answer-text">{option}</span>
            </button>
          ))}
        </div>
        {/* Explanation (shown after answering) */}
        {isAnswered && currentQuestion.explanation && (
          <div className="explanation">
            <h4>Açıklama:</h4>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
        {/* Navigation */}
        <div className="quiz-navigation">
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={!isAnswered}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Sonraki Soru' : 'Quiz\'i Bitir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 