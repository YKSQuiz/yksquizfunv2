import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { auth, db, updateSessionTime } from '../services/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { Jokers, JokersUsed, User } from '../types';
import { getFirestore } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateUserStats: (correct: number, total: number, subjectId?: string, subjectName?: string, testNumber?: number, duration?: number) => void;
  clearUserStats: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
  refreshUser: () => Promise<void>;
  manualResetJokers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getUserProfile = async (firebaseUser: FirebaseUser): Promise<User> => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    let userData = userSnap.data() as User;
    let needsUpdate = false;
    if (!userData.jokers) {
      userData.jokers = {
        eliminate: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        extraTime: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        doubleAnswer: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        autoCorrect: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
      };
      needsUpdate = true;
    }
    if (!userData.jokersUsed) {
      userData.jokersUsed = {
        eliminate: 0,
        extraTime: 0,
        doubleAnswer: 0,
        autoCorrect: 0,
      };
      needsUpdate = true;
    }
    // Enerji alanları yoksa ekle
    if (typeof userData.energy !== 'number') {
      userData.energy = 100;
      needsUpdate = true;
    }
    if (!userData.lastEnergyUpdate) {
      userData.lastEnergyUpdate = new Date().toISOString();
      needsUpdate = true;
    }
    if (needsUpdate) {
      await updateDoc(userRef, {
        jokers: userData.jokers,
        jokersUsed: userData.jokersUsed,
        energy: userData.energy,
        lastEnergyUpdate: userData.lastEnergyUpdate,
      });
    }
    return userData;
  } else {
    // Yeni kullanıcı için Firestore'da profil oluştur
    const newUser: User = {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kullanıcı',
      email: firebaseUser.email || '',
      avatar: firebaseUser.displayName ? firebaseUser.displayName[0].toUpperCase() : (firebaseUser.email ? firebaseUser.email[0].toUpperCase() : 'K'),
      stats: {
        totalQuizzes: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        subjectStats: {},
        quizHistory: [],
        dailyActivity: {},
        level: 1,
        experience: 0,
        experienceToNext: 100,
        totalSessionTime: 0
      },
      jokers: {
        eliminate: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        extraTime: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        doubleAnswer: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        autoCorrect: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
      },
      jokersUsed: {
        eliminate: 0,
        extraTime: 0,
        doubleAnswer: 0,
        autoCorrect: 0,
      },
      energy: 100,
      lastEnergyUpdate: new Date().toISOString(),
    };
    await setDoc(userRef, newUser, { merge: true });
    return newUser;
  }
};

// Rütbe listesi
const RANKS = [
  { level: 1, name: "Soru Çömezi" },
  { level: 5, name: "Cevap Bilmecesi" },
  { level: 10, name: "Meraklı Beyin" },
  { level: 15, name: "Son Dakika Kahramanı" },
  { level: 20, name: "Şıkka Göz Kırpan" },
  { level: 25, name: "Tabloyla Kavgalı" },
  { level: 30, name: "Joker Sevdalısı" },
  { level: 35, name: "Kantin Filozofu" },
  { level: 40, name: "Ezber Bozan" },
  { level: 45, name: "Doğru Şık Dedektifi" },
  { level: 50, name: "Quiz Müptelası" },
  { level: 55, name: "Yanıt Ustası" },
  { level: 60, name: "Zihin Cambazı" },
  { level: 65, name: "Cevap Koleksiyoncusu" },
  { level: 70, name: "Sınav Samurayı" },
  { level: 75, name: "Zihin Hacker'ı" },
  { level: 80, name: "Soru Panteri" },
  { level: 85, name: "Zeka Juggleri" },
  { level: 90, name: "Quiz Rockstar'ı" },
  { level: 95, name: "Sonsuz Bilge" },
  { level: 100, name: "Quiz'in Efsanevi Patronu" }
];

// Seviye için gereken XP formülü
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(100 * Math.pow(1.5, i - 1));
  }
  return xp;
}

// Seviyeye göre rütbe bulma
export function getRankForLevel(level: number): string {
  let rank = RANKS[0].name;
  for (const r of RANKS) {
    if (level >= r.level) {
      rank = r.name;
    } else {
      break;
    }
  }
  return rank;
}

// Quiz sonunda XP, seviye ve rütbe güncelleme fonksiyonu
export async function updateXpLevelRank({
  user,
  correct,
  total,
  testNumber
}: {
  user: User,
  correct: number,
  total: number,
  testNumber: number
}): Promise<{
  newXp: number,
  newLevel: number,
  newRank: string,
  levelUp: boolean,
  newRankUnlocked: boolean,
  gainedXp: number,
  percent: number
}> {
  // XP hesaplama
  const percent = total > 0 ? (correct / total) * 100 : 0;
  let gainedXp = 0;
  if (percent === 100) {
    gainedXp = correct * 20 * 2;
  } else if (percent >= 70) {
    gainedXp = correct * 20;
  } else {
    gainedXp = Math.floor((correct * 20) / 2);
  }

  let newXp = (user.stats.experience || 0) + gainedXp;
  let newLevel = 1;
  let maxLevel = 100;
  for (let lvl = 1; lvl <= maxLevel; lvl++) {
    if (newXp < getXpForLevel(lvl + 1)) {
      newLevel = lvl;
      break;
    }
  }
  if (newLevel > maxLevel) newLevel = maxLevel;
  const newRank = getRankForLevel(newLevel);
  const prevLevel = user.stats.level || 1;
  const prevRank = getRankForLevel(prevLevel);
  const levelUp = newLevel > prevLevel;
  const newRankUnlocked = newRank !== prevRank;

  // Firestore güncellemesi
  const userRef = doc(db, 'users', user.id);
  await updateDoc(userRef, {
    'stats.experience': newXp,
    'stats.level': newLevel,
    'stats.experienceToNext': getXpForLevel(newLevel + 1) - newXp,
    'stats.rank': newRank
  });

  return {
    newXp,
    newLevel,
    newRank,
    levelUp,
    newRankUnlocked,
    gainedXp,
    percent
  };
}

// Jokerleri sıfırlayan fonksiyon
export async function resetDailyJokers(userId: string, userJokers: Jokers) {
  const today = new Date().toISOString().slice(0, 10);
  let needsReset = false;
  const newJokers: Jokers = { ...userJokers };
  Object.keys(newJokers).forEach((key) => {
    if (newJokers[key as keyof Jokers].lastReset !== today) {
      newJokers[key as keyof Jokers] = { count: 3, lastReset: today };
      needsReset = true;
    }
  });
  if (needsReset) {
    const db = getFirestore();
    await updateDoc(doc(db, 'users', userId), { jokers: newJokers });
  }
  return newJokers;
}

// Joker kullanan fonksiyon
export async function jokerKullan(
  userId: string,
  userJokers: Jokers,
  userJokersUsed: JokersUsed,
  type: keyof Jokers
) {
  if (userJokers[type].count <= 0) throw new Error('Joker hakkı yok!');
  const today = new Date().toISOString().slice(0, 10);
  const newJokers = {
    ...userJokers,
    [type]: {
      count: userJokers[type].count - 1,
      lastReset: today,
    },
  };
  const newJokersUsed = {
    ...userJokersUsed,
    [type]: (userJokersUsed[type] || 0) + 1,
  };
  const db = getFirestore();
  await updateDoc(doc(db, 'users', userId), {
    jokers: newJokers,
    jokersUsed: newJokersUsed,
  });
  return { newJokers, newJokersUsed };
}

// Manuel joker yenileme fonksiyonu
export async function manualResetJokers(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  const newJokers: Jokers = {
    eliminate: { count: 3, lastReset: today },
    extraTime: { count: 3, lastReset: today },
    doubleAnswer: { count: 3, lastReset: today },
    autoCorrect: { count: 3, lastReset: today },
  };
  
  const db = getFirestore();
  await updateDoc(doc(db, 'users', userId), { jokers: newJokers });
  console.log('Manuel joker yenileme tamamlandı:', newJokers);
  return newJokers;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionStartRef = React.useRef<number | null>(null);
  const sessionAccumulatedRef = React.useRef<number>(0); // Henüz kaydedilmemiş süre (ms)
  const sessionIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Oturum süresi takibi (periyodik kayıt)
  useEffect(() => {
    if (user) {
      sessionStartRef.current = Date.now();
      sessionAccumulatedRef.current = 0;

      // Her 1 dakikada bir Firestore'a yaz
      sessionIntervalRef.current = setInterval(async () => {
        if (sessionStartRef.current) {
          const now = Date.now();
          const elapsed = now - sessionStartRef.current + sessionAccumulatedRef.current;
          const minutes = Math.floor(elapsed / 60000);
          if (minutes > 0) {
            try {
              await updateSessionTime(user.id, minutes);
            } catch (e) {
              console.error('Periyodik oturum süresi Firestore\'a yazılamadı:', e);
            }
            // Kalan ms'yi bir sonraki tura aktar
            const leftover = elapsed % 60000;
            sessionStartRef.current = now - leftover;
            sessionAccumulatedRef.current = 0;
          } else {
            // Henüz 1 dakika dolmadıysa, biriktir
            sessionAccumulatedRef.current = elapsed;
          }
        }
      }, 60000);

      const handleSessionEnd = async () => {
        if (sessionStartRef.current) {
          const now = Date.now();
          const elapsed = now - sessionStartRef.current + sessionAccumulatedRef.current;
          const minutes = Math.floor(elapsed / 60000);
          if (minutes > 0) {
            try {
              await updateSessionTime(user.id, minutes);
            } catch (e) {
              console.error('Çıkışta oturum süresi Firestore\'a yazılamadı:', e);
            }
          }
          sessionStartRef.current = null;
          sessionAccumulatedRef.current = 0;
        }
      };

      window.addEventListener('beforeunload', handleSessionEnd);
      return () => {
        handleSessionEnd();
        window.removeEventListener('beforeunload', handleSessionEnd);
        if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
      };
    } else {
      if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser);
        setUser(profile);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(result.user);
      setUser(profile);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Profil Firestore'a kaydedilecek
      const newUser: User = {
        id: result.user.uid,
        displayName: name,
        email,
        avatar: name[0].toUpperCase(),
        stats: {
          totalQuizzes: 0,
          correctAnswers: 0,
          totalQuestions: 0,
          subjectStats: {},
          quizHistory: [],
          dailyActivity: {},
          level: 1,
          experience: 0,
          experienceToNext: 100,
          totalSessionTime: 0
        },
        jokers: {
          eliminate: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          extraTime: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          doubleAnswer: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
          autoCorrect: { count: 3, lastReset: new Date().toISOString().slice(0, 10) },
        },
        jokersUsed: {
          eliminate: 0,
          extraTime: 0,
          doubleAnswer: 0,
          autoCorrect: 0,
        },
        energy: 100,
        lastEnergyUpdate: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', result.user.uid), newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const profile = await getUserProfile(result.user);
      setUser(profile);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    // Oturum süresi kaydet (kalan süre)
    if (sessionStartRef.current && user) {
      const now = Date.now();
      const elapsed = now - sessionStartRef.current + sessionAccumulatedRef.current;
      const minutes = Math.floor(elapsed / 60000);
      if (minutes > 0) {
        try {
          await updateSessionTime(user.id, minutes);
        } catch (e) {
          console.error('Logout sırasında oturum süresi Firestore\'a yazılamadı:', e);
        }
      }
      sessionStartRef.current = null;
      sessionAccumulatedRef.current = 0;
      if (sessionIntervalRef.current) clearInterval(sessionIntervalRef.current);
    }
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserStats = async (correct: number, total: number, subjectId?: string, subjectName?: string, testNumber?: number, duration?: number) => {
    if (user) {
      const userRef = doc(db, 'users', user.id);
      // Istanbul saatine göre tarih al
      const now = new Date();
      const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
      const today = istanbulDate.toISOString().split('T')[0];
      
      // Temel istatistikler
      const updates: any = {
        'stats.totalQuizzes': increment(1),
        'stats.correctAnswers': increment(correct),
        'stats.totalQuestions': increment(total)
      };

      // Quiz süresini ayrı olarak ekle
      if (duration) {
        const prevQuizTime = user.stats.totalQuizTime || 0;
        updates['stats.totalQuizTime'] = prevQuizTime + duration;
      }

      // Konu bazlı istatistikler
      if (subjectId) {
        const subjectKey = `stats.subjectStats.${subjectId}`;
        updates[`${subjectKey}.totalQuestions`] = increment(total);
        updates[`${subjectKey}.correctAnswers`] = increment(correct);
        updates[`${subjectKey}.quizzes`] = increment(1);
        updates[`${subjectKey}.lastQuizDate`] = istanbulDate.toISOString();
      }

      // Quiz geçmişi
      if (subjectId && subjectName && testNumber !== undefined) {
        const quizRecord = {
          id: Date.now().toString(),
          subjectId,
          subjectName,
          testNumber,
          score: correct,
          totalQuestions: total,
          date: istanbulDate.toISOString(),
          duration: duration || 0
        };
        
        updates['stats.quizHistory'] = [...(user.stats.quizHistory || []), quizRecord];
      }

      // Günlük aktivite
      const dailyKey = `stats.dailyActivity.${today}`;
      const currentDaily = user.stats.dailyActivity?.[today] || { questionsSolved: 0, correctAnswers: 0, timeSpent: 0 };
      updates[dailyKey] = {
        questionsSolved: currentDaily.questionsSolved + total,
        correctAnswers: currentDaily.correctAnswers + correct,
        timeSpent: currentDaily.timeSpent + ((duration || 0) / 60) // saniyeyi dakikaya çevir
      };

      // Seviye ve deneyim puanı
      const expGained = correct * 10; // Her doğru soru 10 exp
      const newExperience = (user.stats.experience || 0) + expGained;
      // Seviye hesaplama (getXpForLevel ile)
      let newLevel = 1;
      let maxLevel = 100;
      for (let lvl = 1; lvl <= maxLevel; lvl++) {
        if (newExperience < getXpForLevel(lvl + 1)) {
          newLevel = lvl;
          break;
        }
      }
      if (newLevel > maxLevel) newLevel = maxLevel;
      const experienceToNext = getXpForLevel(newLevel + 1) - newExperience;

      updates['stats.experience'] = newExperience;
      updates['stats.level'] = newLevel;
      updates['stats.experienceToNext'] = experienceToNext;

      await updateDoc(userRef, updates);
      
      // Firestore'dan güncel profili çek
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUser(updatedSnap.data() as User);
      }
    }
  };

  const clearUserStats = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.id);
      const updates: any = {
        'stats.totalQuizzes': 0,
        'stats.correctAnswers': 0,
        'stats.totalQuestions': 0,
        'stats.subjectStats': {},
        'stats.quizHistory': [],
        'stats.dailyActivity': {},
        'stats.level': 1,
        'stats.experience': 0,
        'stats.experienceToNext': 100
      };
      await updateDoc(userRef, updates);
      
      // Kullanıcı bilgilerini güncelle (çıkış yapmadan)
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUser(updatedSnap.data() as User);
      }
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data() as User;
          console.log('AuthContext - Firestore\'dan çekilen joker hakları:', userData.jokers);
          
          // Günlük joker haklarını kontrol et ve gerekirse sıfırla
          const updatedJokers = await resetDailyJokers(user.id, userData.jokers);
          if (JSON.stringify(updatedJokers) !== JSON.stringify(userData.jokers)) {
            console.log('AuthContext - Joker hakları sıfırlandı:', updatedJokers);
            userData.jokers = updatedJokers;
          }
          
          // totalSessionTime'ı doğru yerden al
          if (userData.totalSessionTime !== undefined) {
            userData.stats.totalSessionTime = userData.totalSessionTime;
          }
          
          setUser(userData);
          console.log('AuthContext - Kullanıcı güncellendi');
        }
      } catch (error) {
        console.error('AuthContext - refreshUser hatası:', error);
      }
    }
  };

  const manualResetJokers = async () => {
    if (user) {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const newJokers: Jokers = {
          eliminate: { count: 3, lastReset: today },
          extraTime: { count: 3, lastReset: today },
          doubleAnswer: { count: 3, lastReset: today },
          autoCorrect: { count: 3, lastReset: today },
        };
        
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, { jokers: newJokers });
        console.log('Manuel joker yenileme tamamlandı:', newJokers);
        setUser(user);
        console.log('AuthContext - Kullanıcı güncellendi');
      } catch (error) {
        console.error('AuthContext - manualResetJokers hatası:', error);
      }
    }
  };

  // Optimized context value
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    updateUserStats,
    clearUserStats,
    updateUser,
    refreshUser,
    manualResetJokers
  }), [
    user, 
    isAuthenticated, 
    login, 
    register, 
    loginWithGoogle, 
    logout, 
    updateUserStats, 
    clearUserStats, 
    updateUser, 
    refreshUser, 
    manualResetJokers
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 