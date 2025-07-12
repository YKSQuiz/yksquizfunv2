# YKS Quiz Uygulaması

Modern ve kullanıcı dostu bir YKS (Yükseköğretim Kurumları Sınavı) quiz uygulaması. TYT ve AYT sınavlarına hazırlanan öğrenciler için tasarlanmış kapsamlı bir eğitim platformu.

## 🚀 Özellikler

### 📚 Kapsamlı Konu Kapsamı
- **TYT Konuları:** Türkçe, Matematik, Fizik, Kimya, Biyoloji, Tarih, Coğrafya, Felsefe, Din
- **AYT Konuları:** Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya, Felsefe, Din
- **Alt Konular:** Her ana konu için detaylı alt konular
- **Test Seçimi:** Her alt konu için 10 farklı test

### 🎯 Quiz Özellikleri
- **Çoktan Seçmeli Sorular:** 4 seçenekli soru formatı
- **Joker Sistemi:** 4 farklı joker türü (Eliminate, Extra Time, Double Answer, Auto Correct)
- **Zaman Sınırı:** Her soru için 10 dakika süre
- **Anlık Geri Bildirim:** Doğru/yanlış cevap gösterimi
- **Detaylı Açıklamalar:** Her soru için kapsamlı açıklama
- **İlerleme Takibi:** Soru numarası ve toplam soru sayısı

### 👤 Kullanıcı Sistemi
- **Kayıt/Giriş:** Email ve şifre ile hesap oluşturma
- **Google Girişi:** Google hesabı ile hızlı giriş
- **Profil Yönetimi:** Kullanıcı bilgilerini düzenleme
- **Seviye Sistemi:** XP kazanarak seviye atlama
- **Rütbe Sistemi:** Seviyeye göre rütbe kazanma

### 📊 İstatistikler ve Analiz
- **Detaylı İstatistikler:** Konu bazında başarı oranları
- **Grafikler:** Başarı trendleri ve performans analizi
- **Zaman Takibi:** Quiz süreleri ve ortalama çözüm süreleri
- **Başarı Oranları:** Doğru/yanlış cevap oranları

### ⚡ Performans Optimizasyonları
- **Lazy Loading:** Ağır bileşenlerin ihtiyaç halinde yüklenmesi
- **Memoization:** React.memo ve useMemo optimizasyonları
- **Bundle Splitting:** Kod bölme ile hızlı yükleme
- **Service Worker:** Offline çalışma desteği
- **A/B Testing:** Performans testleri ve varyant analizi

## 🛠️ Teknolojiler

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router DOM v6
- **Styling:** CSS3 (Custom CSS + Animations)
- **State Management:** React Context API
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Build Tool:** Create React App
- **Performance:** Web Vitals, Bundle Analyzer
- **Testing:** A/B Testing Framework

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd yksquizv14
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Firebase yapılandırmasını ayarlayın:
   - `src/services/firebase.ts` dosyasında Firebase config bilgilerinizi girin

4. Uygulamayı başlatın:
```bash
npm start
```

5. Tarayıcınızda `http://localhost:3000` adresini açın.

## 🎯 Kullanım

### 📱 Ana Özellikler
1. **Giriş Yapın:** Email/şifre veya Google ile giriş yapın
2. **Ana Sayfa:** Profil bilgilerinizi, seviyenizi ve enerji durumunuzu görün
3. **Konu Seçin:** TYT veya AYT konularından birini seçin
4. **Alt Konu Seçin:** Seçtiğiniz konunun alt konularından birini seçin
5. **Test Seçin:** 1-10 arası testlerden birini seçin
6. **Quiz Çözün:** Soruları yanıtlayın, jokerlerinizi kullanın
7. **Sonuçları Görün:** Quiz sonunda XP kazanın ve seviye atlayın

### 🎮 Joker Sistemi
- **Eliminate (➗):** İki yanlış seçeneği eleme
- **Extra Time (⏰):** Ek süre kazanma
- **Double Answer (2️⃣):** İki cevap seçme hakkı
- **Auto Correct (✅):** Otomatik doğru cevap

### 📊 İstatistikler
- **Konu Bazında:** Her konu için ayrı başarı oranları
- **Zaman Analizi:** Quiz süreleri ve ortalama çözüm süreleri
- **Grafikler:** Başarı trendleri ve performans analizi

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- **Desktop:** Tam özellikli deneyim
- **Tablet:** Touch-friendly arayüz
- **Mobile:** Mobil optimizasyonu
- **Touch:** Dokunmatik ekran desteği

## 🔧 Geliştirme

### Proje Yapısı
```
src/
├── components/          # React bileşenleri
│   ├── auth/           # Kimlik doğrulama
│   │   ├── Login.tsx
│   │   └── EditProfile.tsx
│   ├── common/         # Ortak bileşenler
│   │   ├── BackButton.tsx
│   │   └── SettingsActions.tsx
│   ├── home/           # Ana sayfa
│   │   ├── Home.tsx
│   │   └── ProfileLevelCard.tsx
│   ├── quiz/           # Quiz bileşenleri
│   │   ├── Quiz.tsx
│   │   ├── TestSelection.tsx
│   │   └── JokerPanel.tsx
│   ├── stats/          # İstatistikler
│   │   └── Istatistiklerim.tsx
│   ├── subjects/       # Konu sayfaları
│   │   ├── tyt/        # TYT konuları
│   │   └── ayt/        # AYT konuları
│   └── admin/          # Yönetim paneli
│       └── PerformanceDashboard.tsx
├── contexts/           # React Context
│   └── AuthContext.tsx
├── services/           # Servisler
│   └── firebase.ts
├── utils/              # Yardımcı fonksiyonlar
│   ├── constants.ts
│   ├── performance.ts
│   └── abTesting.ts
├── types/              # TypeScript tipleri
├── styles/             # Stil dosyaları
└── hooks/              # Custom hooks
```

### Performans Optimizasyonları
- **React.memo:** Gereksiz re-render'ları önleme
- **useCallback:** Fonksiyon memoization
- **useMemo:** Hesaplama memoization
- **Lazy Loading:** Dinamik import
- **Bundle Splitting:** Kod bölme
- **Service Worker:** Offline cache

### A/B Testing
- **UI Varyantları:** Farklı arayüz testleri
- **Loading Stratejileri:** Yükleme optimizasyonları
- **Performance Monitoring:** Canlı performans izleme

## 🎨 Tasarım Özellikleri

- **Modern UI:** Gradient renkler ve animasyonlar
- **Responsive Design:** Tüm cihazlarda uyumlu
- **Smooth Animations:** CSS transitions ve keyframes
- **Interactive Elements:** Hover efektleri ve feedback
- **Accessibility:** Erişilebilirlik standartları

## 📊 İstatistikler ve Analiz

Uygulama şu istatistikleri takip eder:
- **Quiz İstatistikleri:** Tamamlanan quiz sayısı, doğru/yanlış oranları
- **Zaman Analizi:** Quiz süreleri, ortalama çözüm süreleri
- **Konu Bazında:** Her konu için ayrı başarı oranları
- **Seviye Sistemi:** XP kazanma, seviye atlama, rütbe sistemi
- **Joker Kullanımı:** Joker türleri ve kullanım oranları

## 🔮 Gelecek Özellikler

- [ ] Daha fazla soru ve konu ekleme
- [ ] Video açıklamaları
- [ ] Sesli soru okuma
- [ ] Liderlik tablosu
- [ ] Sosyal özellikler (arkadaş ekleme, sıralama)
- [ ] Offline quiz modu
- [ ] Push notifications
- [ ] Dark mode
- [ ] Çoklu dil desteği

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz için issue açabilirsiniz.

---

**YKS Quiz** - YKS sınavına hazırlıkta yanınızda! 📚🎯 