const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDd6PxsqNMZGDMvOhS4lqeE4AOGDPP1BIQ",
  authDomain: "yksquizv2.firebaseapp.com",
  projectId: "yksquizv2",
  storageBucket: "yksquizv2.appspot.com",
  messagingSenderId: "548189983946",
  appId: "1:548189983946:web:0eb16d28bac9a54c1d1033",
  measurementId: "G-535Z417R09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixSessionTimeLocation() {
  try {
    console.log('🔄 Session Time verilerini düzeltme başlatılıyor...');
    
    const usersRef = collection(db, 'users');
    const usersSnap = await getDocs(usersRef);
    
    console.log(`📊 Toplam ${usersSnap.size} kullanıcı bulundu.`);
    
    for (const userDoc of usersSnap.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;
      
      console.log(`\n👤 Kullanıcı işleniyor: ${userId}`);
      
      // Mevcut veri durumunu kontrol et
      const currentRootSessionTime = userData.totalSessionTime || 0;
      const currentStatsSessionTime = userData.stats?.totalSessionTime || 0;
      
      console.log(`  📊 Root level totalSessionTime: ${currentRootSessionTime}`);
      console.log(`  📊 Stats level totalSessionTime: ${currentStatsSessionTime}`);
      
      // Doğru değeri belirle
      let correctSessionTime = 0;
      
      if (currentRootSessionTime > 0) {
        // Root level'da değer varsa onu kullan
        correctSessionTime = currentRootSessionTime;
        console.log(`  ✅ Root level değeri kullanılıyor: ${correctSessionTime}`);
      } else if (currentStatsSessionTime > 0) {
        // Stats level'da değer varsa onu root'a taşı
        correctSessionTime = currentStatsSessionTime;
        console.log(`  🔄 Stats level değeri root'a taşınıyor: ${correctSessionTime}`);
      } else {
        // Her ikisi de yoksa quiz history'den hesapla
        if (userData.stats?.quizHistory && Array.isArray(userData.stats.quizHistory)) {
          const quizSeconds = userData.stats.quizHistory.reduce((acc, q) => acc + (q.duration || 0), 0);
          correctSessionTime = Math.floor(quizSeconds / 60); // Saniyeyi dakikaya çevir
          console.log(`  🧮 Quiz history'den hesaplandı: ${quizSeconds} saniye = ${correctSessionTime} dakika`);
        } else {
          console.log(`  ⚠️ Hiç veri yok, 0 olarak ayarlanıyor`);
        }
      }
      
      // Firebase'i güncelle
      const updates = {
        totalSessionTime: correctSessionTime
      };
      
      await updateDoc(doc(db, 'users', userId), updates);
      console.log(`  ✅ Güncellendi: totalSessionTime = ${correctSessionTime} dk`);
    }
    
    console.log('\n🎉 Tüm kullanıcılar için session time düzeltmeleri tamamlandı!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
    process.exit(1);
  }
}

// Script'i çalıştır
fixSessionTimeLocation(); 