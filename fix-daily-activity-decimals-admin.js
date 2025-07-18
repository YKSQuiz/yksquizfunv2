const admin = require('firebase-admin');
const path = require('path');

// Service account key dosyasını yükle
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixDailyActivityDecimals() {
  try {
    console.log('Firestore\'dan kullanıcıları çekiliyor...');
    const usersSnapshot = await db.collection('users').get();
    
    let updatedCount = 0;
    let totalUsers = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      totalUsers++;
      
      // stats ve dailyActivity kontrol et
      if (userData.stats && userData.stats.dailyActivity) {
        const dailyActivity = userData.stats.dailyActivity;
        let needsUpdate = false;
        const updatedDailyActivity = {};
        
        // Her gün için timeSpent'i kontrol et ve düzelt
        for (const [date, dayData] of Object.entries(dailyActivity)) {
          if (dayData && typeof dayData.timeSpent === 'number') {
            const originalTimeSpent = dayData.timeSpent;
            const roundedTimeSpent = Math.round(originalTimeSpent * 100) / 100;
            
            if (originalTimeSpent !== roundedTimeSpent) {
              console.log(`Kullanıcı ${userDoc.id}, ${date}: ${originalTimeSpent} → ${roundedTimeSpent}`);
              needsUpdate = true;
            }
            
            updatedDailyActivity[date] = {
              ...dayData,
              timeSpent: roundedTimeSpent
            };
          } else {
            updatedDailyActivity[date] = dayData;
          }
        }
        
        // Eğer değişiklik varsa güncelle
        if (needsUpdate) {
          await userDoc.ref.update({
            'stats.dailyActivity': updatedDailyActivity
          });
          updatedCount++;
          console.log(`✅ Kullanıcı ${userDoc.id} güncellendi`);
        }
      }
    }
    
    console.log(`\n🎉 İşlem tamamlandı!`);
    console.log(`📊 Toplam kullanıcı: ${totalUsers}`);
    console.log(`✅ Güncellenen kullanıcı: ${updatedCount}`);
    console.log(`⏭️  Değişiklik olmayan kullanıcı: ${totalUsers - updatedCount}`);
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    process.exit(0);
  }
}

// Scripti çalıştır
fixDailyActivityDecimals(); 