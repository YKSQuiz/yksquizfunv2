// Kullanıcı tipi
export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  stats: UserStats;
  jokers: Jokers;
  jokersUsed: JokersUsed;
  totalSessionTime?: number;
  totalQuizTime?: number;
  // Enerji sistemi
  energy?: number; // Kullanıcının mevcut enerjisi (0-100)
  lastEnergyUpdate?: string; // Son enerji güncelleme zamanı (ISO string veya timestamp)
}

// Kullanıcı istatistikleri
export interface UserStats {
  totalQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  subjectStats: {
    [subjectId: string]: SubjectStats;
  };
  quizHistory: QuizHistory[];
  dailyActivity: {
    [date: string]: DailyActivity;
  };
  level: number;
  experience: number;
  experienceToNext: number;
  rank?: string;
  totalQuizTime?: number;
  totalSessionTime?: number;
  sessionHistory?: { date: string; seconds: number }[];
}

// Konu istatistikleri
export interface SubjectStats {
  totalQuestions: number;
  correctAnswers: number;
  quizzes: number;
  lastQuizDate?: string;
}

// Quiz geçmişi
export interface QuizHistory {
  id: string;
  subjectId: string;
  subjectName: string;
  testNumber: number;
  score: number;
  totalQuestions: number;
  date: string;
  duration: number;
}

// Günlük aktivite
export interface DailyActivity {
  questionsSolved: number;
  correctAnswers: number;
  timeSpent: number;
}

// Soru tipi
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  testNumber: number;
  topicId: string;
}

// Konu tipi
export interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
}

// Alt konu tipi
export interface SubTopic {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface JokerState {
  count: number;
  lastReset: string; // ISO date
}

export interface Jokers {
  eliminate: JokerState;
  extraTime: JokerState;
  doubleAnswer: JokerState;
  autoCorrect: JokerState;
}

export interface JokersUsed {
  eliminate: number;
  extraTime: number;
  doubleAnswer: number;
  autoCorrect: number;
} 