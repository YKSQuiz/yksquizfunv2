import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Kullanıcının oturum süresini Firestore'da toplar
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
 * Kullanıcının enerjisini ve son güncelleme zamanını Firestore'da günceller
 */
export async function updateUserEnergy(uid: string, newEnergy: number, lastUpdate: string) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    energy: newEnergy,
    lastEnergyUpdate: lastUpdate,
  });
} 