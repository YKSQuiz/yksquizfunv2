# YKS Quiz VPS Deployment Rehberi

Bu rehber, YKS Quiz uygulamanızı Hostinger VPS'inize yükleyip domain'inize bağlayarak yayınlamak için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

### 1. Hostinger VPS Erişimi
- SSH erişimi olan bir Hostinger VPS
- Root veya sudo yetkileri
- En az 1GB RAM ve 20GB disk alanı

### 2. Domain Ayarları
- `yksquiz.fun` domain'inizin Hostinger'de aktif olması
- DNS kayıtlarının VPS IP adresine yönlendirilmesi

## 🚀 Deployment Adımları

### Adım 1: VPS'e Bağlanın

```bash
ssh root@your-vps-ip
```

### Adım 2: Sistemi Güncelleyin

```bash
sudo apt update && sudo apt upgrade -y
```

### Adım 3: Deployment Script'ini Çalıştırın

```bash
# Script'i çalıştırılabilir yapın
chmod +x scripts/deploy.sh

# Deployment'ı başlatın
./scripts/deploy.sh
```

### Adım 4: SSL Sertifikası Kurun (Önerilen)

```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası alın
sudo certbot --nginx -d www.yksquiz.fun -d yksquiz.fun
```

## 🌐 Domain Ayarları

### Hostinger DNS Ayarları

Hostinger kontrol panelinizde aşağıdaki DNS kayıtlarını ekleyin:

| Tip | Ad | Değer | TTL |
|-----|----|-------|-----|
| A | @ | VPS_IP_ADRESI | 300 |
| A | www | VPS_IP_ADRESI | 300 |
| CNAME | * | @ | 300 |

### DNS Yayılması
DNS değişikliklerinin yayılması 24-48 saat sürebilir. Bu süre zarfında:
- `nslookup yksquiz.fun` komutu ile kontrol edebilirsiniz
- `dig yksquiz.fun` ile DNS kayıtlarını kontrol edebilirsiniz

## 🔧 Manuel Kurulum (Alternatif)

Eğer otomatik script çalışmazsa, manuel olarak şu adımları takip edin:

### 1. Gerekli Paketleri Kurun

```bash
# Node.js kurulumu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Nginx kurulumu
sudo apt-get install -y nginx

# Git kurulumu
sudo apt-get install -y git
```

### 2. Uygulamayı Klonlayın

```bash
sudo mkdir -p /var/www/yksquiz.fun
sudo git clone https://github.com/YKSQuiz/yksquizfunv2.git /var/www/yksquiz.fun
sudo chown -R $USER:$USER /var/www/yksquiz.fun
```

### 3. Bağımlılıkları Kurun

```bash
cd /var/www/yksquiz.fun
npm ci --production=false
```

### 4. Uygulamayı Build Edin

```bash
npm run build
```

### 5. Nginx Konfigürasyonu

```bash
# Nginx konfigürasyonu oluşturun
sudo tee /etc/nginx/sites-available/yksquiz.fun << EOF
server {
    listen 80;
    server_name www.yksquiz.fun yksquiz.fun;
    
    root /var/www/yksquiz.fun/public;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Site'ı etkinleştirin
sudo ln -sf /etc/nginx/sites-available/yksquiz.fun /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx'i yeniden başlatın
sudo systemctl reload nginx
```

## 🔍 Sorun Giderme

### Uygulama Erişilemiyor
```bash
# Nginx durumunu kontrol edin
sudo systemctl status nginx

# Nginx loglarını kontrol edin
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Port 80'in açık olduğunu kontrol edin
sudo netstat -tlnp | grep :80
```

### Build Hatası
```bash
# Node.js versiyonunu kontrol edin
node --version

# npm cache'ini temizleyin
npm cache clean --force

# node_modules'ü silip yeniden kurun
rm -rf node_modules package-lock.json
npm install
```

### SSL Sertifikası Hatası
```bash
# Certbot durumunu kontrol edin
sudo certbot certificates

# SSL sertifikasını yenileyin
sudo certbot renew --dry-run
```

## 📊 Monitoring ve Bakım

### Log Takibi
```bash
# Nginx access logları
sudo tail -f /var/log/nginx/access.log

# Nginx error logları
sudo tail -f /var/log/nginx/error.log

# Sistem logları
sudo journalctl -u nginx -f
```

### Performans İzleme
```bash
# Disk kullanımı
df -h

# RAM kullanımı
free -h

# CPU kullanımı
htop
```

### Otomatik Güncelleme
```bash
# Cron job ekleyin (günlük güncelleme için)
sudo crontab -e

# Aşağıdaki satırı ekleyin:
0 2 * * * cd /var/www/yksquiz.fun && git pull && npm run build && sudo systemctl reload nginx
```

## 🔒 Güvenlik Önlemleri

### Firewall Ayarları
```bash
# UFW firewall kurun
sudo apt install ufw

# SSH, HTTP ve HTTPS portlarını açın
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Firewall'u etkinleştirin
sudo ufw enable
```

### Fail2ban Kurulumu
```bash
# Fail2ban kurun
sudo apt install fail2ban

# SSH koruması için
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 📞 Destek

Deployment sırasında sorun yaşarsanız:

1. **Logları kontrol edin**: Yukarıdaki log komutlarını kullanın
2. **Script'i tekrar çalıştırın**: `./scripts/deploy.sh`
3. **Manuel kurulumu deneyin**: Yukarıdaki manuel adımları takip edin
4. **Hostinger desteği**: VPS erişim sorunları için Hostinger desteğine başvurun

## 🎯 Başarı Kriterleri

Deployment başarılı olduğunda:
- ✅ `https://www.yksquiz.fun` erişilebilir olmalı
- ✅ SSL sertifikası aktif olmalı
- ✅ Tüm sayfalar düzgün yüklenmeli
- ✅ Firebase bağlantıları çalışmalı
- ✅ Mobil uyumluluk test edilmeli

---

**Not**: Bu rehber Hostinger VPS için optimize edilmiştir. Farklı bir VPS sağlayıcısı kullanıyorsanız, komutlar değişebilir. 