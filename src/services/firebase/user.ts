import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

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