# 📱 YKS Quiz Mobil Uygulama Geliştirme Rehberi

## 🎯 Genel Bakış

Bu rehber, YKS Quiz web uygulamasını mobil uygulama haline getirme sürecini detaylandırır. Capacitor kullanarak hem Android hem iOS platformları için native uygulamalar oluşturacağız.

## 📋 İçindekiler

1. [Teknoloji Seçimi](#teknoloji-seçimi)
2. [Capacitor Kurulumu](#capacitor-kurulumu)
3. [Android Geliştirme](#android-geliştirme)
4. [iOS Geliştirme](#ios-geliştirme)
5. [Firebase Entegrasyonu](#firebase-entegrasyonu)
6. [Push Notification](#push-notification)
7. [App Store Hazırlığı](#app-store-hazırlığı)
8. [Google Play Store Hazırlığı](#google-play-store-hazırlığı)
9. [Test ve Deployment](#test-ve-deployment)
10. [Sık Sorulan Sorular](#sık-sorulan-sorular)

---

## 🏆 Teknoloji Seçimi

### Neden Capacitor?

**✅ Avantajları:**
- Mevcut React kodunu değiştirmeye gerek yok
- Hızlı geçiş (1-2 saat)
- Native performans
- Firebase entegrasyonu korunur
- PWA özellikleri çalışır
- Hem Android hem iOS desteği

**❌ Diğer Seçenekler:**
- **React Native**: Kodun yeniden yazılması gerekir (3-6 ay)
- **PWA + TWA**: Sadece Android, iOS yok
- **Cordova**: Eski teknoloji, performans sorunları

---

## ⚡ Capacitor Kurulumu

### Gereksinimler

- Node.js 16+ 
- npm 8+
- Android Studio (Android için)
- Xcode (iOS için, sadece Mac)
- Java JDK 11+

### Adım 1: Capacitor Paketlerini Yükleme

```bash
# Proje ana dizininde
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
```

### Adım 2: Capacitor'ı Başlatma

```bash
npx cap init YKSQuiz com.yksquiz.app --web-dir=build
```

**Parametreler:**
- `YKSQuiz`: Uygulama adı
- `com.yksquiz.app`: Bundle ID (unique identifier)
- `--web-dir=build`: Build klasörü

### Adım 3: Platform Ekleme

```bash
# Android platformu
npx cap add android

# iOS platformu (sadece Mac'te)
npx cap add ios
```

### Adım 4: İlk Build ve Sync

```bash
# Uygulamayı build et
npm run build

# Capacitor'a sync et
npx cap sync
```

---

## 🤖 Android Geliştirme

### Gereksinimler

- Android Studio
- Android SDK
- Java JDK 11+

### Kurulum

1. **Android Studio'yu indirin:** https://developer.android.com/studio
2. **Android SDK'yı kurun**
3. **Java JDK 11+ kurun**

### Android Studio'da Açma

```bash
npx cap open android
```

### Android Manifest Düzenlemeleri

`android/app/src/main/AndroidManifest.xml` dosyasını düzenleyin:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
        
        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name="com.yksquiz.app.MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
    </application>
    
    <!-- İnternet izni -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- Push notification izinleri -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.VIBRATE" />
</manifest>
```

### App Icon Oluşturma

1. **Android Studio'da:**
   - `android/app/src/main/res/` klasörüne gidin
   - `mipmap-hdpi`, `mipmap-mdpi`, `mipmap-xhdpi`, `mipmap-xxhdpi`, `mipmap-xxxhdpi` klasörlerine
   - `ic_launcher.png` dosyalarını yerleştirin

2. **Icon boyutları:**
   - hdpi: 72x72
   - mdpi: 48x48
   - xhdpi: 96x96
   - xxhdpi: 144x144
   - xxxhdpi: 192x192

### APK Oluşturma

```bash
# Debug APK
npx cap build android

# Release APK (Android Studio'da)
# Build > Generate Signed Bundle / APK
```

---

## 🍎 iOS Geliştirme

### Gereksinimler

- Mac bilgisayar
- Xcode 13+
- iOS 13+ hedefi
- Apple Developer hesabı ($99/yıl)

### Kurulum

1. **Xcode'u App Store'dan indirin**
2. **iOS Simulator'ı kurun**
3. **Apple Developer hesabı oluşturun**

### Xcode'da Açma

```bash
npx cap open ios
```

### iOS Konfigürasyonu

`ios/App/App/Info.plist` dosyasını düzenleyin:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>YKS Quiz</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
</dict>
</plist>
```

### App Icon Oluşturma

1. **Xcode'da:**
   - `ios/App/App/Assets.xcassets/AppIcon.appiconset/` klasörüne gidin
   - Gerekli boyutlarda icon dosyalarını yerleştirin

2. **Icon boyutları:**
   - iPhone: 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5
   - iPad: 20x20, 29x29, 40x40, 76x76, 83.5x83.5

---

## 🔥 Firebase Entegrasyonu

### Android Firebase Kurulumu

1. **Firebase Console'da proje oluşturun**
2. **Android uygulaması ekleyin:**
   - Package name: `com.yksquiz.app`
   - App nickname: `YKS Quiz Android`

3. **google-services.json dosyasını indirin**
4. **Dosyayı `android/app/` klasörüne yerleştirin**

5. **android/build.gradle dosyasına ekleyin:**
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

6. **android/app/build.gradle dosyasına ekleyin:**
```gradle
apply plugin: 'com.google.gms.google-services'
```

### iOS Firebase Kurulumu

1. **Firebase Console'da iOS uygulaması ekleyin:**
   - Bundle ID: `com.yksquiz.app`
   - App nickname: `YKS Quiz iOS`

2. **GoogleService-Info.plist dosyasını indirin**
3. **Dosyayı Xcode'da projeye ekleyin**

### Capacitor Firebase Plugin'leri

```bash
npm install @capacitor-community/firebase-analytics
npm install @capacitor-community/firebase-crashlytics
npm install @capacitor-community/firebase-messaging
```

### Firebase Konfigürasyonu

`src/services/firebase/config.ts` dosyasını güncelleyin:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Firebase console'dan alınan config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
```

---

## 🔔 Push Notification

### Capacitor Push Notification Kurulumu

```bash
npm install @capacitor/push-notifications
npx cap sync
```

### Android Push Notification

1. **Firebase Console'da Cloud Messaging'i etkinleştirin**
2. **Server key'i alın**

3. **Android Manifest'e izin ekleyin:**
```xml
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

### iOS Push Notification

1. **Apple Developer Console'da Push Notification sertifikası oluşturun**
2. **Firebase Console'a sertifikayı yükleyin**
3. **Xcode'da Push Notification capability'sini etkinleştirin**

### Push Notification Kodu

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// İzin iste
const requestPermissions = async () => {
  const result = await PushNotifications.requestPermissions();
  if (result.receive === 'granted') {
    await PushNotifications.register();
  }
};

// Token al
const getToken = async () => {
  const result = await PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success: ', token.value);
    // Token'ı Firebase'e kaydet
  });
};

// Bildirim al
const handleNotification = async () => {
  await PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push received: ', notification);
  });
};
```

---

## 🏪 App Store Hazırlığı

### Gereksinimler

- Apple Developer hesabı ($99/yıl)
- App Store Connect erişimi
- Uygulama metadata'sı
- Screenshot'lar
- App description

### App Store Connect'te Uygulama Oluşturma

1. **App Store Connect'e giriş yapın**
2. **"My Apps" > "+" > "New App"**
3. **Bilgileri doldurun:**
   - Platform: iOS
   - Name: YKS Quiz
   - Bundle ID: com.yksquiz.app
   - SKU: yksquiz-ios

### Screenshot Gereksinimleri

**iPhone:**
- 6.7" Display: 1290 x 2796
- 6.5" Display: 1242 x 2688
- 5.5" Display: 1242 x 2208

**iPad:**
- 12.9" Display: 2048 x 2732
- 11" Display: 1668 x 2388

### App Description Örneği

```
YKS Quiz - TYT ve AYT Hazırlık

Türkiye'nin en kapsamlı YKS hazırlık platformu!

📚 Özellikler:
• TYT ve AYT tüm dersler
• 10,000+ soru bankası
• Detaylı istatistikler
• Offline çalışma
• Kişiselleştirilmiş öğrenme
• Günlük hedefler
• Başarı takibi

🎯 Hedefler:
• YKS sınavına hazırlık
• Konu tekrarı
• Soru çözme pratiği
• Performans analizi

📱 Kullanım:
• Ücretsiz kayıt
• Hızlı quiz başlatma
• Sonuçları anında görme
• İlerleme takibi

YKS'ye hazırlanan herkes için tasarlandı!
```

### Privacy Policy

App Store için privacy policy gerekli. Örnek:

```
YKS Quiz Privacy Policy

Bu uygulama:
- Kişisel verilerinizi toplamaz
- Üçüncü taraflarla paylaşmaz
- Sadece eğitim amaçlı kullanılır
- Firebase Analytics kullanır (anonim)
```

---

## 🎮 Google Play Store Hazırlığı

### Gereksinimler

- Google Play Console hesabı ($25)
- APK/AAB dosyası
- Store listing
- Content rating
- Privacy policy

### Google Play Console'da Uygulama Oluşturma

1. **Google Play Console'a giriş yapın**
2. **"Create app" > "Create new app"**
3. **Bilgileri doldurun:**
   - App name: YKS Quiz
   - Default language: Turkish
   - App or game: App
   - Free or paid: Free

### Screenshot Gereksinimleri

**Android:**
- Phone: 16:9 or 9:16 ratio
- 7-inch tablet: 16:9 or 9:16 ratio
- 10-inch tablet: 16:9 or 9:16 ratio

**Boyutlar:**
- Minimum: 320px width
- Maximum: 3840px width

### Content Rating

1. **Content rating questionnaire'ı doldurun**
2. **Eğitim kategorisi seçin**
3. **Yaş grubu: 3+**

### App Bundle (AAB) Oluşturma

```bash
# Android Studio'da:
# Build > Generate Signed Bundle / APK
# Android App Bundle seçin
# Keystore oluşturun
# Release build yapın
```

### Store Listing

**Short description:**
```
YKS sınavlarına hazırlık için interaktif quiz platformu
```

**Full description:**
```
YKS Quiz - TYT ve AYT Hazırlık

Türkiye'nin en kapsamlı YKS hazırlık platformu!

📚 Özellikler:
• TYT ve AYT tüm dersler
• 10,000+ soru bankası
• Detaylı istatistikler
• Offline çalışma
• Kişiselleştirilmiş öğrenme
• Günlük hedefler
• Başarı takibi

🎯 Hedefler:
• YKS sınavına hazırlık
• Konu tekrarı
• Soru çözme pratiği
• Performans analizi

📱 Kullanım:
• Ücretsiz kayıt
• Hızlı quiz başlatma
• Sonuçları anında görme
• İlerleme takibi

YKS'ye hazırlanan herkes için tasarlandı!
```

---

## 🧪 Test ve Deployment

### Test Süreci

1. **Development Testing:**
   ```bash
   # Android emulator'da test
   npx cap run android
   
   # iOS simulator'da test
   npx cap run ios
   ```

2. **Device Testing:**
   - Fiziksel cihazlarda test
   - Farklı ekran boyutları
   - Farklı Android/iOS versiyonları

3. **Beta Testing:**
   - Google Play Console: Internal testing
   - App Store Connect: TestFlight

### Deployment Checklist

**Android:**
- [ ] APK/AAB oluşturuldu
- [ ] App signing key oluşturuldu
- [ ] Store listing hazırlandı
- [ ] Screenshot'lar eklendi
- [ ] Privacy policy eklendi
- [ ] Content rating tamamlandı
- [ ] App bundle yüklendi

**iOS:**
- [ ] Xcode build tamamlandı
- [ ] App Store Connect'te uygulama oluşturuldu
- [ ] Screenshot'lar eklendi
- [ ] App description yazıldı
- [ ] Privacy policy eklendi
- [ ] TestFlight ile test edildi
- [ ] App review için gönderildi

### CI/CD Pipeline

```yaml
# .github/workflows/mobile-build.yml
name: Mobile Build

on:
  push:
    branches: [main]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - run: npx cap sync
      - run: npx cap build android
```

---

## ❓ Sık Sorulan Sorular

### Q: Capacitor ile performans nasıl?
A: Native performansa yakın. WebView tabanlı ama optimize edilmiş.

### Q: Firebase çalışır mı?
A: Evet, tamamen uyumlu. Hiçbir değişiklik gerekmez.

### Q: Offline çalışır mı?
A: Evet, PWA özellikleriniz korunur.

### Q: Push notification çalışır mı?
A: Evet, Capacitor plugin'leri ile tam destek.

### Q: App Store onayı alır mı?
A: Evet, native uygulama olarak kabul edilir.

### Q: Güncelleme nasıl yapılır?
A: Web uygulamasını güncelleyip, mobil uygulamayı yeniden build edin.

---

## 📞 Destek

### Faydalı Linkler

- [Capacitor Dokümantasyonu](https://capacitorjs.com/docs)
- [Firebase Dokümantasyonu](https://firebase.google.com/docs)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)

### İletişim

- GitHub Issues: Proje repository'sinde
- Email: [your-email@domain.com]
- Discord: [your-discord-server]

---

## 📝 Notlar

- Bu rehber sürekli güncellenir
- Yeni özellikler eklendikçe rehber güncellenir
- Sorun yaşarsanız GitHub Issues'da bildirin
- Başarı hikayelerinizi paylaşın!

---

**Son Güncelleme:** $(date)
**Versiyon:** 1.0
**Yazar:** YKS Quiz Team 

## 🎉 Başarılı İlerleme!

Capacitor kurulumu başarıyla tamamlandı! İşte şu ana kadar yaptıklarımız:

### ✅ **Tamamlanan Adımlar:**
1. **Capacitor paketleri yüklendi** - `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`
2. **Capacitor başlatıldı** - `capacitor.config.ts` oluşturuldu
3. **Android platformu eklendi** - `android/` klasörü oluşturuldu
4. **Uygulama build edildi** - Production build hazır
5. **Capacitor sync yapıldı** - Web dosyaları Android'e kopyalandı
6. **Android Manifest düzenlendi** - İzinler ve konfigürasyon eklendi

### 📱 **Sonraki Adımlar:**

#### 1. **Android Studio Kurulumu**
```bash
# Android Studio'yu indirin:
# https://developer.android.com/studio
```

#### 2. **Android Studio'da Projeyi Açma**
```bash
# Android Studio kurulduktan sonra:
npx cap open android
```

#### 3. **APK Oluşturma**
Android Studio'da:
- `Build` > `Generate Signed Bundle / APK`
- `APK` seçin
- Keystore oluşturun
- Release build yapın

### 🔥 **Firebase Entegrasyonu**
Mevcut Firebase entegrasyonunuz otomatik olarak çalışacak! Hiçbir değişiklik gerekmez.

### 📱 **Şu Anda Hazır Olan:**
- ✅ Android projesi
- ✅ Temel konfigürasyon
- ✅ İzinler
- ✅ Build sistemi
- ✅ Capacitor entegrasyonu

### 🚀 **Hemen Test Edebilirsiniz:**
Android Studio kurduktan sonra:
```bash
npx cap open android
# Android Studio'da "Run" butonuna basın
```

Android Studio kurulumu tamamlandığında devam edelim! Kurulum sırasında herhangi bir sorun yaşarsanız söyleyin. 🎯 