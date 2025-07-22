# YKS Quiz - Migration Guide

Bu dokümantasyon, eski dosya yapısından yeni optimize edilmiş yapıya geçiş rehberidir.

## 🔄 Değişiklikler Özeti

### ✅ Tamamlanan Optimizasyonlar

#### 1. Bileşen Organizasyonu
- **Eski**: Dağınık bileşen yapısı
- **Yeni**: Feature-based organizasyon
  ```
  src/components/
  ├── common/          # Ortak bileşenler
  ├── features/        # Özellik bazlı bileşenler
  └── pages/           # Sayfa bileşenleri
  ```

#### 2. Stil Organizasyonu
- **Eski**: Bileşenlerle karışık CSS dosyaları
- **Yeni**: Merkezi stil sistemi
  ```
  src/styles/
  ├── base/            # Temel stiller
  ├── components/      # Bileşen stilleri
  ├── themes/          # Tema sistemi
  └── utilities/       # Utility sınıfları
  ```

#### 3. Veri ve Servis Organizasyonu
- **Eski**: Tek dosyada tüm servisler
- **Yeni**: Kategorize edilmiş servisler
  ```
  src/services/
  ├── firebase/        # Firebase servisleri
  ├── api/             # API servisleri
  └── utils/           # Utility servisleri
  ```

#### 4. Script Organizasyonu
- **Eski**: Kök dizinde dağınık script'ler
- **Yeni**: Kategorize edilmiş script'ler
  ```
  scripts/
  ├── database/        # Veritabanı işlemleri
  ├── deployment/      # Deployment script'leri
  ├── maintenance/     # Bakım ve temizlik
  ├── utils/           # Yardımcı araçlar
  ├── dev/             # Development araçları
  ├── test/            # Test script'leri
  └── monitoring/      # Performans izleme
  ```

## 📋 Breaking Changes

### Import Yolları Değişiklikleri

#### Bileşen Import'ları
```typescript
// ❌ Eski
import SubjectCard from '../components/SubjectCard';
import Quiz from '../components/quiz/Quiz';

// ✅ Yeni
import { SubjectCard } from '@/components/common/subjects';
import { Quiz } from '@/components/features/quiz';
```

#### Servis Import'ları
```typescript
// ❌ Eski
import { auth, getUserData } from '../services/firebase';

// ✅ Yeni
import { auth } from '@/services/firebase/config';
import { getUserData } from '@/services/firebase/database';
```

#### Stil Import'ları
```typescript
// ❌ Eski
import './Quiz.css';

// ✅ Yeni
import '@/styles/components/features/quiz.css';
```

### NPM Script Değişiklikleri

#### Database Script'leri
```bash
# ❌ Eski
npm run db:upload-csv

# ✅ Yeni (aynı komut, farklı yol)
npm run db:upload-csv  # Artık scripts/database/ klasöründen çalışır
```

#### Yeni Script'ler
```bash
# Development
npm run dev:setup              # Development ortamı kurulumu
npm run test:run               # Test suite çalıştırma

# Utility
npm run utils:sitemap          # Sitemap oluşturma
npm run utils:analyze-bundle   # Bundle analizi
npm run utils:check-deps       # Dependency kontrolü

# Deployment
npm run deploy:quick           # Hızlı deployment
npm run deploy:full            # Tam deployment
npm run health:check           # Sistem sağlık kontrolü
```

## 🔧 Migration Adımları

### 1. Proje Klonlama
```bash
# Yeni projeyi klonla
git clone <repository-url>
cd yksquizv26

# Bağımlılıkları yükle
npm install
```

### 2. Environment Setup
```bash
# Environment dosyalarını kopyala
cp .env.example .env

# Firebase konfigürasyonunu kontrol et
# src/services/firebase/config.ts dosyasını güncelle
```

### 3. Import Yollarını Güncelle
```bash
# Tüm dosyalarda import yollarını kontrol et
npm run lint

# Hataları düzelt
npm run lint:fix
```

### 4. Test Et
```bash
# Development server'ı başlat
npm start

# Build testi yap
npm run build

# Test'leri çalıştır
npm test
```

## 🚨 Önemli Notlar

### Güvenlik
- `serviceAccountKey.json` dosyasını asla commit etmeyin
- Environment variable'ları güvenli şekilde saklayın
- Firebase kurallarını kontrol edin

### Performance
- Bundle boyutunu kontrol edin: `npm run utils:analyze-bundle`
- Dependency'leri kontrol edin: `npm run utils:check-deps`
- Performans metriklerini izleyin: `npm run utils:performance-monitor`

### Backup
- Migration öncesi tam backup alın
- Veritabanı yedeği alın
- Eski kodun yedeğini saklayın

## 🔍 Troubleshooting

### Yaygın Sorunlar

#### Import Hatası
```bash
# Hata: Cannot find module
# Çözüm: Import yolunu kontrol et
import { Component } from '@/components/common/ui';
```

#### Build Hatası
```bash
# Hata: Build failed
# Çözüm: 
npm run lint:fix
npm run type-check
```

#### Script Çalışmıyor
```bash
# Hata: Script not found
# Çözüm: Node.js versiyonunu kontrol et
node --version  # >= 16.0.0 olmalı
```

### Rollback Planı

Eğer sorun çıkarsa:

1. **Git ile geri dön**
   ```bash
   git checkout <previous-commit>
   ```

2. **Manuel rollback**
   - Eski dosya yapısını geri yükle
   - Import yollarını eski haline getir
   - Package.json'ı eski haline getir

3. **Veritabanı rollback**
   - Firebase backup'ını geri yükle
   - Veri tutarlılığını kontrol et

## 📞 Destek

Migration sırasında sorun yaşarsanız:

1. **Dokümantasyonu kontrol edin**
   - Bu migration guide
   - README.md dosyası
   - Klasör README'leri

2. **Script'leri kullanın**
   ```bash
   npm run dev:setup      # Development ortamı kontrolü
   npm run health:check   # Sistem sağlık kontrolü
   ```

3. **Log'ları kontrol edin**
   - Console hataları
   - Build log'ları
   - Test log'ları

## ✅ Migration Checklist

- [ ] Proje klonlandı
- [ ] Environment dosyaları ayarlandı
- [ ] Firebase konfigürasyonu güncellendi
- [ ] Import yolları düzeltildi
- [ ] ESLint hataları giderildi
- [ ] Build başarılı
- [ ] Test'ler geçiyor
- [ ] Development server çalışıyor
- [ ] Production build test edildi
- [ ] Yeni script'ler test edildi
- [ ] Dokümantasyon güncellendi

## 🎯 Sonraki Adımlar

Migration tamamlandıktan sonra:

1. **Yeni özellikleri keşfet**
   - Yeni script komutları
   - Gelişmiş dokümantasyon
   - Optimize edilmiş yapı

2. **Performans iyileştirmeleri**
   - Bundle analizi yapın
   - Code splitting uygulayın
   - Lazy loading ekleyin

3. **Geliştirme süreçlerini güncelle**
   - CI/CD pipeline'ları
   - Test stratejileri
   - Code review süreçleri

---

**Migration tamamlandı!** 🎉

Yeni optimize edilmiş yapı ile daha verimli geliştirme yapabilirsiniz. 