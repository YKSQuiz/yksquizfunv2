# YKS Quiz Mobil APK Kısa Rehberi

## 1. Değişiklikleri GitHub'a Yükleme

```bash
git add .
git commit -m "Güncellemeler"
git push origin main
```

---

## 2. VPS Sunucusunda Kodu Güncelleme

```bash
ssh root@168.231.109.12
cd /var/www/yksquiz.fun
git pull
npm install
npm run build
sudo cp -r build/* /var/www/yksquiz.fun/public/
sudo chown -R www-data:www-data /var/www/yksquiz.fun/public
sudo rm -rf /var/cache/nginx/*
sudo systemctl reload nginx
```

---

## 3. VPS'de Mobil APK Oluşturma

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap sync
cd android
./gradlew assembleDebug
```

---

## 4. APK Dosyasını Bilgisayara İndirme

### Yöntem 1: SCP ile (PowerShell'de)
```powershell
scp root@168.231.109.12:/var/www/yksquiz.fun/android/app/build/outputs/apk/debug/app-debug.apk C:\Users\omer\Desktop\
```

### Yöntem 2: HTTP ile (VPS'de)
```bash
cd /var/www/yksquiz.fun/android/app/build/outputs/apk/debug/
python3 -m http.server 8080
```
Tarayıcıda: `http://168.231.109.12:8080/app-debug.apk`

---

## 5. APK'yı Telefona Yükleme
- APK dosyasını telefona aktarın
- Bilinmeyen kaynaklardan yüklemeye izin verin
- APK'yı yükleyin ve uygulamayı test edin

---

**Not:**
- Tüm komutlar doğrudan kopyala-yapıştır yapılabilir
- Herhangi bir hata alırsanız, hata mesajını kaydedin 