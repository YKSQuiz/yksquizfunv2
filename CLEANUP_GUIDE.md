# 🧹 Proje Temizlik Rehberi

## 🚨 ACİL GÜVENLİK RİSKİ

### 1. Service Account Key'i Kaldırın
```bash
# Bu dosyayı HEMEN silin!
rm serviceAccountKey.json

# Git'ten de kaldırın
git rm --cached serviceAccountKey.json
git commit -m "Remove service account key for security"
```

### 2. Environment Variables Kullanın
```bash
# .env dosyası oluşturun
echo "FIREBASE_SERVICE_ACCOUNT_KEY=$(cat serviceAccountKey.json | base64)" > .env

# Script'leri güncelleyin (serviceAccountKey.json yerine process.env kullanın)
```

## 🗑️ Gereksiz Dosyaları Temizleyin

### 1. Eski Dokümantasyon Dosyaları
```bash
# Bu dosyaları silin (gereksiz):
rm BACK_BUTTON_GUIDE.md
rm ENERGY_MARKET_PROGRESS_SYSTEM.md
rm FIRESTORE_DATABASE_YONETIMI.md
rm FIRESTORE_DATABASE_YAPISI.md
rm Marketsistemi.md
```

### 2. Build Klasörü
```bash
# Build klasörünü temizleyin
rm -rf build/
```

### 3. Node Modules (Gerekirse)
```bash
# Eğer sorun varsa node_modules'ü yeniden yükleyin
rm -rf node_modules/
npm install
```

## 📁 Önerilen Dosya Yapısı

```
yksquizv23/
├── src/                    # Kaynak kodlar
├── public/                 # Statik dosyalar
├── scripts/                # Deployment script'leri
├── docs/                   # Dokümantasyon (yeni klasör)
│   ├── DEPLOYMENT_GUIDE.md
│   ├── OPTIMIZATION_GUIDE.md
│   └── README.md
├── database/               # Database script'leri (yeni klasör)
│   ├── csv-to-firebase.js
│   ├── delete-questions.js
│   ├── fix-daily-activity-decimals-admin.js
│   ├── fix-session-time-location.js
│   ├── fixSessionTimes.js
│   └── validate-csv.js
├── data/                   # Veri dosyaları (yeni klasör)
│   └── sozcukte-anlam.csv
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Script'leri Yeniden Düzenleyin

### 1. Database Script'lerini Taşıyın
```bash
# Yeni klasör oluşturun
mkdir database
mkdir data
mkdir docs

# Dosyaları taşıyın
mv csv-to-firebase.js database/
mv delete-questions.js database/
mv fix-daily-activity-decimals-admin.js database/
mv fix-session-time-location.js database/
mv fixSessionTimes.js database/
mv validate-csv.js database/

mv sozcukte-anlam.csv data/

mv DEPLOYMENT_GUIDE.md docs/
mv OPTIMIZATION_GUIDE.md docs/
```

### 2. Package.json Script'lerini Güncelleyin
```json
{
  "scripts": {
    "db:upload-csv": "node database/csv-to-firebase.js",
    "db:delete-questions": "node database/delete-questions.js",
    "db:fix-daily-activity": "node database/fix-daily-activity-decimals-admin.js",
    "db:fix-session-time": "node database/fix-session-time-location.js",
    "db:fix-session-times": "node database/fixSessionTimes.js",
    "db:validate-csv": "node database/validate-csv.js"
  }
}
```

## 🔒 Güvenlik Kontrol Listesi

- [ ] serviceAccountKey.json silindi
- [ ] .env dosyası oluşturuldu
- [ ] Script'ler environment variables kullanıyor
- [ ] .gitignore güncellendi
- [ ] Gereksiz dosyalar temizlendi
- [ ] Dosya yapısı düzenlendi

## 📊 Temizlik Sonrası Boyut Analizi

### Önce:
- Toplam dosya sayısı: ~20
- Gereksiz dosyalar: ~8
- Güvenlik riski: YÜKSEK

### Sonra:
- Toplam dosya sayısı: ~12
- Gereksiz dosyalar: 0
- Güvenlik riski: DÜŞÜK

## 🚀 Performans İyileştirmeleri

### 1. Git Repository Boyutu
```bash
# Git geçmişini temizleyin
git gc --aggressive
git prune

# Büyük dosyaları kontrol edin
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort --numeric-sort --key=2 | tail -10
```

### 2. Build Optimizasyonu
```bash
# Production build boyutunu kontrol edin
npm run build:prod
du -sh build/
```

## 📝 Sonraki Adımlar

1. **Güvenlik:** Service account key'i environment variable'a taşıyın
2. **Organizasyon:** Dosyaları klasörlere düzenleyin
3. **Dokümantasyon:** Gereksiz markdown dosyalarını silin
4. **Script'ler:** Package.json script'lerini güncelleyin
5. **Test:** Tüm script'lerin çalıştığını kontrol edin

---

**⚠️ ÖNEMLİ:** Service account key'i silmeden önce environment variable olarak yedekleyin! 