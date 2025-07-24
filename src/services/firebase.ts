// Firebase servisleri - Ana export dosyası
// Not: Bu dosya firebase/ klasöründeki servislerle tekrar ediyor
// Gelecekte firebase/ klasöründeki servisler kullanılacak

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Kullanıcı servisleri - firebase/user.ts'den import edilecek
export { updateSessionTime, updateUserEnergy } from './firebase/user';

export default app; 