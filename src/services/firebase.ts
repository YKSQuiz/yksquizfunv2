import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Kullanıcının oturum süresini (dakika cinsinden) Firestore'da toplar.
 * @param uid Kullanıcı ID'si
 * @param sessionDuration Oturum süresi (dakika)
 */
export async function updateSessionTime(uid: string, sessionDuration: number) {
  console.log('Firestore\'a yazılıyor:', uid, sessionDuration);
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const prevTime = userSnap.data().totalSessionTime || 0;
    await updateDoc(userRef, {
      totalSessionTime: prevTime + sessionDuration,
    });
  } else {
    await setDoc(userRef, {
      totalSessionTime: sessionDuration,
    }, { merge: true });
  }
}

/**
 * Kullanıcının enerjisini ve son enerji güncelleme zamanını Firestore'da günceller.
 * @param uid Kullanıcı ID'si
 * @param newEnergy Yeni enerji miktarı (0-100)
 * @param lastUpdate Son güncelleme zamanı (ISO string)
 */
export async function updateUserEnergy(uid: string, newEnergy: number, lastUpdate: string) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    energy: newEnergy,
    lastEnergyUpdate: lastUpdate,
  });
}

export default app; 