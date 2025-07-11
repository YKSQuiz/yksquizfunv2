#!/bin/bash

# YKS Quiz VPS Setup Script
# Bu script VPS'de gerekli dizin yapısını ve Nginx konfigürasyonunu oluşturur

echo "🚀 YKS Quiz VPS Setup başlatılıyor..."

# Web dizinini oluştur
sudo mkdir -p /var/www/yksquiz.fun
sudo mkdir -p /var/www/yksquiz.fun/public

# Dizin izinlerini ayarla
sudo chown -R $USER:$USER /var/www/yksquiz.fun
sudo chmod -R 755 /var/www/yksquiz.fun

# Nginx konfigürasyonu oluştur
sudo tee /etc/nginx/sites-available/yksquiz.fun << EOF
server {
    listen 80;
    server_name www.yksquiz.fun yksquiz.fun;
    
    root /var/www/yksquiz.fun/public;
    index index.html;
    
    # Gzip sıkıştırma
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache ayarları
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # React Router için SPA konfigürasyonu
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Nginx site'ını etkinleştir
sudo ln -sf /etc/nginx/sites-available/yksquiz.fun /etc/nginx/sites-enabled/

# Nginx konfigürasyonunu test et
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx konfigürasyonu başarılı"
    
    # Nginx'i yeniden başlat
    sudo systemctl reload nginx
    echo "✅ Nginx yeniden başlatıldı"
else
    echo "❌ Nginx konfigürasyonu hatası!"
    exit 1
fi

# SSL sertifikası için Certbot kurulumu (opsiyonel)
echo "🔒 SSL sertifikası kurulumu için:"
echo "sudo apt install certbot python3-certbot-nginx"
echo "sudo certbot --nginx -d www.yksquiz.fun -d yksquiz.fun"

echo "🎉 VPS setup tamamlandı!"
echo "📁 Web dizini: /var/www/yksquiz.fun/public"
echo "🌐 Domain: www.yksquiz.fun" 