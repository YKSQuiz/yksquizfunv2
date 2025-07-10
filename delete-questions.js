const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteQuestions() {
  try {
    console.log('🔍 Soruları arıyorum...');
    
    // 'sozcukte-anlam' topicId'li soruları bul
    const questionsRef = db.collection('questions');
    const snapshot = await questionsRef.where('topicId', '==', 'sozcukte-anlam').get();
    
    if (snapshot.empty) {
      console.log('❌ Silinecek soru bulunamadı.');
      process.exit(0);
    }
    
    console.log(`📊 ${snapshot.size} soru bulundu. Siliniyor...`);
    
    // Batch delete için
    const batch = db.batch();
    
    snapshot.docs.forEach((doc) => {
      console.log('🗑️ Siliniyor:', doc.data().question.substring(0, 50) + '...');
      batch.delete(doc.ref);
    });
    
    // Batch'i commit et
    await batch.commit();
    
    console.log('✅ Tüm sorular başarıyla silindi!');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    process.exit(0);
  }
}

// Script'i çalıştır
deleteQuestions(); 