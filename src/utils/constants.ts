// Rütbe listesi
export const RANKS = [
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

// TYT Dersleri
export const TYT_SUBJECTS = [
  { id: 'tyt-turkce', label: 'TYT Türkçe', icon: '📝', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'tyt-tarih', label: 'TYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'tyt-cografya', label: 'TYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'tyt-felsefe', label: 'TYT Felsefe', icon: '💭', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'tyt-din', label: 'TYT Din', icon: '🕌', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'tyt-matematik', label: 'TYT Matematik', icon: '➗', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'tyt-fizik', label: 'TYT Fizik', icon: '🔬', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'tyt-kimya', label: 'TYT Kimya', icon: '⚗️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'tyt-biyoloji', label: 'TYT Biyoloji', icon: '🧬', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
];

// AYT Dersleri
export const AYT_SAY_SUBJECTS = [
  { id: 'ayt-matematik', label: 'AYT Matematik', icon: '📐', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'ayt-fizik', label: 'AYT Fizik', icon: '⚡', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'ayt-kimya', label: 'AYT Kimya', icon: '🧪', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'ayt-biyoloji', label: 'AYT Biyoloji', icon: '🔬', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
];

export const AYT_EA_SUBJECTS = [
  { id: 'ayt-matematik', label: 'AYT Matematik', icon: '📐', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'ayt-edebiyat', label: 'AYT Edebiyat', icon: '📚', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'ayt-tarih', label: 'AYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'ayt-cografya', label: 'AYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
];

export const AYT_SOZ_SUBJECTS = [
  { id: 'ayt-edebiyat', label: 'AYT Edebiyat', icon: '📚', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'ayt-tarih', label: 'AYT Tarih', icon: '🏺', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'ayt-cografya', label: 'AYT Coğrafya', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'ayt-felsefe', label: 'AYT Felsefe', icon: '💭', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'ayt-din', label: 'AYT Din', icon: '🕌', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

// Test sayısı
export const TEST_COUNT = 10;

// Quiz süresi (saniye)
export const QUIZ_DURATION = 600;

// Günlük hedef
export const DAILY_GOAL = 30;

// TYT Türkçe Alt Konular
export const TYT_TR_ALT_KONULAR = [
  { id: 'sozcukte-anlam', label: 'Sözcükte Anlam' },
  { id: 'cumlede-anlam', label: 'Cümlede Anlam' },
  { id: 'paragraf', label: 'Paragraf Bilgisi' },
  { id: 'ses-bilgisi', label: 'Ses Bilgisi' },
  { id: 'sozcuk-yapisi', label: 'Sözcük Yapısı' },
  { id: 'sozcuk-turleri', label: 'Sözcük Türleri' },
  { id: 'cumlenin-ogeleri', label: 'Cümlenin Öğeleri' },
  { id: 'cumle-turleri', label: 'Cümle Türleri' },
  { id: 'yazim-kurallari', label: 'Yazım Kuralları' },
  { id: 'noktalama', label: 'Noktalama İşaretleri' },
  { id: 'anlatim-bozuklugu', label: 'Anlatım Bozuklukları' },
  { id: 'sozel-mantik', label: 'Sözel Mantık ve Muhakeme' },
];

// TYT Din Alt Konular
export const TYT_DIN_ALT_KONULAR = [
  { id: 'bilgi-inanc', label: 'Bilgi ve İnanç' },
  { id: 'islam-ibadet', label: 'İslam ve İbadet' },
  { id: 'ahlak-degerler', label: 'Ahlak ve Değerler' },
  { id: 'allah-insan', label: 'Allah İnsan İlişkisi' },
  { id: 'hz-muhammed', label: 'Hz. Muhammed (S.A.V.)' },
  { id: 'vahiy-akil-mezhepler', label: 'Vahiy, Akıl ve Mezhepler' },
  { id: 'din-kultur-medeniyet', label: 'Din, Kültür ve Medeniyet' },
];

// TYT Fizik Alt Konular
export const TYT_FIZIK_ALT_KONULAR = [
  { id: 'fizik-bilimine-giris', label: 'Fizik Bilimine Giriş' },
  { id: 'madde-ve-ozellikleri', label: 'Madde ve Özellikleri' },
  { id: 'kuvvet-ve-hareket', label: 'Kuvvet ve Hareket' },
  { id: 'is-guc-enerji', label: 'İş, Güç ve Enerji' },
  { id: 'isi-sicaklik-genlesme', label: 'Isı, Sıcaklık ve Genleşme' },
  { id: 'basinc', label: 'Basınç' },
  { id: 'kaldirma-kuvveti', label: 'Kaldırma Kuvveti' },
  { id: 'elektrostatik', label: 'Elektrostatik' },
  { id: 'elektrik-manyetizma', label: 'Elektrik ve Manyetizma' },
  { id: 'dalgalar', label: 'Dalgalar' },
  { id: 'optik', label: 'Optik' },
];

// TYT Kimya Alt Konular
export const TYT_KIMYA_ALT_KONULAR = [
  { id: 'kimya-bilimi', label: 'Kimya Bilimi' },
  { id: 'atom-periyodik-sistem', label: 'Atom ve Periyodik Sistem' },
  { id: 'kimyasal-turler-arasi-etkilesimler', label: 'Kimyasal Türler Arası Etkileşimler' },
  { id: 'maddenin-halleri', label: 'Maddenin Halleri' },
  { id: 'doga-ve-kimya', label: 'Doğa ve Kimya' },
  { id: 'kimyanin-temel-kanunlari', label: 'Kimyanın Temel Kanunları' },
  { id: 'kimyasal-hesaplamalar', label: 'Kimyasal Hesaplamalar' },
  { id: 'karisimlar', label: 'Karışımlar' },
  { id: 'asit-baz-tuz', label: 'Asit, Baz ve Tuz' },
  { id: 'kimya-her-yerde', label: 'Kimya Her Yerde' },
];

// TYT Biyoloji Alt Konular
export const TYT_BIYOLOJI_ALT_KONULAR = [
  { id: 'canlilarin-ortak-ozellikleri', label: 'Canlıların Ortak Özellikleri' },
  { id: 'canlilarin-temel-bilesenleri', label: 'Canlıların Temel Bileşenleri' },
  { id: 'hucre-ve-organelleri', label: 'Hücre ve Organelleri' },
  { id: 'madde-gecisleri', label: 'Madde Geçişleri' },
  { id: 'canlilarin-siniflandirilmasi', label: 'Canlıların Sınıflandırılması' },
  { id: 'hucre-bolunmeleri-ve-ureme', label: 'Hücre Bölünmeleri ve Üreme' },
  { id: 'kalitim', label: 'Kalıtım' },
  { id: 'ekosistem', label: 'Ekosistem' },
  { id: 'bitkiler-biyolojisi', label: 'Bitkiler Biyolojisi' },
];

// TYT Coğrafya Alt Konular
export const TYT_COGRAFYA_ALT_KONULAR = [
  { id: 'dogaveinsan', label: 'Doğa ve İnsan' },
  { id: 'dunya-sekli', label: 'Dünyanın Şekli ve Hareketleri' },
  { id: 'cografi-konum', label: 'Coğrafi Konum' },
  { id: 'harita-bilgisi', label: 'Harita Bilgisi' },
  { id: 'atmosfer-iklim', label: 'Atmosfer ve İklim' },
  { id: 'sicaklik', label: 'Sıcaklık' },
  { id: 'basinc-ruzgar', label: 'Basınç ve Rüzgarlar' },
  { id: 'nem-yagis', label: 'Nem ve Yağış' },
  { id: 'iklim-tipleri', label: 'İklim Tipleri' },
  { id: 'tektonik-olusum', label: 'Dünyanın Tektonik Oluşumu' },
  { id: 'ic-kuvvetler', label: 'İç Kuvvetler ve Kayaçlar' },
  { id: 'dis-kuvvetler', label: 'Dış Kuvvetler' },
  { id: 'tr-yeryuzu', label: 'Türkiyenin Yeryüzü Şekilleri' },
  { id: 'su-toprak-bitki', label: 'Dünyada ve Türkiyede Su, Toprak ve Bitki Varlığı' },
  { id: 'yerlesmeler', label: 'Yerleşmeler' },
  { id: 'nufus', label: 'Nüfus' },
  { id: 'tr-nufus', label: 'Türkiyede Nüfus' },
  { id: 'gocler', label: 'Göçler' },
  { id: 'ekonomik-faaliyetler', label: 'Ekonomik Faaliyetler' },
  { id: 'bolge-cesitleri', label: 'Bölge Çeşitleri ve Bölge Sınırlarının Belirlenmesi' },
  { id: 'uluslararasi-ulasim', label: 'Uluslararası Ulaşım Hatları' },
  { id: 'dogal-afetler', label: 'Doğal Afetler' },
];

// TYT Tarih Alt Konular
export const TYT_TARIH_ALT_KONULAR = [
  { id: 'tarih-zaman', label: 'Tarih ve Zaman' },
  { id: 'ilk-donemler', label: 'İnsanlığın İlk Dönemleri' },
  { id: 'ilk-orta-cag-turk', label: 'İlk ve Orta Çağlarda Türk Dünyası' },
  { id: 'orta-cag-avrupa', label: 'Orta Çağda Dünya ve Avrupa' },
  { id: 'islam-medeniyeti', label: 'İslam Medeniyetinin Doğuşu' },
  { id: 'turkler-islamiyet', label: 'Türklerin İslamiyeti Kabulü ve İlk Türk-İslam Devletleri' },
  { id: 'selcuklu-turkiyesi', label: 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi' },
  { id: 'beylikten-osmanli', label: 'Beylikten Devlete Osmanlı Devleti (Kuruluş Dönemi)' },
  { id: 'yukselme-osmanli', label: 'Dünya Gücü Osmanlı (Yükselme Dönemi)' },
  { id: 'osmanli-kultur', label: 'Osmanlı Devleti Kültür ve Medeniyeti' },
  { id: 'degisim-avrupa-osmanli', label: 'Değişim Çağında Avrupa ve Osmanlı' },
  { id: 'duraklama', label: 'Osmanlı Devleti - Duraklama Dönemi (17. Yüzyıl)' },
  { id: 'gerileme', label: 'Osmanlı Devleti - Gerileme Dönemi (18. Yüzyıl)' },
  { id: 'dagilma', label: 'Osmanlı Devleti - Dağılma Dönemi (19. Yüzyıl)' },
  { id: '20yy-osmanli', label: 'XX. Yüzyıl Başlarında Osmanlı Devleti' },
  { id: '1dunya-savasi', label: 'I. Dünya Savaşı ve Osmanlı Devleti' },
  { id: 'mondros', label: 'Mondros Ateşkesi, İşgaller ve Cemiyetler' },
  { id: 'kurtulus-hazirlik', label: 'Kurtuluş Savaşına Hazırlık Dönemi' },
  { id: '1tbmm', label: 'I. TBMM Dönemi ve Siyasi Gelişmeler' },
  { id: 'kurtulus-antlasmalar', label: 'Kurtuluş Savaşı ve Antlaşmalar' },
  { id: '2tbmm-cumhuriyet', label: 'II. TBMM Dönemi ve Cumhuriyetin İlanı' },
  { id: 'inkilaplar', label: 'Türk İnkılabı (Siyasi, Hukuki, Eğitim, Ekonomi ve Toplumsal Alanda Değişimler)' },
  { id: 'ataturk-ilkeleri', label: 'Atatürk İlkeleri ve Atatürkçülük' },
  { id: 'ataturk-dis-politika', label: 'Atatürk Dönemi Türk Dış Politikası ve Çağdaş Türkiye' },
];

// AYT Edebiyat Alt Konular
export const AYT_EDEBIYAT_ALT_KONULAR = [
  { id: 'anlam-bilgisi', label: 'Anlam Bilgisi' },
  { id: 'dil-bilgisi', label: 'Dil Bilgisi' },
  { id: 'metin-turleri', label: 'Metin Türleri' },
  { id: 'siir-bilgisi', label: 'Şiir Bilgisi' },
  { id: 'edebi-sanatlar', label: 'Edebi Sanatlar' },
  { id: 'islamiyet-oncesi', label: 'İslamiyet Öncesi Türk Edebiyatı ve Geçiş Dönemi' },
  { id: 'halk-edebiyati', label: 'Halk Edebiyatı' },
  { id: 'divan-edebiyati', label: 'Divan Edebiyatı' },
  { id: 'tanzimat-edebiyati', label: 'Tanzimat Edebiyatı' },
  { id: 'servet-i-funun', label: 'Servet-i Fünun' },
  { id: 'fecri-ati', label: 'Fecr-i Ati Edebiyatı' },
  { id: 'milli-edebiyat', label: 'Milli Edebiyat' },
  { id: 'cumhuriyet-edebiyati', label: 'Cumhuriyet Dönemi Edebiyatı' },
  { id: 'bati-edebiyat-akimlari', label: 'Batı Edebiyat Akımları' },
];

// AYT Felsefe Alt Konular
export const AYT_FELSEFE_ALT_KONULAR = [
  { id: 'ilk-cag-felsefesi', label: 'İlk Çağ Felsefesi' },
  { id: 'orta-cag-felsefesi', label: 'Orta Çağ Felsefesi' },
  { id: 'yeni-cag-felsefesi', label: 'Yeni Çağ Felsefesi (15.-17. yy)' },
  { id: 'aydinlanma-modern-felsefe', label: 'Aydınlanma ve Modern Felsefe (18.-19. yy)' },
  { id: '20-yuzyil-felsefesi', label: '20. Yüzyıl Felsefesi' },
  { id: 'mantiga-giris', label: 'Mantığa Giriş' },
  { id: 'klasik-mantik', label: 'Klasik Mantık' },
  { id: 'mantik-ve-dil', label: 'Mantık ve Dil' },
  { id: 'sembolik-mantik', label: 'Sembolik Mantık' },
  { id: 'psikolojiye-giris', label: 'Psikolojiye Giriş' },
  { id: 'temel-psikolojik-surecler', label: 'Temel Psikolojik Süreçler' },
  { id: 'ogrenme-bellek-dusunme', label: 'Öğrenme, Bellek ve Düşünme' },
  { id: 'ruh-sagligi', label: 'Ruh Sağlığı' },
  { id: 'sosyolojiye-giris', label: 'Sosyolojiye Giriş' },
  { id: 'birey-toplum', label: 'Birey ve Toplum' },
  { id: 'toplumsal-yapi-degisim', label: 'Toplumsal Yapı ve Değişim' },
  { id: 'kultur-toplumsal-kurumlar', label: 'Kültür ve Toplumsal Kurumlar' },
];

// AYT Biyoloji Alt Konular
export const AYT_BIYOLOJI_ALT_KONULAR = [
  { id: 'sinir-sistemi', label: 'Sinir Sistemi' },
  { id: 'endokrin-sistem', label: 'Endokrin Sistem' },
  { id: 'duyu-organlari', label: 'Duyu Organları' },
  { id: 'destek-hareket-sistemi', label: 'Destek ve Hareket Sistemi' },
  { id: 'sindirim-sistemi', label: 'Sindirim Sistemi' },
  { id: 'dolanim-sistemi', label: 'Dolaşım Sistemi' },
  { id: 'solunum-sistemi', label: 'Solunum Sistemi' },
  { id: 'uriner-sistem', label: 'Üriner Sistem (Boşaltım Sistemi)' },
  { id: 'ureme-embriyo', label: 'Üreme Sistemi ve Embriyonik Gelişim' },
  { id: 'komunite-ekolojisi', label: 'Komünite Ekolojisi' },
  { id: 'populasyon-ekolojisi', label: 'Popülasyon Ekolojisi' },
  { id: 'genden-proteine', label: 'Genden Proteine' },
  { id: 'enerji-donusumleri', label: 'Canlılarda Enerji Dönüşümleri' },
  { id: 'bitki-biyolojisi', label: 'Bitki Biyolojisi' },
  { id: 'canlilar-cevre', label: 'Canlılar ve Çevre' },
];

// AYT Kimya Alt Konular
export const AYT_KIMYA_ALT_KONULAR = [
  { id: 'kimya-bilimi', label: 'Kimya Bilimi' },
  { id: 'atom-periyodik-sistem', label: 'Atom ve Periyodik Sistem' },
  { id: 'kimyasal-turler', label: 'Kimyasal Türler Arası Etkileşimler' },
  { id: 'kimyasal-hesaplamalar', label: 'Kimyasal Hesaplamalar' },
  { id: 'temel-kanunlar', label: 'Kimyanın Temel Kanunları' },
  { id: 'asit-baz-tuz', label: 'Asit, Baz ve Tuz' },
  { id: 'maddenin-halleri', label: 'Maddenin Halleri' },
  { id: 'karisimlar', label: 'Karışımlar' },
  { id: 'doga-ve-kimya', label: 'Doğa ve Kimya' },
  { id: 'kimya-her-yerde', label: 'Kimya Her Yerde' },
  { id: 'modern-atom-teorisi', label: 'Modern Atom Teorisi' },
  { id: 'gazlar', label: 'Gazlar' },
  { id: 'sivi-cozeltiler', label: 'Sıvı Çözeltiler ve Çözünürlük' },
  { id: 'tepkimelerde-enerji', label: 'Kimyasal Tepkimelerde Enerji' },
  { id: 'tepkimelerde-hiz', label: 'Kimyasal Tepkimelerde Hız' },
  { id: 'tepkimelerde-denge', label: 'Kimyasal Tepkimelerde Denge' },
  { id: 'asit-baz-dengesi', label: 'Asit-Baz Dengesi' },
  { id: 'cozunurluk-dengesi', label: 'Çözünürlük Dengesi' },
  { id: 'kimya-elektrik', label: 'Kimya ve Elektrik' },
  { id: 'karbon-kimyasi', label: 'Karbon Kimyasına Giriş' },
  { id: 'organik-kimya', label: 'Organik Kimya' },
  { id: 'enerji-bilim-gelismeler', label: 'Enerji Kaynakları ve Bilimsel Gelişmeler' },
];

// AYT Fizik Alt Konular
export const AYT_FIZIK_ALT_KONULAR = [
  { id: 'vektorler', label: 'Vektörler' },
  { id: 'kuvvet-tork-denge', label: 'Kuvvet, Tork ve Denge' },
  { id: 'kutle-merkezi', label: 'Kütle Merkezi' },
  { id: 'basit-makineler', label: 'Basit Makineler' },
  { id: 'hareket', label: 'Hareket' },
  { id: 'newton-yasalari', label: 'Newtonun Hareket Yasaları' },
  { id: 'is-guc-enerji', label: 'İş, Güç ve Enerji' },
  { id: 'atislar', label: 'Atışlar' },
  { id: 'itme-momentum', label: 'İtme ve Momentum' },
  { id: 'elektrik-alan-potansiyel', label: 'Elektrik Alan ve Potansiyel' },
  { id: 'paralel-levhalar-siga', label: 'Paralel Levhalar ve Sığa' },
  { id: 'manyetik-alan-kuvvet', label: 'Manyetik Alan ve Manyetik Kuvvet' },
  { id: 'induksiyon-akim-trafo', label: 'İndüksiyon, Alternatif Akım ve Transformatörler' },
  { id: 'cembersel-hareket', label: 'Düzgün Çembersel Hareket' },
  { id: 'donme-yuvarlanma-acisal', label: 'Dönme, Yuvarlanma ve Açısal Momentum' },
  { id: 'kutle-cekim-kepler', label: 'Kütle Çekim ve Kepler Yasaları' },
  { id: 'basit-harmonik-hareket', label: 'Basit Harmonik Hareket' },
  { id: 'dalga-mekanigi', label: 'Dalga Mekaniği' },
  { id: 'atom-fizigi-radyoaktivite', label: 'Atom Fiziğine Giriş ve Radyoaktivite' },
  { id: 'modern-fizik', label: 'Modern Fizik' },
  { id: 'modern-fizik-teknoloji', label: 'Modern Fiziğin Teknolojideki Uygulamaları' },
];

// AYT Coğrafya Alt Konular
export const AYT_COGRAFYA_ALT_KONULAR = [
  { id: 'ekosistem-biyoceşitlilik', label: 'Ekosistem ve Biyoçeşitlilik' },
  { id: 'enerji-madde-dongusu', label: 'Enerji Akışı ve Madde Döngüsü' },
  { id: 'dogal-afetler', label: 'Ekstrem Doğa Olayları ve Doğal Afetler' },
  { id: 'nufus-politikalari', label: "Nüfus Politikaları ve Türkiye'de Nüfus" },
  { id: 'ekonomik-faaliyetler', label: 'Ekonomik Faaliyetler ve Doğal Kaynaklar' },
  { id: 'turkiye-ekonomisi', label: 'Türkiye Ekonomisi ve Sektörel Dağılım' },
  { id: 'tarim-hayvancilik', label: 'Türkiyede Tarım ve Hayvancılık' },
  { id: 'madenler-enerji', label: 'Türkiyede Madenler ve Enerji Kaynakları' },
  { id: 'sanayi', label: 'Türkiyede Sanayi' },
  { id: 'ulasim-ticaret', label: "Türkiyede Ulaşım ve Ticaret" },
  { id: 'turizm', label: "Türkiyede Turizm" },
  { id: 'bolgesel-kalkinma', label: 'Türkiyenin Bölgesel Kalkınma Projeleri ve İşlevsel Bölgeleri' },
  { id: 'ilk-uygarliklar', label: 'İlk Uygarlıklar, Kültür Bölgeleri ve Türk Kültürü' },
  { id: 'jeopolitik', label: 'Jeopolitik Konum ve Çatışma Bölgeleri' },
  { id: 'orgutler', label: 'Küresel ve Bölgesel Örgütler' },
]; 