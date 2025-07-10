# YKS Coğrafya Quiz Uygulaması

Modern ve kullanıcı dostu bir coğrafya True/False quiz uygulaması. YKS sınavına hazırlanan öğrenciler için tasarlanmıştır.

## 🚀 Özellikler

- **3 Ana Ekran:**
  - Login Ekranı
  - Ana Sayfa (Profil bilgileri ve istatistikler)
  - Konu Seçim Ekranı (22 farklı coğrafya konusu)

- **22 Coğrafya Konusu:**
  1. Doğa ve İnsan
  2. Dünya'nın Şekli ve Hareketleri
  3. Coğrafi Konum
  4. Harita Bilgisi
  5. Atmosfer ve İklim
  6. Sıcaklık
  7. Basınç ve Rüzgarlar
  8. Nem ve Yağış
  9. İklim Tipleri
  10. Dünya'nın Tektonik Oluşumu
  11. İç Kuvvetler ve Kayaçlar
  12. Dış Kuvvetler
  13. Türkiye'nin Yeryüzü Şekilleri
  14. Dünyada ve Türkiye'de Su, Toprak ve Bitki Varlığı
  15. Yerleşmeler
  16. Nüfus
  17. Türkiye'de Nüfus
  18. Göçler
  19. Ekonomik Faaliyetler
  20. Bölge Çeşitleri ve Bölge Sınırlarının Belirlenmesi
  21. Uluslararası Ulaşım Hatları
  22. Doğal Afetler

- **Quiz Özellikleri:**
  - True/False soru formatı
  - Anlık geri bildirim
  - Detaylı açıklamalar
  - İlerleme çubuğu
  - Skor takibi
  - Başarı oranı hesaplama

- **Kullanıcı Deneyimi:**
  - Modern ve responsive tasarım
  - Gradient renkler ve animasyonlar
  - Kullanıcı istatistikleri
  - Local storage ile veri saklama

## 🛠️ Teknolojiler

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router DOM
- **Styling:** CSS3 (Custom CSS)
- **State Management:** React Context API
- **Build Tool:** Create React App

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd yksquiz
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## 🎯 Kullanım

1. **Giriş Yapın:** Demo için herhangi bir e-posta ve şifre kullanabilirsiniz.
2. **Ana Sayfa:** Profil bilgilerinizi ve istatistiklerinizi görüntüleyin.
3. **Konu Seçin:** 22 farklı coğrafya konusundan birini seçin.
4. **Quiz Çözün:** True/False sorularını yanıtlayın ve açıklamaları okuyun.
5. **Sonuçları Görün:** Quiz sonunda başarı oranınızı ve detayları görüntüleyin.

## 📱 Responsive Tasarım

Uygulama mobil cihazlarda da mükemmel çalışır:
- Tablet ve telefon uyumlu
- Touch-friendly butonlar
- Responsive grid layout
- Mobil optimizasyonu

## 🔧 Geliştirme

### Proje Yapısı
```
src/
├── components/          # React bileşenleri
│   ├── Login.tsx       # Giriş ekranı
│   ├── Home.tsx        # Ana sayfa
│   ├── TopicSelection.tsx # Konu seçim
│   └── Quiz.tsx        # Quiz ekranı
├── contexts/           # React Context
│   └── AuthContext.tsx # Kimlik doğrulama
├── App.tsx             # Ana uygulama
├── index.tsx           # Giriş noktası
└── index.css           # Global stiller
```

### Yeni Soru Ekleme
`src/components/Quiz.tsx` dosyasındaki `getQuestionsForTopic` fonksiyonunu düzenleyerek yeni sorular ekleyebilirsiniz.

## 🎨 Tasarım Özellikleri

- **Renk Paleti:** Modern gradient renkler
- **Tipografi:** Inter font ailesi
- **Animasyonlar:** Smooth transitions ve hover efektleri
- **Layout:** CSS Grid ve Flexbox
- **Icons:** Emoji tabanlı ikonlar

## 📊 İstatistikler

Uygulama şu istatistikleri takip eder:
- Tamamlanan quiz sayısı
- Doğru cevap sayısı
- Toplam soru sayısı
- Başarı oranı (%)

## 🔮 Gelecek Özellikler

- [ ] Daha fazla soru ekleme
- [ ] Zaman sınırlı quiz modu
- [ ] Liderlik tablosu
- [ ] Sosyal medya paylaşımı
- [ ] Offline çalışma modu
- [ ] Ses efektleri
- [ ] Dark mode

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

**YKS Coğrafya Quiz** - Coğrafya öğrenmeyi eğlenceli hale getiriyor! 🗺️📚 