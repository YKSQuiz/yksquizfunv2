const fs = require('fs');
const path = require('path');

/**
 * Build klasöründeki bundle dosyalarını analiz eder
 */
function analyzeBundle() {
  const buildPath = path.join(__dirname, '../../build');
  const staticPath = path.join(buildPath, 'static');
  
  if (!fs.existsSync(buildPath)) {
    console.error('❌ Build klasörü bulunamadı. Önce "npm run build" çalıştırın.');
    process.exit(1);
  }

  console.log('📊 Bundle Analizi Başlıyor...\n');

  // JS dosyalarını analiz et
  const jsPath = path.join(staticPath, 'js');
  if (fs.existsSync(jsPath)) {
    const jsFiles = fs.readdirSync(jsPath).filter(file => file.endsWith('.js'));
    
    console.log('📦 JavaScript Dosyaları:');
    jsFiles.forEach(file => {
      const filePath = path.join(jsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`  ${file}: ${sizeKB} KB (${sizeMB} MB)`);
    });
  }

  // CSS dosyalarını analiz et
  const cssPath = path.join(staticPath, 'css');
  if (fs.existsSync(cssPath)) {
    const cssFiles = fs.readdirSync(cssPath).filter(file => file.endsWith('.css'));
    
    console.log('\n🎨 CSS Dosyaları:');
    cssFiles.forEach(file => {
      const filePath = path.join(cssPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      console.log(`  ${file}: ${sizeKB} KB`);
    });
  }

  // Toplam build boyutunu hesapla
  const totalSize = calculateDirectorySize(buildPath);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log(`\n📈 Toplam Build Boyutu: ${totalSizeMB} MB`);
  
  // Performans önerileri
  console.log('\n💡 Performans Önerileri:');
  console.log('  • Bundle boyutu 2MB altında olmalı');
  console.log('  • CSS dosyaları 500KB altında olmalı');
  console.log('  • Gzip sıkıştırma kullanın');
  console.log('  • CDN kullanmayı düşünün');
}

/**
 * Klasör boyutunu hesaplar
 */
function calculateDirectorySize(dirPath) {
  let totalSize = 0;
  
  if (fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += calculateDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  }
  
  return totalSize;
}

// Script'i çalıştır
if (require.main === module) {
  try {
    analyzeBundle();
  } catch (error) {
    console.error('❌ Bundle analizi sırasında hata:', error.message);
    process.exit(1);
  }
}

module.exports = { analyzeBundle }; 