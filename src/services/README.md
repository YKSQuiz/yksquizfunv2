# Services

Bu klasör uygulama servislerini ve API katmanını içerir.

## 📁 Klasör Yapısı

```
services/
├── firebase/         # Firebase servisleri
│   ├── config.ts     # Firebase konfigürasyonu
│   ├── auth.ts       # Authentication servisleri
│   ├── database.ts   # Firestore servisleri
│   ├── storage.ts    # Storage servisleri
│   └── index.ts      # Export dosyası
├── api/              # API servisleri (gelecek)
│   ├── quiz.ts       # Quiz API servisleri
│   ├── user.ts       # User API servisleri
│   ├── market.ts     # Market API servisleri
│   └── stats.ts      # Stats API servisleri
└── utils/            # Utility servisleri
    ├── validation.ts # Form validation
    ├── formatting.ts # Veri formatlama
    ├── calculations.ts # Hesaplama fonksiyonları
    └── date.ts       # Tarih işleme
```

## 🔥 Firebase Servisleri

### Authentication
```typescript
// auth.ts
export const signInWithEmail = async (email: string, password: string) => {
  // Email/şifre ile giriş
};

export const signInWithGoogle = async () => {
  // Google ile giriş
};

export const signOut = async () => {
  // Çıkış yapma
};
```

### Database (Firestore)
```typescript
// database.ts
export const getUserData = async (userId: string) => {
  // Kullanıcı verilerini getir
};

export const updateUserStats = async (userId: string, stats: UserStats) => {
  // Kullanıcı istatistiklerini güncelle
};

export const saveQuizResult = async (result: QuizResult) => {
  // Quiz sonucunu kaydet
};
```

### Storage
```typescript
// storage.ts
export const uploadUserAvatar = async (file: File, userId: string) => {
  // Kullanıcı avatar'ını yükle
};

export const getDownloadURL = async (path: string) => {
  // Dosya URL'ini al
};
```

## 📡 API Servisleri

### Quiz API
```typescript
// api/quiz.ts
export const getQuestions = async (subject: string, topic: string) => {
  // Soruları getir
};

export const submitAnswer = async (answer: Answer) => {
  // Cevabı gönder
};

export const getQuizHistory = async (userId: string) => {
  // Quiz geçmişini getir
};
```

### User API
```typescript
// api/user.ts
export const updateProfile = async (userId: string, profile: UserProfile) => {
  // Profili güncelle
};

export const getUserStats = async (userId: string) => {
  // Kullanıcı istatistiklerini getir
};
```

## 🛠️ Utility Servisleri

### Validation
```typescript
// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  // Email doğrulama
};

export const validatePassword = (password: string): boolean => {
  // Şifre doğrulama
};

export const validateQuizAnswer = (answer: Answer): boolean => {
  // Quiz cevabı doğrulama
};
```

### Formatting
```typescript
// utils/formatting.ts
export const formatScore = (score: number): string => {
  // Puan formatlama
};

export const formatTime = (seconds: number): string => {
  // Zaman formatlama
};

export const formatDate = (date: Date): string => {
  // Tarih formatlama
};
```

## 🔧 Servis Standartları

### Error Handling
```typescript
export const safeApiCall = async <T>(
  apiFunction: () => Promise<T>
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const data = await apiFunction();
    return { data, error: null };
  } catch (error) {
    console.error('API Error:', error);
    return { data: null, error: error.message };
  }
};
```

### Loading States
```typescript
export const useApiCall = <T>(apiFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};
```

### Caching
```typescript
const cache = new Map<string, { data: any; timestamp: number }>();

export const cachedApiCall = async <T>(
  key: string,
  apiFunction: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 dakika
): Promise<T> => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await apiFunction();
  cache.set(key, { data, timestamp: Date.now() });
  
  return data;
};
```

## 🧪 Testing

### Service Tests
```typescript
// services/__tests__/auth.test.ts
import { signInWithEmail } from '../firebase/auth';

describe('Auth Service', () => {
  it('should sign in with valid credentials', async () => {
    const result = await signInWithEmail('test@example.com', 'password');
    expect(result.success).toBe(true);
  });

  it('should handle invalid credentials', async () => {
    const result = await signInWithEmail('invalid@example.com', 'wrong');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### Mock Services
```typescript
// services/__mocks__/firebase.ts
export const mockFirebaseAuth = {
  signInWithEmail: jest.fn(),
  signInWithGoogle: jest.fn(),
  signOut: jest.fn()
};

export const mockFirestore = {
  collection: jest.fn(),
  doc: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  update: jest.fn()
};
```

## 📚 Best Practices

### Service Organization
- **Single Responsibility**: Her servis tek bir sorumluluğa sahip olmalı
- **Dependency Injection**: Servisler arası bağımlılıkları minimize edin
- **Error Boundaries**: Hata yönetimi için boundary'ler kullanın
- **Type Safety**: TypeScript ile tip güvenliği sağlayın

### Performance
- **Caching**: Sık kullanılan verileri cache'leyin
- **Lazy Loading**: Servisleri gerektiğinde yükleyin
- **Batch Operations**: Toplu işlemler için batch API'leri kullanın
- **Connection Pooling**: Veritabanı bağlantılarını optimize edin

### Security
- **Input Validation**: Tüm girdileri doğrulayın
- **Authentication**: Her API çağrısında kimlik doğrulaması yapın
- **Authorization**: Kullanıcı yetkilerini kontrol edin
- **Rate Limiting**: API çağrılarını sınırlayın

## 🔄 Migration Guide

### Eski Yapıdan Yeni Yapıya
1. **Servisleri** uygun klasörlere taşıyın
2. **Import yollarını** güncelleyin
3. **Error handling** ekleyin
4. **Type definitions** güncelleyin

### Breaking Changes
- Firebase servisleri ayrı dosyalara bölündü
- API servisleri eklendi
- Error handling geliştirildi
- Type safety artırıldı 