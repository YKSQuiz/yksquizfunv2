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