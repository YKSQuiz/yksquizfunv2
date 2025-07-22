# YKS Quiz Uygulaması - Detaylı Dokümantasyon

## 📋 İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Teknik Mimari](#teknik-mimari)
3. [Kullanıcı Sistemi](#kullanıcı-sistemi)
4. [Quiz Sistemi](#quiz-sistemi)
5. [Joker Sistemi](#joker-sistemi)
6. [Seviye ve XP Sistemi](#seviye-ve-xp-sistemi)
7. [Enerji Sistemi](#enerji-sistemi)
8. [İstatistikler ve Analiz](#istatistikler-ve-analiz)
9. [Performans Optimizasyonları](#performans-optimizasyonları)
10. [A/B Testing](#ab-testing)
11. [Firebase Entegrasyonu](#firebase-entegrasyonu)
12. [Dosya Yapısı](#dosya-yapısı)
13. [Geliştirme Rehberi](#geliştirme-rehberi)

---

## 🎯 Genel Bakış

**YKS Quiz**, Yükseköğretim Kurumları Sınavı (YKS) için hazırlanan öğrencilere yönelik modern bir quiz uygulamasıdır. Uygulama, TYT (Temel Yeterlilik Testi) ve AYT (Alan Yeterlilik Testi) konularını kapsayan kapsamlı bir eğitim platformudur.

### 🎯 Ana Hedefler
- YKS sınavına hazırlanan öğrencilere interaktif quiz deneyimi sunmak
- Gamification elementleri ile öğrenmeyi eğlenceli hale getirmek
- Detaylı istatistikler ile öğrenci performansını takip etmek
- Modern web teknolojileri ile hızlı ve responsive bir deneyim sağlamak

### 🌟 Temel Özellikler
- **Kapsamlı Konu Kapsamı:** TYT ve AYT tüm dersler
- **Gamification:** Seviye sistemi, XP, rütbeler, jokerler
- **Performans Takibi:** Detaylı istatistikler ve analizler
- **Modern UI/UX:** Responsive tasarım ve smooth animasyonlar
- **Real-time Updates:** Firebase ile gerçek zamanlı güncellemeler

---

## 🏗️ Teknik Mimari

### 🛠️ Teknoloji Stack'i
- **Frontend Framework:** React 18 + TypeScript
- **Routing:** React Router DOM v6
- **State Management:** React Context API
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Styling:** CSS3 (Custom CSS + Animations)
- **Build Tool:** Create React App
- **Performance Monitoring:** Web Vitals, Bundle Analyzer

### 📱 Responsive Tasarım
- **Desktop:** Tam özellikli deneyim
- **Tablet:** Touch-friendly arayüz
- **Mobile:** Mobil optimizasyonu
- **Touch:** Dokunmatik ekran desteği

### 🔧 Proje Yapısı
```
yksquizv26/
├── public/             # Statik dosyalar
├── scripts/            # Script dosyaları
│   ├── database/       # Veritabanı işlemleri
│   ├── deployment/     # Deployment script'leri
│   ├── maintenance/    # Bakım ve temizlik
│   ├── utils/          # Yardımcı araçlar
│   ├── dev/            # Development araçları
│   ├── test/           # Test script'leri
│   └── monitoring/     # Performans izleme
├── src/
│   ├── components/     # React bileşenleri
│   │   ├── common/     # Ortak bileşenler
│   │   │   ├── ui/     # UI bileşenleri
│   │   │   ├── navigation/ # Navigasyon
│   │   │   └── subjects/   # Konu bileşenleri
│   │   ├── features/   # Özellik bazlı bileşenler
│   │   │   ├── auth/   # Kimlik doğrulama
│   │   │   ├── quiz/   # Quiz bileşenleri
│   │   │   ├── profile/ # Profil
│   │   │   ├── stats/  # İstatistikler
│   │   │   ├── market/ # Market
│   │   │   ├── admin/  # Yönetim paneli
│   │   │   └── home/   # Ana sayfa
│   │   └── pages/      # Sayfa bileşenleri
│   ├── contexts/       # React Context
│   ├── data/           # Veri yapıları
│   │   └── subjects/   # Konu verileri
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servisler
│   │   └── firebase/   # Firebase servisleri
│   ├── styles/         # Stil dosyaları
│   │   ├── base/       # Temel stiller
│   │   ├── components/ # Bileşen stilleri
│   │   ├── themes/     # Tema sistemi
│   │   └── utilities/  # Utility sınıfları
│   ├── types/          # TypeScript tipleri
│   └── utils/          # Yardımcı fonksiyonlar
├── package.json
├── tsconfig.json
└── README.md
```

---

## 👤 Kullanıcı Sistemi

### 🔐 Kimlik Doğrulama
- **Email/Şifre:** Geleneksel giriş sistemi
- **Google OAuth:** Google hesabı ile hızlı giriş
- **Otomatik Kayıt:** İlk girişte otomatik profil oluşturma

### 👤 Kullanıcı Profili
```typescript
interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  stats: UserStats;
  jokers: Jokers;
  jokersUsed: JokersUsed;
  energy: number;
  lastEnergyUpdate: string;
  coins: number;
}
```

### 📊 Kullanıcı İstatistikleri
```typescript
interface UserStats {
  totalQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  dailyActivity: { [date: string]: DailyActivity };
  level: number;
  experience: number;
  experienceToNext: number;
  rank?: string;
  totalQuizTime?: number;
  totalSessionTime?: number;
}
```

---

## 🎮 Quiz Sistemi

### 📚 Konu Yapısı
- **TYT Konuları:** Türkçe, Matematik, Fizik, Kimya, Biyoloji, Tarih, Coğrafya, Felsefe, Din
- **AYT Konuları:** Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya, Felsefe, Din
- **Alt Konular:** Her ana konu için detaylı alt konular
- **Test Seçimi:** Her alt konu için 10 farklı test

### ❓ Soru Formatı
```typescript
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  testNumber: number;
  topicId: string;
}
```

### ⏱️ Quiz Özellikleri
- **Süre Sınırı:** Her soru için 10 dakika
- **Çoktan Seçmeli:** 4 seçenekli soru formatı
- **Anlık Geri Bildirim:** Doğru/yanlış cevap gösterimi
- **Detaylı Açıklamalar:** Her soru için kapsamlı açıklama
- **İlerleme Takibi:** Soru numarası ve toplam soru sayısı

### 🎯 Quiz Akışı
1. **Konu Seçimi:** TYT veya AYT konularından seçim
2. **Alt Konu Seçimi:** Seçilen konunun alt konuları
3. **Test Seçimi:** 1-10 arası testlerden seçim
4. **Quiz Başlatma:** Soruları yanıtlama
5. **Joker Kullanımı:** Gerektiğinde joker kullanma
6. **Sonuç Görüntüleme:** XP kazanma ve seviye atlama

---

## 🃏 Joker Sistemi

### 🎯 Joker Türleri
1. **Eliminate (➗):** İki yanlış seçeneği eleme
2. **Extra Time (⏰):** Ek süre kazanma
3. **Double Answer (2️⃣):** İki cevap seçme hakkı
4. **Auto Correct (✅):** Otomatik doğru cevap

### 📊 Joker Yönetimi
```typescript
interface Jokers {
  eliminate: JokerState;
  extraTime: JokerState;
  doubleAnswer: JokerState;
  autoCorrect: JokerState;
}

interface JokerState {
  count: number;
  lastReset: string; // ISO date
}
```

### 🔄 Joker Yenileme
- **Günlük Reset:** Her gün jokerler yenilenir
- **Manuel Reset:** Admin panelinden manuel yenileme
- **Kullanım Takibi:** Her joker türü için ayrı kullanım sayısı

---

## ⭐ Seviye ve XP Sistemi

### 🎯 XP Hesaplama
- **Doğru Cevap:** 20 XP
- **%100 Başarı:** 2x XP bonusu
- **%70+ Başarı:** Normal XP
- **%70- Başarı:** Yarı XP

### 📈 Seviye Sistemi
- **Seviye 1-100:** Kullanıcı seviyeleri
- **XP Formülü:** Her seviye için artan XP gereksinimi
- **Seviye Atlama:** Yeni özellikler ve bonuslar

### 🏆 Rütbe Sistemi
```typescript
const RANKS = [
  { level: 1, name: "Soru Çömezi" },
  { level: 5, name: "Cevap Bilmecesi" },
  { level: 10, name: "Meraklı Beyin" },
  { level: 15, name: "Son Dakika Kahramanı" },
  { level: 20, name: "Şıkka Göz Kırpan" },
  { level: 25, name: "Tabloyla Kavgalı" },
  { level: 30, name: "Joker Sevdalısı" },
  { level: 35, name: "Kantin Filozofu" },
  { level: 40, name: "Ezber Bozan" },
  { level: 45, name: "Doğru Şık Dedektifi" },
  { level: 50, name: "Quiz Müptelası" },
  { level: 55, name: "Yanıt Ustası" },
  { level: 60, name: "Zihin Cambazı" },
  { level: 65, name: "Cevap Koleksiyoncusu" },
  { level: 70, name: "Sınav Samurayı" },
  { level: 75, name: "Zihin Hacker'ı" },
  { level: 80, name: "Soru Panteri" },
  { level: 85, name: "Zeka Juggleri" },
  { level: 90, name: "Quiz Rockstar'ı" },
  { level: 95, name: "Sonsuz Bilge" },
  { level: 100, name: "Quiz'in Efsanevi Patronu" }
];
```

---

## ⚡ Enerji Sistemi

### 🔋 Enerji Mekanizması
- **Maksimum Enerji:** 100 birim
- **Yenilenme Hızı:** Her dakika 1 enerji
- **Quiz Maliyeti:** Her quiz 20 enerji
- **Real-time Updates:** Gerçek zamanlı enerji takibi

### ⏰ Enerji Yenilenme
```typescript
const ENERGY_MAX = 100;
const ENERGY_REGEN_MINUTES = 1;
const ENERGY_PER_REGEN = 1;
```

### 🎯 Enerji Kullanımı
- **Quiz Başlatma:** 20 enerji gerektirir
- **Enerji Yetersiz:** Quiz başlatılamaz
- **Otomatik Yenilenme:** Arka planda sürekli yenilenme

---

## 📊 İstatistikler ve Analiz

### 📈 Kullanıcı İstatistikleri
- **Quiz İstatistikleri:** Tamamlanan quiz sayısı
- **Başarı Oranları:** Doğru/yanlış cevap oranları
- **Zaman Analizi:** Quiz süreleri ve ortalama çözüm süreleri
- **Konu Bazında:** Her konu için ayrı başarı oranları

### 📊 Günlük Aktivite
```typescript
interface DailyActivity {
  questionsSolved: number;
  correctAnswers: number;
  timeSpent: number;
}
```

### 📈 Grafikler ve Analiz
- **Başarı Trendleri:** Zaman içindeki performans değişimi
- **Konu Karşılaştırması:** Dersler arası performans analizi
- **Zaman Dağılımı:** Quiz sürelerinin analizi
- **Joker Kullanımı:** Joker türleri ve kullanım oranları

---

## ⚡ Performans Optimizasyonları

### 🚀 React Optimizasyonları
- **React.memo:** Gereksiz re-render'ları önleme
- **useCallback:** Fonksiyon memoization
- **useMemo:** Hesaplama memoization
- **Lazy Loading:** Dinamik import ile kod bölme

### 📦 Bundle Optimizasyonu
- **Code Splitting:** Route bazında kod bölme
- **Dynamic Imports:** Ağır bileşenlerin ihtiyaç halinde yüklenmesi
- **Bundle Analyzer:** Bundle boyutu analizi
- **Tree Shaking:** Kullanılmayan kodların elenmesi

### 🔄 Service Worker
- **Offline Cache:** Offline çalışma desteği
- **Background Sync:** Arka plan senkronizasyonu
- **Push Notifications:** Bildirim desteği

### 📊 Performance Monitoring
- **Web Vitals:** Core Web Vitals takibi
- **Custom Metrics:** Özel performans metrikleri
- **Real-time Monitoring:** Canlı performans izleme

---

## 🧪 A/B Testing

### 🎯 Test Kategorileri
- **UI Varyantları:** Farklı arayüz testleri
- **Loading Stratejileri:** Yükleme optimizasyonları
- **Quiz Deneyimi:** Quiz arayüzü varyantları

### 📊 Test Konfigürasyonu
```typescript
interface ABTestConfig {
  variant: string;
  config: any;
  trackEvent: (event: string, data: any) => void;
}
```

### 📈 Test Sonuçları
- **Conversion Rates:** Dönüşüm oranları
- **User Engagement:** Kullanıcı etkileşimi
- **Performance Metrics:** Performans metrikleri

---

## 🔥 Firebase Entegrasyonu

### 🔐 Authentication
- **Email/Password:** Geleneksel giriş
- **Google OAuth:** Google hesabı entegrasyonu
- **User Management:** Kullanıcı profil yönetimi

### 📊 Firestore Database
- **Users Collection:** Kullanıcı profilleri
- **Questions Collection:** Quiz soruları
- **Stats Collection:** İstatistikler
- **Real-time Updates:** Gerçek zamanlı güncellemeler

### 🔄 Data Structure
```typescript
// Users Collection
{
  id: string;
  displayName: string;
  email: string;
  stats: UserStats;
  jokers: Jokers;
  energy: number;
  coins: number;
}

// Questions Collection
{
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  testNumber: number;
  topicId: string;
}
```

---

## 📁 Dosya Yapısı

### 🗂️ Ana Dizinler
```
yksquizv18/
├── public/              # Statik dosyalar
├── src/                 # Kaynak kodlar
│   ├── components/      # React bileşenleri
│   ├── contexts/        # React Context
│   ├── services/        # Servisler
│   ├── utils/           # Yardımcı fonksiyonlar
│   ├── types/           # TypeScript tipleri
│   └── styles/          # Stil dosyaları
├── scripts/             # Deployment scriptleri
└── docs/               # Dokümantasyon
```

### 📂 Component Yapısı
```
components/
├── auth/               # Kimlik doğrulama
│   ├── Login.tsx
│   └── EditProfile.tsx
├── common/             # Ortak bileşenler
│   ├── BackButton.tsx
│   └── SettingsActions.tsx
├── home/               # Ana sayfa
│   ├── Home.tsx
│   └── ProfileLevelCard.tsx
├── quiz/               # Quiz bileşenleri
│   ├── Quiz.tsx
│   ├── TestSelection.tsx
│   └── JokerPanel.tsx
├── stats/              # İstatistikler
│   └── Istatistiklerim.tsx
├── subjects/           # Konu sayfaları
│   ├── SubjectSelector.tsx
│   └── AltKonuSelector.tsx
└── admin/              # Yönetim paneli
    └── PerformanceDashboard.tsx
```

---

## 🛠️ Geliştirme Rehberi

### 🚀 Geliştirme Ortamı Kurulumu
```bash
# Projeyi klonla
git clone <repository-url>
cd yksquizv18

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

### 🔧 Build ve Deploy
```bash
# Production build
npm run build

# Bundle analizi
npm run analyze

# Test çalıştırma
npm test

# Development ortamı kurulumu
npm run dev:setup

# Performans izleme
npm run utils:analyze-bundle

# Dependency kontrolü
npm run utils:check-deps

# Sitemap oluşturma
npm run utils:sitemap
```

### 🚀 Script Komutları
```bash
# Database işlemleri
npm run db:upload-csv          # CSV'den Firebase'e veri aktarımı
npm run db:validate-csv        # CSV doğrulama
npm run db:delete-questions    # Soru silme
npm run db:fix-daily-activity  # Günlük aktivite düzeltme
npm run db:fix-session-time    # Oturum zamanı düzeltme

# Deployment
npm run deploy:quick           # Hızlı deployment
npm run deploy:full            # Tam deployment
npm run health:check           # Sistem sağlık kontrolü

# Test ve geliştirme
npm run test:run               # Test suite çalıştırma
npm run dev:setup              # Development ortamı kurulumu

# Utility araçları
npm run utils:sitemap          # Sitemap oluşturma
npm run utils:analyze-bundle   # Bundle analizi
npm run utils:check-deps       # Dependency kontrolü
```

### 📝 Kod Standartları
- **TypeScript:** Strict mode kullanımı
- **ESLint:** Kod kalitesi kontrolü
- **Prettier:** Kod formatlaması
- **Component Structure:** Fonksiyonel bileşenler

### 🧪 Testing Stratejisi
- **Unit Tests:** Bileşen testleri
- **Integration Tests:** Servis entegrasyonları
- **E2E Tests:** Kullanıcı senaryoları
- **Performance Tests:** Yük testleri

### 🔄 CI/CD Pipeline
- **GitHub Actions:** Otomatik build ve test
- **Vercel/Netlify:** Otomatik deploy
- **Firebase Hosting:** Production hosting

---

## 📈 Gelecek Geliştirmeler

### 🎯 Planlanan Özellikler
- [ ] Video açıklamaları
- [ ] Sesli soru okuma
- [ ] Liderlik tablosu
- [ ] Sosyal özellikler (arkadaş ekleme, sıralama)
- [ ] Offline quiz modu
- [ ] Push notifications
- [ ] Dark mode
- [ ] Çoklu dil desteği

### 🔮 Teknik İyileştirmeler
- [ ] PWA desteği
- [ ] Service Worker optimizasyonu
- [ ] Bundle size optimizasyonu
- [ ] Performance monitoring geliştirmeleri
- [ ] A/B testing framework genişletme

---

## 📞 Destek ve İletişim

### 🐛 Bug Reports
- GitHub Issues kullanın
- Detaylı hata açıklaması ekleyin
- Ekran görüntüleri ekleyin

### 💡 Feature Requests
- GitHub Discussions kullanın
- Özellik önerilerini detaylandırın
- Kullanım senaryolarını açıklayın

### 📚 Dokümantasyon
- Bu dokümantasyon güncel tutulacak
- API değişiklikleri belgelenir
- Yeni özellikler dokümante edilir

---

**YKS Quiz** - YKS sınavına hazırlıkta yanınızda! 📚🎯

*Son güncelleme: 2025* 