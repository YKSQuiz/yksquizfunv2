# 🚀 YKS Quiz Deployment Rehberi

Bu rehber, YKS Quiz uygulamanızı GitHub Actions ile VPS'e otomatik deployment yapmanızı sağlar.

## 📋 Gereksinimler

- GitHub repository
- Hostinger VPS (veya başka bir VPS)
- SSH erişimi
- Nginx web sunucusu

## 🔧 VPS Kurulumu

### 1. VPS'e SSH ile bağlanın
```bash
ssh username@your-vps-ip
```

### 2. Gerekli paketleri yükleyin
```bash
sudo apt update
sudo apt install nginx git curl -y
```

### 3. Setup script'ini çalıştırın
```bash
# Script'i VPS'e kopyalayın veya manuel olarak oluşturun
chmod +x scripts/setup-vps.sh
./scripts/setup-vps.sh
```

## 🔑 GitHub Secrets Ayarları

GitHub repository'nizde şu secrets'ları ayarlayın:

1. **GitHub Repository Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** ile şu değerleri ekleyin:

### Gerekli Secrets:
- `VPS_HOST`: VPS IP adresiniz
- `VPS_USERNAME`: VPS kullanıcı adınız
- `VPS_SSH_KEY`: SSH private key'iniz
- `VPS_PORT`: SSH port (genellikle 22)

### SSH Key Oluşturma:
```bash
# Yerel bilgisayarınızda SSH key oluşturun
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Public key'i VPS'e kopyalayın
ssh-copy-id username@your-vps-ip

# Private key'i GitHub secrets'a ekleyin
cat ~/.ssh/id_rsa
```

## 🚀 Deployment Süreci

### 1. İlk Deployment
```bash
# Yerel değişiklikleri commit edin
git add .
git commit -m "Initial deployment setup"
git push origin main
```

### 2. GitHub Actions Kontrolü
- GitHub repository'nizde **Actions** sekmesine gidin
- Workflow'un çalıştığını kontrol edin
- Log'ları inceleyerek hataları tespit edin

### 3. Domain Ayarları
- DNS ayarlarınızda A record ekleyin:
  - `www.yksquiz.fun` → VPS IP adresiniz
  - `yksquiz.fun` → VPS IP adresiniz

## 🔒 SSL Sertifikası (Opsiyonel)

Let's Encrypt ile ücretsiz SSL sertifikası:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.yksquiz.fun -d yksquiz.fun
```

## 📊 Monitoring ve Logs

### Nginx Logs:
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Deployment Logs:
```bash
# Son deployment'ı kontrol et
ls -la /var/www/yksquiz.fun/public_backup_*
```

## 🔄 Otomatik Deployment

Artık her `git push` işleminde:
1. GitHub Actions otomatik olarak tetiklenir
2. Uygulama build edilir
3. Build dosyaları VPS'e kopyalanır
4. Nginx yeniden başlatılır
5. Uygulama güncellenir

## 🛠️ Sorun Giderme

### Build Hatası:
- Node.js versiyonunu kontrol edin
- Dependencies'leri kontrol edin
- ESLint hatalarını düzeltin

### Deployment Hatası:
- SSH key'in doğru olduğunu kontrol edin
- VPS erişimini test edin
- Dizin izinlerini kontrol edin

### Nginx Hatası:
```bash
sudo nginx -t
sudo systemctl status nginx
```

## 📞 Destek

Sorun yaşarsanız:
1. GitHub Actions log'larını kontrol edin
2. VPS log'larını inceleyin
3. Network bağlantısını test edin

---

**🎉 Tebrikler!** Artık uygulamanız otomatik olarak deploy ediliyor. 