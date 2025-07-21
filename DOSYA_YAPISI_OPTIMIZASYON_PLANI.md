# YKS Quiz Uygulaması - Dosya Yapısı Optimizasyon Planı

## Mevcut Durum Analizi

### Tespit Edilen Sorunlar:
1. **Tekrarlanan Bileşenler**: `SubjectSelector`, `AltKonuSelector`, `SubjectCard` gibi bileşenler hem `common/` hem de `subjects/` klasörlerinde bulunuyor
2. **Dağınık CSS Dosyaları**: CSS dosyaları bileşenlerle aynı klasörde, ancak bazıları ayrı `styles/` klasöründe
3. **Karmaşık İç İçe Klasör Yapısı**: `subjects/common/` gibi gereksiz iç içe yapılar
4. **Tutarsız Dosya Organizasyonu**: Bazı bileşenler kendi klasörlerinde, bazıları doğrudan ana klasörde
5. **Script Dosyaları**: Kök dizinde dağınık script dosyaları

## Optimizasyon Fazları

### FAZ 1: Temizlik ve Hazırlık (1-2 gün)
**Hedef**: Gereksiz ve tekrarlanan dosyaları tespit etmek, güvenli bir başlangıç noktası oluşturmak

#### 1.1 Tekrarlanan Bileşenleri Detaylı Analiz
**1.1.1 SubjectSelector Karşılaştırması**
- [ ] `src/components/common/SubjectSelector.tsx` dosyasını incele
- [ ] `src/components/subjects/SubjectSelector.tsx` dosyasını incele
- [ ] Her iki dosyanın import edildiği yerleri tespit et
- [ ] Hangi dosyanın daha güncel olduğunu belirle
- [ ] Farklılıkları not et ve hangi özelliklerin korunması gerektiğini belirle

**1.1.2 AltKonuSelector Karşılaştırması**
- [ ] `src/components/common/AltKonuSelector.tsx` dosyasını incele
- [ ] `src/components/subjects/AltKonuSelector.tsx` dosyasını incele
- [ ] CSS dosyalarını karşılaştır (`AltKonuSelector.css`)
- [ ] Props ve interface'leri karşılaştır
- [ ] Hangi versiyonun daha kapsamlı olduğunu belirle

**1.1.3 SubjectCard Karşılaştırması**
- [ ] `src/components/common/SubjectCard.tsx` dosyasını incele
- [ ] `src/components/subjects/common/SubjectCard.tsx` dosyasını incele
- [ ] Stil dosyalarını karşılaştır
- [ ] Kullanım yerlerini tespit et

**1.1.4 Diğer Tekrarlanan Bileşenler**
- [ ] `AutoResizeText` bileşeninin kullanım yerlerini tespit et
- [ ] `SubjectGrid` ve `SubjectHeader` bileşenlerini analiz et
- [ ] `BackButton` bileşeninin farklı versiyonlarını kontrol et

#### 1.2 Kullanılmayan Dosyaları Detaylı Tespit
**1.2.1 Import Analizi**
- [ ] Tüm `.tsx` dosyalarında import edilen bileşenleri listele
- [ ] `src/components/` altındaki tüm bileşenlerin kullanım durumunu kontrol et
- [ ] Kullanılmayan bileşenleri "UNUSED_" prefix'i ile işaretle

**1.2.2 CSS Dosyası Analizi**
- [ ] Her CSS dosyasının hangi bileşen tarafından kullanıldığını tespit et
- [ ] Kullanılmayan CSS dosyalarını belirle
- [ ] Duplicate CSS kodlarını tespit et

**1.2.3 Script Dosyası Analizi**
- [ ] Kök dizindeki tüm `.js` dosyalarını incele
- [ ] Her script'in ne işe yaradığını belirle
- [ ] Kullanılmayan veya eski script'leri tespit et
- [ ] Script'leri kategorilere ayır (database, deployment, maintenance)

#### 1.3 Güvenli Yedekleme ve Hazırlık
**1.3.1 Git Yedekleme**
- [ ] Mevcut durumu commit et: `git add . && git commit -m "Pre-optimization backup"`
- [ ] Yeni branch oluştur: `git checkout -b file-structure-optimization`
- [ ] Remote'a push et: `git push origin file-structure-optimization`

**1.3.2 Analiz Raporu Oluştur**
- [ ] Tekrarlanan bileşenlerin karşılaştırma raporunu yaz
- [ ] Kullanılmayan dosyaların listesini oluştur
- [ ] Silinecek dosyaların listesini hazırla
- [ ] Taşınacak dosyaların listesini hazırla

**1.3.3 Test Ortamı Hazırla**
- [ ] `npm run build` ile mevcut durumun çalıştığını doğrula
- [ ] `npm start` ile development server'ın çalıştığını kontrol et
- [ ] Temel fonksiyonları test et (login, quiz, profile vb.)

### FAZ 2: Bileşen Yapısını Düzenleme (2-3 gün)
**Hedef**: Tekrarlanan bileşenleri birleştirmek, tutarlı bir yapı oluşturmak ve feature-based organizasyona geçmek

#### 2.1 Common Bileşenleri Detaylı Birleştirme
**2.1.1 UI Bileşenleri Oluşturma**
- [ ] `src/components/common/ui/` klasörünü oluştur
- [ ] `Button/` klasörü oluştur:
  - [ ] Mevcut button stillerini `Button.css` olarak birleştir
  - [ ] `Button.tsx` bileşenini oluştur (reusable button component)
  - [ ] `index.ts` export dosyası oluştur
- [ ] `Card/` klasörü oluştur:
  - [ ] `SubjectCard` stillerini `Card.css` olarak genelleştir
  - [ ] `Card.tsx` bileşenini oluştur (reusable card component)
  - [ ] `index.ts` export dosyası oluştur
- [ ] `Text/` klasörü oluştur:
  - [ ] `AutoResizeText.tsx` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur

**2.1.2 Navigation Bileşenleri**
- [ ] `src/components/common/navigation/` klasörünü oluştur
- [ ] `BackButton/` klasörü oluştur:
  - [ ] `BackButton.tsx` dosyasını taşı
  - [ ] `BackButton.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `navigation/index.ts` export dosyası oluştur

**2.1.3 Subjects Bileşenleri**
- [ ] `src/components/common/subjects/` klasörünü oluştur
- [ ] `SubjectCard/` klasörü oluştur:
  - [ ] En güncel `SubjectCard.tsx` dosyasını seç ve taşı
  - [ ] CSS dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `SubjectGrid/` klasörü oluştur:
  - [ ] `SubjectGrid.tsx` dosyasını taşı
  - [ ] CSS dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `SubjectSelector/` klasörü oluştur:
  - [ ] En güncel `SubjectSelector.tsx` dosyasını seç ve taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `AltKonuSelector/` klasörü oluştur:
  - [ ] En güncel `AltKonuSelector.tsx` dosyasını seç ve taşı
  - [ ] CSS dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `subjects/index.ts` export dosyası oluştur

**2.1.4 Common Index Dosyası**
- [ ] `src/components/common/index.ts` dosyası oluştur
- [ ] Tüm common bileşenleri export et

#### 2.2 Feature-Based Organizasyon Detaylı Uygulama
**2.2.1 Auth Feature**
- [ ] `src/components/features/auth/` klasörünü oluştur
- [ ] `Login/` klasörü oluştur:
  - [ ] `src/components/auth/Login.tsx` dosyasını taşı
  - [ ] `Login.css` dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `EditProfile/` klasörü oluştur:
  - [ ] `src/components/auth/EditProfile.tsx` dosyasını taşı
  - [ ] CSS dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `auth/index.ts` export dosyası oluştur

**2.2.2 Quiz Feature**
- [ ] `src/components/features/quiz/` klasörünü oluştur
- [ ] `Quiz/` klasörü oluştur:
  - [ ] `src/components/quiz/Quiz.tsx` dosyasını taşı
  - [ ] `Quiz.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `TestSelection/` klasörü oluştur:
  - [ ] `src/components/quiz/TestSelection.tsx` dosyasını taşı
  - [ ] `TestSelection.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `JokerPanel/` klasörü oluştur:
  - [ ] `src/components/quiz/JokerPanel.tsx` dosyasını taşı
  - [ ] CSS dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `quiz/index.ts` export dosyası oluştur

**2.2.3 Profile Feature**
- [ ] `src/components/features/profile/` klasörünü oluştur
- [ ] `Profile/` klasörü oluştur:
  - [ ] `src/components/profile/` altındaki dosyaları taşı
  - [ ] CSS dosyalarını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `ProfileLevelCard/` klasörü oluştur:
  - [ ] `src/components/home/ProfileLevelCard.tsx` dosyasını taşı
  - [ ] CSS dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `profile/index.ts` export dosyası oluştur

**2.2.4 Stats Feature**
- [ ] `src/components/features/stats/` klasörünü oluştur
- [ ] `Istatistiklerim/` klasörü oluştur:
  - [ ] `src/components/stats/Istatistiklerim.tsx` dosyasını taşı
  - [ ] `Stats.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `stats/index.ts` export dosyası oluştur

**2.2.5 Market Feature**
- [ ] `src/components/features/market/` klasörünü oluştur
- [ ] `Market/` klasörü oluştur:
  - [ ] `src/components/market/Market.tsx` dosyasını taşı
  - [ ] `Market.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `market/index.ts` export dosyası oluştur

**2.2.6 Admin Feature**
- [ ] `src/components/features/admin/` klasörünü oluştur
- [ ] `PerformanceDashboard/` klasörü oluştur:
  - [ ] `src/components/admin/PerformanceDashboard.tsx` dosyasını taşı
  - [ ] `PerformanceDashboard.css` dosyasını taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `admin/index.ts` export dosyası oluştur

**2.2.7 Home Feature**
- [ ] `src/components/features/home/` klasörünü oluştur
- [ ] `Home/` klasörü oluştur:
  - [ ] `src/components/home/Home.tsx` dosyasını taşı
  - [ ] CSS dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `home/index.ts` export dosyası oluştur

#### 2.3 Pages Organizasyonu
- [ ] `src/components/pages/` klasörünü oluştur
- [ ] `TestPage/` klasörü oluştur:
  - [ ] `src/components/test/TestPage.tsx` dosyasını taşı
  - [ ] CSS dosyası varsa taşı
  - [ ] `index.ts` export dosyası oluştur
- [ ] `pages/index.ts` export dosyası oluştur

#### 2.4 Import Yollarını Güncelleme
**2.4.1 App.tsx Güncellemeleri**
- [ ] `App.tsx` dosyasındaki tüm import yollarını güncelle
- [ ] Yeni klasör yapısına göre import'ları düzenle
- [ ] Test et ve hataları düzelt

**2.4.2 Diğer Dosyalardaki Import'ları Güncelle**
- [ ] Tüm `.tsx` dosyalarındaki import yollarını güncelle
- [ ] TypeScript hatalarını düzelt
- [ ] Build testini yap

#### 2.5 Eski Klasörleri Temizleme
- [ ] `src/components/auth/` klasörünü sil
- [ ] `src/components/quiz/` klasörünü sil
- [ ] `src/components/profile/` klasörünü sil
- [ ] `src/components/stats/` klasörünü sil
- [ ] `src/components/market/` klasörünü sil
- [ ] `src/components/admin/` klasörünü sil
- [ ] `src/components/home/` klasörünü sil
- [ ] `src/components/test/` klasörünü sil
- [ ] `src/components/subjects/` klasörünü sil
- [ ] `src/components/common/` klasöründeki eski dosyaları sil

#### 2.6 Test ve Doğrulama
- [ ] `npm run build` ile build testini yap
- [ ] `npm start` ile development server'ı test et
- [ ] Tüm sayfaların çalıştığını kontrol et
- [ ] Import hatalarını düzelt
- [ ] Git commit: "Complete component structure reorganization"

### FAZ 3: Stil Organizasyonu (1-2 gün)
**Hedef**: CSS dosyalarını tutarlı bir şekilde organize etmek, tema sistemini kurmak ve stil yönetimini iyileştirmek

#### 3.1 Mevcut Stil Analizi
**3.1.1 CSS Dosyalarını Tespit Et**
- [ ] Tüm `.css` dosyalarını listele ve kategorilere ayır
- [ ] Her CSS dosyasının hangi bileşen tarafından kullanıldığını belirle
- [ ] Duplicate CSS kodlarını tespit et
- [ ] Kullanılmayan CSS dosyalarını belirle

**3.1.2 Stil Yapısını Analiz Et**
- [ ] Mevcut `src/styles/` klasörünü incele
- [ ] Bileşen bazlı CSS dosyalarını analiz et
- [ ] Global stilleri tespit et
- [ ] Tema değişkenlerini belirle

#### 3.2 Yeni Stil Yapısını Oluşturma
**3.2.1 Base Stiller**
- [ ] `src/styles/base/` klasörünü oluştur
- [ ] `reset.css` dosyası oluştur (CSS reset/normalize)
- [ ] `typography.css` dosyası oluştur (font stilleri)
- [ ] `variables.css` dosyası oluştur (CSS değişkenleri)
- [ ] `base/index.css` export dosyası oluştur

**3.2.2 Component Stilleri**
- [ ] `src/styles/components/` klasörünü oluştur
- [ ] `common/` klasörü oluştur:
  - [ ] `button.css` - Tüm button stilleri
  - [ ] `card.css` - Card bileşen stilleri
  - [ ] `navigation.css` - Navigasyon stilleri
  - [ ] `index.css` export dosyası
- [ ] `features/` klasörü oluştur:
  - [ ] `quiz.css` - Quiz sayfası stilleri
  - [ ] `profile.css` - Profile sayfası stilleri
  - [ ] `market.css` - Market sayfası stilleri
  - [ ] `auth.css` - Auth sayfası stilleri
  - [ ] `stats.css` - Stats sayfası stilleri
  - [ ] `admin.css` - Admin sayfası stilleri
  - [ ] `home.css` - Home sayfası stilleri
  - [ ] `index.css` export dosyası
- [ ] `pages/` klasörü oluştur:
  - [ ] `test-page.css` - Test sayfası stilleri
  - [ ] `index.css` export dosyası

**3.2.3 Theme Sistemi**
- [ ] `src/styles/themes/` klasörünü oluştur
- [ ] `light.css` dosyası oluştur (açık tema değişkenleri)
- [ ] `dark.css` dosyası oluştur (koyu tema değişkenleri)
- [ ] `index.css` export dosyası oluştur
- [ ] Tema değiştirme fonksiyonlarını oluştur

**3.2.4 Utility Sınıfları**
- [ ] `src/styles/utilities/` klasörünü oluştur
- [ ] `spacing.css` dosyası oluştur (margin, padding utility'leri)
- [ ] `layout.css` dosyası oluştur (flexbox, grid utility'leri)
- [ ] `animations.css` dosyası oluştur (transition, animation utility'leri)
- [ ] `colors.css` dosyası oluştur (renk utility'leri)
- [ ] `index.css` export dosyası oluştur

#### 3.3 CSS Dosyalarını Taşıma ve Birleştirme
**3.3.1 Bileşen CSS'lerini Taşıma**
- [ ] `BackButton.css` dosyasını `components/common/navigation.css` olarak taşı
- [ ] `SubjectCard.css` dosyasını `components/common/card.css` olarak taşı
- [ ] `AltKonuSelector.css` dosyasını `components/common/` altına taşı
- [ ] `Quiz.css` dosyasını `components/features/quiz.css` olarak taşı
- [ ] `TestSelection.css` dosyasını `components/features/quiz.css` ile birleştir
- [ ] `Market.css` dosyasını `components/features/market.css` olarak taşı
- [ ] `Stats.css` dosyasını `components/features/stats.css` olarak taşı
- [ ] `PerformanceDashboard.css` dosyasını `components/features/admin.css` olarak taşı

**3.3.2 Global CSS'leri Taşıma**
- [ ] `global.css` dosyasını `base/` klasörüne taşı ve böl
- [ ] `common.css` dosyasını `utilities/` klasörüne taşı ve böl
- [ ] `dark-mode.css` dosyasını `themes/dark.css` olarak taşı

#### 3.4 CSS Değişkenleri ve Tema Sistemi
**3.4.1 CSS Değişkenlerini Tanımla**
- [ ] `variables.css` dosyasında renk paletini tanımla
- [ ] Font boyutlarını tanımla
- [ ] Spacing değerlerini tanımla
- [ ] Border radius değerlerini tanımla
- [ ] Shadow değerlerini tanımla

**3.4.2 Tema Değişkenlerini Oluştur**
- [ ] Light tema için değişkenleri tanımla
- [ ] Dark tema için değişkenleri tanımla
- [ ] Tema geçiş fonksiyonlarını oluştur

#### 3.5 Ana Stil Dosyasını Oluşturma
- [ ] `src/styles/index.css` dosyası oluştur
- [ ] Tüm stil dosyalarını import et
- [ ] Import sırasını düzenle (base → themes → utilities → components)
- [ ] CSS custom properties'leri tanımla

#### 3.6 Bileşenlerde CSS Import'larını Güncelleme
**3.6.1 CSS Import Yollarını Güncelle**
- [ ] Tüm bileşenlerdeki CSS import yollarını güncelle
- [ ] Yeni stil yapısına göre import'ları düzenle
- [ ] Kullanılmayan CSS import'larını kaldır

**3.6.2 CSS Class İsimlerini Güncelle**
- [ ] Bileşenlerdeki CSS class isimlerini kontrol et
- [ ] Yeni stil yapısına uygun hale getir
- [ ] Utility class'ları kullan

#### 3.7 Test ve Doğrulama
- [ ] `npm run build` ile build testini yap
- [ ] `npm start` ile development server'ı test et
- [ ] Tüm sayfaların stillerinin doğru yüklendiğini kontrol et
- [ ] Dark/light tema geçişlerini test et
- [ ] Responsive tasarımı kontrol et
- [ ] CSS hatalarını düzelt
- [ ] Git commit: "Complete CSS organization and theme system"

### FAZ 4: Veri ve Servis Organizasyonu (1 gün)
**Hedef**: Veri yapısını ve servisleri düzenlemek, API katmanını organize etmek ve veri yönetimini iyileştirmek

#### 4.1 Mevcut Veri Yapısını Analiz Etme
**4.1.1 Veri Dosyalarını İnceleme**
- [ ] `src/data/subjects/` klasörünü detaylı incele
- [ ] `subjectsConfig.ts` dosyasının yapısını analiz et
- [ ] `altKonularConfig.ts` dosyasının boyutunu ve yapısını kontrol et
- [ ] Veri dosyalarının kullanım yerlerini tespit et

**4.1.2 Servis Dosyalarını İnceleme**
- [ ] `src/services/firebase.ts` dosyasını analiz et
- [ ] Firebase servislerinin nasıl kullanıldığını kontrol et
- [ ] Diğer servis dosyalarını tespit et

#### 4.2 Veri Yapısını Detaylı Düzenleme
**4.2.1 Subjects Veri Organizasyonu**
- [ ] `src/data/subjects/config/` klasörünü oluştur
- [ ] `subjectsConfig.ts` dosyasını taşı
- [ ] `altKonularConfig.ts` dosyasını taşı
- [ ] `config/index.ts` export dosyası oluştur
- [ ] Büyük config dosyalarını böl (altKonularConfig.ts çok büyük)

**4.2.2 Subjects Types Organizasyonu**
- [ ] `src/data/subjects/types/` klasörünü oluştur
- [ ] `subject.types.ts` dosyası oluştur (Subject interface'leri)
- [ ] `altKonu.types.ts` dosyası oluştur (AltKonu interface'leri)
- [ ] `types/index.ts` export dosyası oluştur

**4.2.3 Quiz Veri Organizasyonu**
- [ ] `src/data/quiz/` klasörünü oluştur
- [ ] `questions/` klasörü oluştur:
  - [ ] `types.ts` - Soru tipleri
  - [ ] `constants.ts` - Quiz sabitleri
  - [ ] `index.ts` export dosyası
- [ ] `results/` klasörü oluştur:
  - [ ] `types.ts` - Sonuç tipleri
  - [ ] `calculations.ts` - Puan hesaplama fonksiyonları
  - [ ] `index.ts` export dosyası
- [ ] `quiz/index.ts` export dosyası oluştur

**4.2.4 User Veri Organizasyonu**
- [ ] `src/data/user/` klasörünü oluştur
- [ ] `types.ts` dosyası oluştur (User interface'leri)
- [ ] `profile.ts` dosyası oluştur (Profil veri yapıları)
- [ ] `stats.ts` dosyası oluştur (İstatistik veri yapıları)
- [ ] `index.ts` export dosyası oluştur

**4.2.5 Market Veri Organizasyonu**
- [ ] `src/data/market/` klasörünü oluştur
- [ ] `types.ts` dosyası oluştur (Market item tipleri)
- [ ] `items.ts` dosyası oluştur (Market item'ları)
- [ ] `index.ts` export dosyası oluştur

#### 4.3 Servis Yapısını Detaylı Düzenleme
**4.3.1 Firebase API Organizasyonu**
- [ ] `src/services/api/firebase/` klasörünü oluştur
- [ ] `auth.ts` dosyası oluştur (Authentication servisleri)
- [ ] `database.ts` dosyası oluştur (Firestore servisleri)
- [ ] `storage.ts` dosyası oluştur (Storage servisleri)
- [ ] `config.ts` dosyası oluştur (Firebase konfigürasyonu)
- [ ] `index.ts` export dosyası oluştur

**4.3.2 Feature-Based API Servisleri**
- [ ] `src/services/api/quiz.ts` dosyası oluştur (Quiz API servisleri)
- [ ] `src/services/api/user.ts` dosyası oluştur (User API servisleri)
- [ ] `src/services/api/market.ts` dosyası oluştur (Market API servisleri)
- [ ] `src/services/api/stats.ts` dosyası oluştur (Stats API servisleri)
- [ ] `src/services/api/admin.ts` dosyası oluştur (Admin API servisleri)

**4.3.3 Utility Servisleri**
- [ ] `src/services/utils/` klasörünü oluştur
- [ ] `validation.ts` dosyası oluştur (Form validation fonksiyonları)
- [ ] `formatting.ts` dosyası oluştur (Veri formatlama fonksiyonları)
- [ ] `calculations.ts` dosyası oluştur (Hesaplama fonksiyonları)
- [ ] `date.ts` dosyası oluştur (Tarih işleme fonksiyonları)
- [ ] `index.ts` export dosyası oluştur

#### 4.4 Mevcut Dosyaları Taşıma ve Güncelleme
**4.4.1 Firebase Dosyasını Bölme**
- [ ] `src/services/firebase.ts` dosyasını analiz et
- [ ] Authentication kısmını `api/firebase/auth.ts` olarak taşı
- [ ] Database kısmını `api/firebase/database.ts` olarak taşı
- [ ] Config kısmını `api/firebase/config.ts` olarak taşı
- [ ] Eski `firebase.ts` dosyasını sil

**4.4.2 Veri Dosyalarını Taşıma**
- [ ] `src/data/subjects/subjectsConfig.ts` dosyasını `config/` klasörüne taşı
- [ ] `src/data/subjects/altKonularConfig.ts` dosyasını `config/` klasörüne taşı
- [ ] `src/data/subjects/index.ts` dosyasını güncelle

**4.4.3 AltKonularConfig Dosyasını Bölme**
- [ ] `altKonularConfig.ts` dosyasını analiz et (58KB çok büyük)
- [ ] Dosyayı derslere göre böl:
  - [ ] `matematik.ts`
  - [ ] `fizik.ts`
  - [ ] `kimya.ts`
  - [ ] `biyoloji.ts`
  - [ ] `turkce.ts`
  - [ ] `tarih.ts`
  - [ ] `cografya.ts`
  - [ ] `felsefe.ts`
- [ ] `altKonularConfig.ts` dosyasını bu dosyaları import edecek şekilde güncelle

#### 4.5 Import Yollarını Güncelleme
**4.5.1 Bileşenlerdeki Import'ları Güncelle**
- [ ] Tüm bileşenlerdeki veri import yollarını güncelle
- [ ] Servis import yollarını güncelle
- [ ] Type import yollarını güncelle

**4.5.2 Context Dosyalarındaki Import'ları Güncelle**
- [ ] `src/contexts/AuthContext.tsx` dosyasındaki import'ları güncelle
- [ ] Diğer context dosyalarındaki import'ları güncelle

#### 4.6 TypeScript Tip Tanımlarını İyileştirme
**4.6.1 Interface'leri Güncelleme**
- [ ] Tüm veri tiplerini yeni yapıya göre güncelle
- [ ] Generic tipleri ekle
- [ ] Union tipleri kullan
- [ ] Optional property'leri düzenle

**4.6.2 Type Export'larını Düzenleme**
- [ ] Her klasörde `index.ts` dosyası oluştur
- [ ] Tüm tipleri düzgün export et
- [ ] Barrel export pattern kullan

#### 4.7 Test ve Doğrulama
- [ ] `npm run build` ile build testini yap
- [ ] TypeScript hatalarını düzelt
- [ ] Firebase bağlantılarını test et
- [ ] Veri yapılarının doğru çalıştığını kontrol et
- [ ] Import hatalarını düzelt
- [ ] Git commit: "Complete data and services reorganization"

### FAZ 5: Script ve Yardımcı Dosyalar (1 gün)
**Hedef**: Kök dizindeki script dosyalarını organize etmek, deployment süreçlerini iyileştirmek ve bakım araçlarını düzenlemek

#### 5.1 Mevcut Script Analizi
**5.1.1 Script Dosyalarını Tespit Etme**
- [ ] Kök dizindeki tüm `.js` dosyalarını listele
- [ ] `scripts/` klasöründeki mevcut dosyaları incele
- [ ] Her script'in ne işe yaradığını belirle
- [ ] Kullanılmayan script'leri tespit et

**5.1.2 Script Kategorilerini Belirleme**
- [ ] Database işlemleri için script'leri grupla
- [ ] Deployment işlemleri için script'leri grupla
- [ ] Maintenance işlemleri için script'leri grupla
- [ ] Utility script'leri grupla

#### 5.2 Script Organizasyonu Detaylı Uygulama
**5.2.1 Database Scripts**
- [ ] `scripts/database/` klasörünü oluştur
- [ ] `csv-to-firebase.js` dosyasını taşı
- [ ] `delete-questions.js` dosyasını taşı
- [ ] `fix-daily-activity-decimals-admin.js` dosyasını taşı
- [ ] `fix-session-time-location.js` dosyasını taşı
- [ ] `fixSessionTimes.js` dosyasını taşı
- [ ] `validate-csv.js` dosyasını taşı
- [ ] `database/README.md` dosyası oluştur (her script'in açıklaması)

**5.2.2 Deployment Scripts**
- [ ] `scripts/deployment/` klasörünü oluştur
- [ ] `deploy.sh` dosyasını taşı
- [ ] `quick-deploy.sh` dosyasını taşı
- [ ] `setup-vps.sh` dosyasını taşı
- [ ] `deployment/README.md` dosyası oluştur

**5.2.3 Maintenance Scripts**
- [ ] `scripts/maintenance/` klasörünü oluştur
- [ ] `health-check.sh` dosyasını taşı
- [ ] `backup.sh` dosyası oluştur (otomatik yedekleme)
- [ ] `cleanup.sh` dosyası oluştur (geçici dosyaları temizleme)
- [ ] `maintenance/README.md` dosyası oluştur

**5.2.4 Utility Scripts**
- [ ] `scripts/utils/` klasörünü oluştur
- [ ] `generate-sitemap.js` dosyası oluştur (sitemap oluşturma)
- [ ] `analyze-bundle.js` dosyası oluştur (bundle analizi)
- [ ] `check-dependencies.js` dosyası oluştur (dependency kontrolü)
- [ ] `utils/README.md` dosyası oluştur

#### 5.3 Script İyileştirmeleri
**5.3.1 Database Script İyileştirmeleri**
- [ ] `csv-to-firebase.js` dosyasını güncelle:
  - [ ] Error handling ekle
  - [ ] Progress bar ekle
  - [ ] Logging sistemi ekle
  - [ ] Configuration dosyası ekle
- [ ] `validate-csv.js` dosyasını güncelle:
  - [ ] Daha detaylı validation ekle
  - [ ] Report generation ekle
  - [ ] Error summary ekle

**5.3.2 Deployment Script İyileştirmeleri**
- [ ] `deploy.sh` dosyasını güncelle:
  - [ ] Environment check ekle
  - [ ] Backup before deploy ekle
  - [ ] Rollback mechanism ekle
  - [ ] Notification system ekle
- [ ] `quick-deploy.sh` dosyasını güncelle:
  - [ ] Safety checks ekle
  - [ ] Quick rollback ekle

**5.3.3 Maintenance Script İyileştirmeleri**
- [ ] `health-check.sh` dosyasını güncelle:
  - [ ] Database connection check ekle
  - [ ] API endpoint check ekle
  - [ ] Performance metrics ekle
  - [ ] Alert system ekle

#### 5.4 Yeni Script'ler Oluşturma
**5.4.1 Development Scripts**
- [ ] `scripts/dev/` klasörü oluştur
- [ ] `setup-dev.js` dosyası oluştur (development ortamı kurulumu)
- [ ] `reset-db.js` dosyası oluştur (test veritabanını sıfırlama)
- [ ] `seed-data.js` dosyası oluştur (test verisi ekleme)
- [ ] `dev/README.md` dosyası oluştur

**5.4.2 Testing Scripts**
- [ ] `scripts/test/` klasörü oluştur
- [ ] `run-tests.js` dosyası oluştur (test suite çalıştırma)
- [ ] `coverage-report.js` dosyası oluştur (test coverage raporu)
- [ ] `test/README.md` dosyası oluştur

**5.4.3 Monitoring Scripts**
- [ ] `scripts/monitoring/` klasörü oluştur
- [ ] `performance-monitor.js` dosyası oluştur (performans izleme)
- [ ] `error-tracker.js` dosyası oluştur (hata takibi)
- [ ] `user-analytics.js` dosyası oluştur (kullanıcı analitikleri)
- [ ] `monitoring/README.md` dosyası oluştur

#### 5.5 Package.json Script Güncellemeleri
**5.5.1 NPM Scripts Ekleme**
- [ ] `package.json` dosyasına yeni script'ler ekle:
  - [ ] `"db:import": "node scripts/database/csv-to-firebase.js"`
  - [ ] `"db:validate": "node scripts/database/validate-csv.js"`
  - [ ] `"deploy:quick": "bash scripts/deployment/quick-deploy.sh"`
  - [ ] `"deploy:full": "bash scripts/deployment/deploy.sh"`
  - [ ] `"health:check": "bash scripts/maintenance/health-check.sh"`
  - [ ] `"dev:setup": "node scripts/dev/setup-dev.js"`
  - [ ] `"test:run": "node scripts/test/run-tests.js"`

**5.5.2 Script Documentation**
- [ ] Her script için usage örnekleri ekle
- [ ] Parameter açıklamaları ekle
- [ ] Error handling açıklamaları ekle

#### 5.6 Eski Dosyaları Temizleme
**5.5.1 Kök Dizindeki Script'leri Taşıma**
- [ ] Kök dizindeki tüm `.js` script dosyalarını uygun klasörlere taşı
- [ ] Kök dizindeki `.sh` dosyalarını uygun klasörlere taşı
- [ ] Kullanılmayan script dosyalarını sil

**5.5.2 Backup ve Yedekleme**
- [ ] Taşınan dosyaların yedeğini al
- [ ] Git commit oluştur: "Move scripts to organized structure"

#### 5.7 Ana Scripts README Oluşturma
- [ ] `scripts/README.md` dosyası oluştur
- [ ] Her klasörün açıklamasını ekle
- [ ] Kullanım örneklerini ekle
- [ ] Troubleshooting bölümü ekle
- [ ] Best practices ekle

#### 5.8 Test ve Doğrulama
- [ ] Tüm script'lerin çalıştığını test et
- [ ] Database script'lerini test ortamında çalıştır
- [ ] Deployment script'lerini test et
- [ ] Maintenance script'lerini test et
- [ ] NPM script'lerinin çalıştığını kontrol et
- [ ] Git commit: "Complete script organization and improvements"

### FAZ 6: Dokümantasyon ve Temizlik (1 gün)
**Hedef**: Dokümantasyonu güncellemek, kod kalitesini artırmak ve son temizliği yapmak

#### 6.1 Ana Dokümantasyon Güncelleme
**6.1.1 README.md Güncelleme**
- [ ] `README.md` dosyasını yeni yapıya göre güncelle
- [ ] Proje açıklamasını güncelle
- [ ] Kurulum talimatlarını güncelle
- [ ] Yeni dosya yapısını açıkla
- [ ] Development workflow'unu dokümante et
- [ ] Deployment talimatlarını güncelle
- [ ] Contributing guidelines ekle

**6.1.2 Klasör Bazlı README Dosyaları**
- [ ] `src/components/README.md` oluştur (bileşen organizasyonu)
- [ ] `src/services/README.md` oluştur (servis yapısı)
- [ ] `src/data/README.md` oluştur (veri organizasyonu)
- [ ] `src/styles/README.md` oluştur (stil sistemi)
- [ ] `src/utils/README.md` oluştur (utility fonksiyonları)
- [ ] `scripts/README.md` oluştur (script kullanımı)

**6.1.3 Feature README Dosyaları**
- [ ] `src/components/features/auth/README.md` oluştur
- [ ] `src/components/features/quiz/README.md` oluştur
- [ ] `src/components/features/profile/README.md` oluştur
- [ ] `src/components/features/market/README.md` oluştur
- [ ] `src/components/features/stats/README.md` oluştur
- [ ] `src/components/features/admin/README.md` oluştur

#### 6.2 Kod Kalitesi İyileştirmeleri
**6.2.1 Import/Export Optimizasyonu**
- [ ] Tüm dosyalardaki import'ları optimize et
- [ ] Kullanılmayan import'ları kaldır
- [ ] Barrel export pattern'lerini düzenle
- [ ] Circular dependency'leri tespit et ve çöz
- [ ] Import sıralamasını düzenle

**6.2.2 TypeScript İyileştirmeleri**
- [ ] TypeScript hatalarını düzelt
- [ ] Strict mode'u etkinleştir
- [ ] Type definitions'ları iyileştir
- [ ] Generic tipleri ekle
- [ ] Interface'leri optimize et

**6.2.3 Code Style Düzenlemeleri**
- [ ] ESLint kurallarını güncelle
- [ ] Prettier konfigürasyonunu optimize et
- [ ] Code formatting'i düzenle
- [ ] Naming conventions'ları kontrol et
- [ ] Comment'leri güncelle

#### 6.3 Performans Optimizasyonları
**6.3.1 Bundle Optimizasyonu**
- [ ] Webpack konfigürasyonunu optimize et
- [ ] Code splitting'i iyileştir
- [ ] Tree shaking'i optimize et
- [ ] Bundle size'ı analiz et
- [ ] Lazy loading ekle

**6.3.2 React Optimizasyonları**
- [ ] React.memo kullanımını optimize et
- [ ] useMemo ve useCallback kullanımını kontrol et
- [ ] Component re-render'larını minimize et
- [ ] Context optimization'ları yap

**6.3.3 CSS Optimizasyonları**
- [ ] CSS bundle size'ını optimize et
- [ ] Critical CSS'i inline et
- [ ] CSS purging ekle
- [ ] CSS minification'ı optimize et

#### 6.4 Güvenlik İyileştirmeleri
**6.4.1 Dependency Güvenliği**
- [ ] `npm audit` çalıştır
- [ ] Güvenlik açıklarını düzelt
- [ ] Dependency'leri güncelle
- [ ] Security headers ekle

**6.4.2 Code Security**
- [ ] XSS koruması ekle
- [ ] Input validation'ları güçlendir
- [ ] Authentication kontrollerini iyileştir
- [ ] Authorization kontrollerini güçlendir

#### 6.5 Test ve Doğrulama
**6.5.1 Kapsamlı Test**
- [ ] `npm run build` ile build testini yap
- [ ] `npm start` ile development server'ı test et
- [ ] Tüm sayfaların çalıştığını kontrol et
- [ ] Tüm özelliklerin çalıştığını test et
- [ ] Responsive tasarımı kontrol et
- [ ] Cross-browser compatibility test et

**6.5.2 Performance Test**
- [ ] Lighthouse audit çalıştır
- [ ] Core Web Vitals'ı kontrol et
- [ ] Loading speed'i test et
- [ ] Memory usage'ı kontrol et

**6.5.3 Accessibility Test**
- [ ] WCAG guidelines'a uygunluğu kontrol et
- [ ] Screen reader compatibility test et
- [ ] Keyboard navigation test et
- [ ] Color contrast kontrol et

#### 6.6 Final Temizlik
**6.6.1 Dosya Temizliği**
- [ ] Kullanılmayan dosyaları sil
- [ ] Duplicate dosyaları temizle
- [ ] Temporary dosyaları kaldır
- [ ] Backup dosyalarını temizle

**6.6.2 Git Temizliği**
- [ ] Git history'yi temizle
- [ ] Commit mesajlarını düzenle
- [ ] Branch'leri temizle
- [ ] Tag'leri organize et

**6.6.3 Environment Temizliği**
- [ ] Environment variables'ları düzenle
- [ ] Configuration dosyalarını optimize et
- [ ] Development/production ayarlarını düzenle

#### 6.7 Deployment Hazırlığı
**6.7.1 Production Build**
- [ ] Production build oluştur
- [ ] Environment variables'ları ayarla
- [ ] CDN konfigürasyonunu optimize et
- [ ] Cache strategy'yi ayarla

**6.7.2 Monitoring Setup**
- [ ] Error tracking sistemi kur
- [ ] Performance monitoring ekle
- [ ] Analytics sistemi kur
- [ ] Health check endpoint'leri ekle

#### 6.8 Final Dokümantasyon
**6.8.1 Migration Guide**
- [ ] Eski yapıdan yeni yapıya geçiş rehberi oluştur
- [ ] Breaking changes'leri dokümante et
- [ ] Rollback planı hazırla

**6.8.2 Maintenance Guide**
- [ ] Bakım talimatlarını oluştur
- [ ] Troubleshooting rehberi hazırla
- [ ] Best practices dokümante et

**6.8.3 Final Commit**
- [ ] Tüm değişiklikleri commit et
- [ ] Tag oluştur: "v2.0.0 - File Structure Optimization"
- [ ] Release notes hazırla
- [ ] Deployment'a hazır olduğunu doğrula

#### 6.9 Post-Optimization Checklist
- [ ] Tüm fazların tamamlandığını kontrol et
- [ ] Test sonuçlarını değerlendir
- [ ] Performance metrics'leri karşılaştır
- [ ] Code quality metrics'leri ölç
- [ ] Team feedback'ini al
- [ ] Optimization success'ini değerlendir

## Yeni Dosya Yapısı Özeti

```
yksquizv25/
├── public/
├── scripts/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── features/
│   │   └── pages/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Faydalar

### Optimizasyon Sonrası Kazanımlar:
1. **Daha İyi Organizasyon**: Her bileşen kendi klasöründe, CSS ile birlikte
2. **Tekrar Kullanılabilirlik**: Common bileşenler merkezi konumda
3. **Kolay Bakım**: Feature-based organizasyon ile ilgili kodlar bir arada
4. **Tutarlılık**: Tüm bileşenler aynı yapıyı takip ediyor
5. **Ölçeklenebilirlik**: Yeni özellikler kolayca eklenebilir
6. **Performans**: Daha iyi tree-shaking ve code splitting

## Risk Yönetimi

### Potansiyel Riskler:
1. **Import Yolları**: Tüm import'ların güncellenmesi gerekli
2. **Build Hataları**: TypeScript ve bundler hataları olabilir
3. **Git Geçmişi**: Dosya taşıma işlemleri git geçmişini etkileyebilir

### Risk Azaltma Stratejileri:
1. **Aşamalı Geçiş**: Her fazı ayrı ayrı test et
2. **Yedekleme**: Her faz öncesi commit oluştur
3. **Test**: Her değişiklik sonrası build ve runtime testi yap
4. **Geri Alma Planı**: Sorun çıkarsa önceki commit'e dön

## Zaman Çizelgesi

- **Toplam Süre**: 7-10 gün
- **Faz 1**: 1-2 gün (Analiz ve hazırlık)
- **Faz 2**: 2-3 gün (Bileşen düzenleme)
- **Faz 3**: 1-2 gün (Stil organizasyonu)
- **Faz 4**: 1 gün (Veri ve servis düzenleme)
- **Faz 5**: 1 gün (Script organizasyonu)
- **Faz 6**: 1 gün (Dokümantasyon ve temizlik)

## Sonraki Adımlar

1. Bu planı gözden geçir ve onayla
2. Faz 1'den başlayarak aşamalı olarak uygula
3. Her faz sonrası test yap
4. Gerekirse planı güncelle
5. Optimizasyon tamamlandıktan sonra performans testleri yap 