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
  energyLimit?: number; // Maksimum enerji (varsayılan: 100)
  energyRegenSpeed?: number; // Enerji yenilenme hızı (saniye, varsayılan: 300)
  coins?: number; // Kullanıcının sahip olduğu coin miktarı
  unlockedTests?: { [subjectTopic: string]: number[] }; // Alt konu bazlı açılan testler {"turkce/sozcukte-anlam": [1,2], "matematik/temel-kavramlar": [1]}
  testResults?: { [subjectTopic: string]: { [testId: string]: { score: number; total: number; percentage: number; completed: boolean; attempts: number } } }; // Test sonuçları
}

// Kullanıcı istatistikleri
export interface UserStats {
  totalQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
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

// Günlük aktivite
export interface DailyActivity {
  questionsSolved: number;
  correctAnswers: number;
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

// Market sistemi tipleri
export interface MarketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'joker' | 'energy';
  type: 'single' | 'refill' | 'upgrade';
  icon: string;
  isAvailable: boolean;
  stock?: number;
  requiredLevel?: number; // Sıralı açılma için gerekli seviye
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: 'quiz' | 'purchase' | 'bonus' | 'test_unlock';
  itemId?: string;
  timestamp: string;
} 