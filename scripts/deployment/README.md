# Deployment Scripts

Bu klasör deployment işlemleri için kullanılan script'leri içerir.

## Script'ler

### deploy.sh
Tam deployment işlemi yapar. Build, test ve deploy adımlarını içerir.
```bash
bash scripts/deployment/deploy.sh
```

### quick-deploy.sh
Hızlı deployment işlemi yapar. Sadece build ve deploy adımlarını içerir.
```bash
bash scripts/deployment/quick-deploy.sh
```

### setup-vps.sh
VPS sunucusunu kurulum için hazırlar.
```bash
bash scripts/deployment/setup-vps.sh
```

## Kullanım Notları

- Script'leri çalıştırmadan önce gerekli environment variable'ların ayarlandığından emin olun
- Production deployment öncesi test ortamında deneyin
- Deployment sonrası health check yapın 