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

async function fixSessionTimes() {
  const usersRef = collection(db, 'users');
  const usersSnap = await getDocs(usersRef);
  for (const userDoc of usersSnap.docs) {
    const userData = userDoc.data();
    let quizSeconds = 0;
    if (userData.stats && Array.isArray(userData.stats.quizHistory)) {
      quizSeconds = userData.stats.quizHistory.reduce((acc, q) => acc + (q.duration || 0), 0);
    }
    let prevSession = 0;
    if (userData.stats && typeof userData.stats.totalSessionTime === 'number') {
      prevSession = userData.stats.totalSessionTime;
    }
    // Kümülatif olarak quiz süresi ve varsa eski session süresi toplanır
    const newSessionTime = Math.max(prevSession, quizSeconds);
    await updateDoc(doc(db, 'users', userDoc.id), {
      'stats.totalSessionTime': newSessionTime
    });
    console.log(`Kullanıcı ${userDoc.id} için toplam oturum süresi güncellendi: ${newSessionTime} sn`);
  }
  console.log('Tüm kullanıcılar için toplam oturum süresi güncellendi!');
}

fixSessionTimes(); 