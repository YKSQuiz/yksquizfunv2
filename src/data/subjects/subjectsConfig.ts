export interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
}

export interface SubjectCategory {
  id: string;
  title: string;
  subtitle: string;
  theme: 'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel';
  subjects: Subject[];
}

// TYT Dersleri
export const tytSubjects: Subject[] = [
  { id: 'tyt-turkce', label: 'TYT Türkçe', icon: '📝', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/tyt-turkce-altkonular' },
  { id: 'tyt-tarih', label: 'TYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/tyt-tarih-altkonular' },
  { id: 'tyt-cografya', label: 'TYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/tyt-cografya-altkonular' },
  { id: 'tyt-felsefe', label: 'TYT Felsefe', icon: '💭', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/tyt-felsefe-altkonular' },
  { id: 'tyt-din', label: 'TYT Din', icon: '🕌', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/tyt-din-altkonular' },
  { id: 'tyt-matematik', label: 'TYT Matematik', icon: '➗', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/tyt-matematik-altkonular' },
  { id: 'tyt-fizik', label: 'TYT Fizik', icon: '🔬', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/tyt-fizik-altkonular' },
  { id: 'tyt-kimya', label: 'TYT Kimya', icon: '⚗️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/tyt-kimya-altkonular' },
  { id: 'tyt-biyoloji', label: 'TYT Biyoloji', icon: '🧬', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/tyt-biyoloji-altkonular' },
];

// AYT Sayısal Dersleri
export const aytSayisalSubjects: Subject[] = [
  { id: 'ayt-matematik', label: 'AYT Matematik', icon: '➗', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik-altkonular' },
  { id: 'ayt-fizik', label: 'AYT Fizik', icon: '🔬', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-fizik-altkonular' },
  { id: 'ayt-kimya', label: 'AYT Kimya', icon: '⚗️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-kimya-altkonular' },
  { id: 'ayt-biyoloji', label: 'AYT Biyoloji', icon: '🧬', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-biyoloji-altkonular' },
];

// AYT Eşit Ağırlık Dersleri
export const aytEaSubjects: Subject[] = [
  { id: 'ayt-edebiyat', label: 'AYT Edebiyat', icon: '📖', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-edebiyat-altkonular' },
  { id: 'ayt-tarih', label: 'AYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-tarih-altkonular' },
  { id: 'ayt-cografya', label: 'AYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-cografya-altkonular' },
  { id: 'ayt-matematik', label: 'AYT Matematik', icon: '➗', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik-altkonular' },
];

// AYT Sözel Dersleri
export const aytSozelSubjects: Subject[] = [
  { id: 'ayt-edebiyat', label: 'AYT Edebiyat', icon: '📖', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-edebiyat-altkonular' },
  { id: 'ayt-cografya', label: 'AYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-cografya-altkonular' },
  { id: 'ayt-tarih', label: 'AYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-tarih-altkonular' },
  { id: 'ayt-din', label: 'AYT Din Kültürü', icon: '🕌', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-din-altkonular' },
  { id: 'ayt-felsefe', label: 'AYT Felsefe', icon: '💭', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-felsefe-altkonular' },
];

// Ana konfigürasyon
export const subjectsConfig: Record<string, SubjectCategory> = {
  tyt: {
    id: 'tyt',
    title: 'TYT Ders Seçimi',
    subtitle: 'Her dersin kendine özel soruları seni bekliyor!',
    theme: 'tyt',
    subjects: tytSubjects
  },
  aytSayisal: {
    id: 'ayt-sayisal',
    title: 'AYT-Sayısal Ders Seçimi',
    subtitle: 'Sayısal derslerin soruları seni bekliyor!',
    theme: 'ayt-sayisal',
    subjects: aytSayisalSubjects
  },
  aytEa: {
    id: 'ayt-ea',
    title: 'AYT-Eşit Ağırlık Ders Seçimi',
    subtitle: 'Eşit ağırlık derslerinin soruları seni bekliyor!',
    theme: 'ayt-ea',
    subjects: aytEaSubjects
  },
  aytSozel: {
    id: 'ayt-sozel',
    title: 'AYT-Sözel Ders Seçimi',
    subtitle: 'Sözel derslerin soruları seni bekliyor!',
    theme: 'ayt-sozel',
    subjects: aytSozelSubjects
  }
}; 