const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split('$');
  const questions = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    // CSV satırını parse et (tırnak içindeki $ işaretlerini dikkate alarak)
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === '$' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Son değeri ekle
    
    if (values.length >= 9) {
      const question = {
        topicId: values[0],
        question: values[1],
        options: [values[2], values[3], values[4], values[5]],
        correctAnswer: parseInt(values[6]),
        testNumber: parseInt(values[7]),
        explanation: values[8]
      };
      questions.push(question);
    }
  }
  
  return questions;
}

async function uploadCSV(csvFilePath) {
  try {
    console.log(`CSV dosyası okunuyor: ${csvFilePath}`);
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const questions = parseCSV(csvContent);
    
    console.log(`${questions.length} soru bulundu. Firebase'e yükleniyor...`);
    
    for (const question of questions) {
      await db.collection('questions').add(question);
      console.log('Eklendi:', question.question.substring(0, 50) + '...');
    }
    
    console.log('✅ Tüm sorular başarıyla Firebase\'e yüklendi!');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    process.exit(0);
  }
}

// Kullanım: node csv-to-firebase.js dosyaadi.csv
const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('❌ CSV dosya yolu belirtmelisiniz!');
  console.log('Kullanım: node csv-to-firebase.js dosyaadi.csv');
  process.exit(1);
}

if (!fs.existsSync(csvFilePath)) {
  console.error(`❌ Dosya bulunamadı: ${csvFilePath}`);
  process.exit(1);
}

uploadCSV(csvFilePath); 