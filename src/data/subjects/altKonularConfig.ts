export interface AltKonu {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
}

// TYT Matematik Alt Konuları
export const tytMatematikAltKonular: AltKonu[] = [
  { id: 'temel-kavramlar', label: 'Temel Kavramlar', icon: '🔢', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/matematik/temel-kavramlar' },
  { id: 'sayi-basamaklari', label: 'Sayı Basamakları', icon: '🔢', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/matematik/sayi-basamaklari' },
  { id: 'bolme-bolunebilme', label: 'Bölme ve Bölünebilme', icon: '➗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/matematik/bolme-bolunebilme' },
  { id: 'ebob-ekok', label: 'EBOB – EKOK', icon: '🔗', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/matematik/ebob-ekok' },
  { id: 'rasyonel-sayilar', label: 'Rasyonel Sayılar', icon: '🧮', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/matematik/rasyonel-sayilar' },
  { id: 'basit-esitsizlikler', label: 'Basit Eşitsizlikler', icon: '≠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/matematik/basit-esitsizlikler' },
  { id: 'mutlak-deger', label: 'Mutlak Değer', icon: '➖', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/matematik/mutlak-deger' },
  { id: 'uslu-sayilar', label: 'Üslü Sayılar', icon: '🔼', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/matematik/uslu-sayilar' },
  { id: 'koklu-sayilar', label: 'Köklü Sayılar', icon: '√', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/matematik/koklu-sayilar' },
  { id: 'carpanlara-ayirma', label: 'Çarpanlara Ayırma', icon: '✖️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/matematik/carpanlara-ayirma' },
  { id: 'oran-oranti', label: 'Oran Orantı', icon: '⚖️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/matematik/oran-oranti' },
  { id: 'denklem-cozme', label: 'Denklem Çözme', icon: '🧩', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/matematik/denklem-cozme' },
  { id: 'sayi-problemleri', label: 'Sayı Problemleri', icon: '❓', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/matematik/sayi-problemleri' },
  { id: 'kesir-problemleri', label: 'Kesir Problemleri', icon: '🧃', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/matematik/kesir-problemleri' },
  { id: 'yas-problemleri', label: 'Yaş Problemleri', icon: '🎂', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/matematik/yas-problemleri' },
  { id: 'hareket-hiz-problemleri', label: 'Hareket Hız Problemleri', icon: '🏃‍♂️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/matematik/hareket-hiz-problemleri' },
  { id: 'isci-emek-problemleri', label: 'İşçi Emek Problemleri', icon: '👷‍♂️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/matematik/isci-emek-problemleri' },
  { id: 'yuzde-problemleri', label: 'Yüzde Problemleri', icon: '💯', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/matematik/yuzde-problemleri' },
  { id: 'kar-zarar-problemleri', label: 'Kar Zarar Problemleri', icon: '📈', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/matematik/kar-zarar-problemleri' },
  { id: 'karisim-problemleri', label: 'Karışım Problemleri', icon: '🥤', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/matematik/karisim-problemleri' },
  { id: 'grafik-problemleri', label: 'Grafik Problemleri', icon: '📊', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/matematik/grafik-problemleri' },
  { id: 'rutin-olmayan-problemler', label: 'Rutin Olmayan Problemler', icon: '🧠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/matematik/rutin-olmayan-problemler' },
  { id: 'kume-kartezyen', label: 'Kümeler – Kartezyen Çarpım', icon: '🔗', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/matematik/kume-kartezyen' },
  { id: 'mantik', label: 'Mantık', icon: '🤔', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/matematik/mantik' },
  { id: 'fonksiyonlar', label: 'Fonksiyonlar', icon: '📈', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/matematik/fonksiyonlar' },
  { id: 'polinomlar', label: 'Polinomlar', icon: '🧮', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/matematik/polinomlar' },
  { id: 'ikinci-derece-denklem', label: '2. Dereceden Denklemler', icon: '2️⃣', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/matematik/ikinci-derece-denklem' },
  { id: 'permutasyon-kombinasyon', label: 'Permütasyon ve Kombinasyon', icon: '🔄', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/matematik/permutasyon-kombinasyon' },
  { id: 'olasilik', label: 'Olasılık', icon: '🎲', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/matematik/olasilik' },
  { id: 'veri-istatistik', label: 'Veri – İstatistik', icon: '📊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/matematik/veri-istatistik' },
];

// TYT Türkçe Alt Konuları
export const tytTurkceAltKonular: AltKonu[] = [
  { id: 'sozcukte-anlam', label: 'Sözcükte Anlam', icon: '📖', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/turkce/sozcukte-anlam' },
  { id: 'cumlede-anlam', label: 'Cümlede Anlam', icon: '💬', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/turkce/cumlede-anlam' },
  { id: 'paragraf-bilgisi', label: 'Paragraf Bilgisi', icon: '📝', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/turkce/paragraf-bilgisi' },
  { id: 'ses-bilgisi', label: 'Ses Bilgisi', icon: '🔊', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/turkce/ses-bilgisi' },
  { id: 'sozcuk-yapisi', label: 'Sözcük Yapısı', icon: '🏗️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/turkce/sozcuk-yapisi' },
  { id: 'sozcuk-turleri', label: 'Sözcük Türleri', icon: '📚', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/turkce/sozcuk-turleri' },
  { id: 'cumlenin-ogeleri', label: 'Cümlenin Öğeleri', icon: '🔍', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/turkce/cumlenin-ogeleri' },
  { id: 'cumle-turleri', label: 'Cümle Türleri', icon: '📋', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/turkce/cumle-turleri' },
  { id: 'yazim-kurallari', label: 'Yazım Kuralları', icon: '✍️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/turkce/yazim-kurallari' },
  { id: 'noktalama-isaretleri', label: 'Noktalama İşaretleri', icon: '🔤', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/turkce/noktalama-isaretleri' },
  { id: 'anlatim-bozukluklari', label: 'Anlatım Bozuklukları', icon: '❌', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/turkce/anlatim-bozukluklari' },
  { id: 'sozel-mantik-muhakeme', label: 'Sözel Mantık ve Muhakeme', icon: '🧠', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/turkce/sozel-mantik-muhakeme' },
];

// TYT Tarih Alt Konuları
export const tytTarihAltKonular: AltKonu[] = [
  { id: 'tarih-ve-zaman', label: 'Tarih ve Zaman', icon: '⏰', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/tarih/tarih-ve-zaman' },
  { id: 'insanligin-ilk-donemleri', label: 'İnsanlığın İlk Dönemleri', icon: '🦍', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/tarih/insanligin-ilk-donemleri' },
  { id: 'ilk-orta-caglarda-turk-dunyasi', label: 'İlk ve Orta Çağlarda Türk Dünyası', icon: '🏹', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/tarih/ilk-orta-caglarda-turk-dunyasi' },
  { id: 'orta-cagda-dunya-avrupa', label: 'Orta Çağda Dünya ve Avrupa', icon: '🏰', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/tarih/orta-cagda-dunya-avrupa' },
  { id: 'islam-medeniyetinin-dogusu', label: 'İslam Medeniyetinin Doğuşu', icon: '🕌', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/tarih/islam-medeniyetinin-dogusu' },
  { id: 'turklerin-islamiyeti-kabulu', label: 'Türklerin İslamiyeti Kabulü ve İlk Türk-İslam Devletleri', icon: '⚔️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/tarih/turklerin-islamiyeti-kabulu' },
  { id: 'yerlesme-devletlesme-selcuklu', label: 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi', icon: '🏛️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/tarih/yerlesme-devletlesme-selcuklu' },
  { id: 'beylikten-devlete-osmanli', label: 'Beylikten Devlete Osmanlı Devleti (Kuruluş Dönemi)', icon: '👑', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/tarih/beylikten-devlete-osmanli' },
  { id: 'dunya-gucu-osmanli', label: 'Dünya Gücü Osmanlı (Yükselme Dönemi)', icon: '🌍', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/tarih/dunya-gucu-osmanli' },
  { id: 'osmanli-kultur-medeniyet', label: 'Osmanlı Devleti Kültür ve Medeniyeti', icon: '🎭', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/tarih/osmanli-kultur-medeniyet' },
  { id: 'degisim-caginda-avrupa-osmanli', label: 'Değişim Çağında Avrupa ve Osmanlı', icon: '🔄', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/tarih/degisim-caginda-avrupa-osmanli' },
  { id: 'osmanli-duraklama-donemi', label: 'Osmanlı Devleti - Duraklama Dönemi (17. Yüzyıl)', icon: '⏸️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/tarih/osmanli-duraklama-donemi' },
  { id: 'osmanli-gerileme-donemi', label: 'Osmanlı Devleti - Gerileme Dönemi (18. Yüzyıl)', icon: '📉', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/tarih/osmanli-gerileme-donemi' },
  { id: 'osmanli-dagilma-donemi', label: 'Osmanlı Devleti - Dağılma Dönemi (19. Yüzyıl)', icon: '💔', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/tarih/osmanli-dagilma-donemi' },
  { id: 'xx-yuzyil-baslarinda-osmanli', label: 'XX. Yüzyıl Başlarında Osmanlı Devleti', icon: '📅', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/tarih/xx-yuzyil-baslarinda-osmanli' },
  { id: 'birinci-dunya-savasi-osmanli', label: 'I. Dünya Savaşı ve Osmanlı Devleti', icon: '💥', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/tarih/birinci-dunya-savasi-osmanli' },
  { id: 'mondros-ateskesi-isgaller', label: 'Mondros Ateşkesi, İşgaller ve Cemiyetler', icon: '📜', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/tarih/mondros-ateskesi-isgaller' },
  { id: 'kurtulus-savasina-hazirlik', label: 'Kurtuluş Savaşına Hazırlık Dönemi', icon: '⚔️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/tarih/kurtulus-savasina-hazirlik' },
  { id: 'birinci-tbmm-donemi', label: 'I. TBMM Dönemi ve Siyasi Gelişmeler', icon: '🏛️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/tarih/birinci-tbmm-donemi' },
  { id: 'kurtulus-savasi-antlasmalar', label: 'Kurtuluş Savaşı ve Antlaşmalar', icon: '🤝', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/tarih/kurtulus-savasi-antlasmalar' },
  { id: 'ikinci-tbmm-donemi-cumhuriyet', label: 'II. TBMM Dönemi ve Cumhuriyetin İlanı', icon: '🇹🇷', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/tarih/ikinci-tbmm-donemi-cumhuriyet' },
  { id: 'turk-inkilabi', label: 'Türk İnkılabı (Siyasi, Hukuki, Eğitim, Ekonomi ve Toplumsal Alanda Değişimler)', icon: '🔄', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/tarih/turk-inkilabi' },
  { id: 'ataturk-ilkeleri-ataturkculuk', label: 'Atatürk İlkeleri ve Atatürkçülük', icon: '⭐', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/tarih/ataturk-ilkeleri-ataturkculuk' },
  { id: 'ataturk-donemi-dis-politika', label: 'Atatürk Dönemi Türk Dış Politikası ve Çağdaş Türkiye', icon: '🌐', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/tarih/ataturk-donemi-dis-politika' },
];

// TYT Coğrafya Alt Konuları
export const tytCografyaAltKonular: AltKonu[] = [
  { id: 'doga-ve-insan', label: 'Doğa ve İnsan', icon: '🌍', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/cografya/doga-ve-insan' },
  { id: 'dunyanin-sekli-hareketleri', label: 'Dünya\'nın Şekli ve Hareketleri', icon: '🌎', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/cografya/dunyanin-sekli-hareketleri' },
  { id: 'cografi-konum', label: 'Coğrafi Konum', icon: '📍', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/cografya/cografi-konum' },
  { id: 'harita-bilgisi', label: 'Harita Bilgisi', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/cografya/harita-bilgisi' },
  { id: 'atmosfer-iklim', label: 'Atmosfer ve İklim', icon: '🌤️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/cografya/atmosfer-iklim' },
  { id: 'sicaklik', label: 'Sıcaklık', icon: '🌡️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/cografya/sicaklik' },
  { id: 'basinc-ruzgarlar', label: 'Basınç ve Rüzgarlar', icon: '💨', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/cografya/basinc-ruzgarlar' },
  { id: 'nem-yagis', label: 'Nem ve Yağış', icon: '🌧️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/cografya/nem-yagis' },
  { id: 'iklim-tipleri', label: 'İklim Tipleri', icon: '🌦️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/cografya/iklim-tipleri' },
  { id: 'dunyanin-tektonik-olusumu', label: 'Dünya\'nın Tektonik Oluşumu', icon: '🌋', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/cografya/dunyanin-tektonik-olusumu' },
  { id: 'ic-kuvvetler-kayaclar', label: 'İç Kuvvetler ve Kayaçlar', icon: '⛰️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/cografya/ic-kuvvetler-kayaclar' },
  { id: 'dis-kuvvetler', label: 'Dış Kuvvetler', icon: '🏔️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/cografya/dis-kuvvetler' },
  { id: 'turkiyenin-yeryuzu-sekilleri', label: 'Türkiye\'nin Yeryüzü Şekilleri', icon: '🗻', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/cografya/turkiyenin-yeryuzu-sekilleri' },
  { id: 'su-toprak-bitki-varligi', label: 'Dünyada ve Türkiye\'de Su,Toprak ve Bitki varlığı', icon: '🌱', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/cografya/su-toprak-bitki-varligi' },
  { id: 'yerlesmeler', label: 'Yerleşmeler', icon: '🏘️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/cografya/yerlesmeler' },
  { id: 'nufus', label: 'Nüfus', icon: '👥', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/cografya/nufus' },
  { id: 'turkiyede-nufus', label: 'Türkiye\'de Nüfus', icon: '🇹🇷', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/cografya/turkiyede-nufus' },
  { id: 'gocler', label: 'Göçler', icon: '🚶‍♂️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/cografya/gocler' },
  { id: 'ekonomik-faaliyetler', label: 'Ekonomik Faaliyetler', icon: '💼', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/cografya/ekonomik-faaliyetler' },
  { id: 'bolge-cesitleri-sinirlar', label: 'Bölge Çeşitleri ve Bölge Sınırlarının Belirlenmesi', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/cografya/bolge-cesitleri-sinirlar' },
  { id: 'uluslararasi-ulasim-hatlari', label: 'Uluslararası Ulaşım Hatları', icon: '🚢', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/cografya/uluslararasi-ulasim-hatlari' },
  { id: 'dogal-afetler', label: 'Doğal Afetler', icon: '🌊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/cografya/dogal-afetler' },
];

// TYT Felsefe Alt Konuları
export const tytFelsefeAltKonular: AltKonu[] = [
  { id: 'felsefeyle-tanisma', label: 'Felsefeyle Tanışma', icon: '🤔', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/felsefe/felsefeyle-tanisma' },
  { id: 'bilgi-felsefesi', label: 'Bilgi Felsefesi (Epistemoloji)', icon: '🧠', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/felsefe/bilgi-felsefesi' },
  { id: 'varlik-felsefesi', label: 'Varlık Felsefesi (Ontoloji)', icon: '🌌', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/felsefe/varlik-felsefesi' },
  { id: 'ahlak-felsefesi', label: 'Ahlak Felsefesi (Etik)', icon: '⚖️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/felsefe/ahlak-felsefesi' },
  { id: 'sanat-felsefesi', label: 'Sanat Felsefesi(Estetik)', icon: '🎨', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/felsefe/sanat-felsefesi' },
  { id: 'din-felsefesi', label: 'Din Felsefesi', icon: '🕊️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/felsefe/din-felsefesi' },
  { id: 'siyaset-felsefesi', label: 'Siyaset Felsefesi', icon: '🏛️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/felsefe/siyaset-felsefesi' },
  { id: 'bilim-felsefesi', label: 'Bilim Felsefesi', icon: '🔬', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/felsefe/bilim-felsefesi' },
  { id: 'felsefe-tarihi', label: 'Felsefe Tarihi', icon: '📚', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/felsefe/felsefe-tarihi' },
];

// TYT Din Alt Konuları
export const tytDinAltKonular: AltKonu[] = [
  { id: 'bilgi-ve-inanc', label: 'Bilgi ve İnanç', icon: '📖', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/din/bilgi-ve-inanc' },
  { id: 'islam-ve-ibadet', label: 'İslam ve İbadet', icon: '🕌', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/din/islam-ve-ibadet' },
  { id: 'ahlak-ve-degerler', label: 'Ahlak ve Değerler', icon: '💎', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/din/ahlak-ve-degerler' },
  { id: 'allah-insan-iliskisi', label: 'Allah İnsan İlişkisi', icon: '🤝', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/din/allah-insan-iliskisi' },
  { id: 'hz-muhammed', label: 'Hz. Muhammed (S.A.V.)', icon: '☪️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/din/hz-muhammed' },
  { id: 'vahiy-akil-mezhepler', label: 'Vahiy,Akıl ve Mezhepler', icon: '🧠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/din/vahiy-akil-mezhepler' },
  { id: 'din-kultur-medeniyet', label: 'Din, Kültür ve Medeniyet', icon: '🏛️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/din/din-kultur-medeniyet' },
];

// TYT Fizik Alt Konuları
export const tytFizikAltKonular: AltKonu[] = [
  { id: 'fizik-bilimine-giris', label: 'Fizik Bilimine Giriş', icon: '⚡', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/fizik/fizik-bilimine-giris' },
  { id: 'madde-ve-ozellikleri', label: 'Madde ve Özellikleri', icon: '🧪', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/fizik/madde-ve-ozellikleri' },
  { id: 'kuvvet-ve-hareket', label: 'Kuvvet ve Hareket', icon: '🏃‍♂️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/fizik/kuvvet-ve-hareket' },
  { id: 'is-guc-enerji', label: 'İş, Güç ve Enerji', icon: '💪', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/fizik/is-guc-enerji' },
  { id: 'isi-sicaklik-genlesme', label: 'Isı, Sıcaklık ve Genleşme', icon: '🌡️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/fizik/isi-sicaklik-genlesme' },
  { id: 'basinc', label: 'Basınç', icon: '📊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/fizik/basinc' },
  { id: 'kaldirma-kuvveti', label: 'Kaldırma Kuvveti', icon: '🏊‍♂️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/fizik/kaldirma-kuvveti' },
  { id: 'elektrostatik', label: 'Elektrostatik', icon: '⚡', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/fizik/elektrostatik' },
  { id: 'elektrik-manyetizma', label: 'Elektrik ve Manyetizma', icon: '🔌', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/fizik/elektrik-manyetizma' },
  { id: 'dalgalar', label: 'Dalgalar', icon: '🌊', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/fizik/dalgalar' },
  { id: 'optik', label: 'Optik', icon: '🔍', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/fizik/optik' },
];

// TYT Kimya Alt Konuları
export const tytKimyaAltKonular: AltKonu[] = [
  { id: 'kimya-bilimi', label: 'Kimya Bilimi', icon: '🧪', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/kimya/kimya-bilimi' },
  { id: 'atom-periyodik-sistem', label: 'Atom ve Periyodik Sistem', icon: '⚛️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/kimya/atom-periyodik-sistem' },
  { id: 'kimyasal-turler-etkilesim', label: 'Kimyasal Türler Arası Etkileşimler', icon: '🔗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/kimya/kimyasal-turler-etkilesim' },
  { id: 'maddenin-halleri', label: 'Maddenin Halleri', icon: '💧', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/kimya/maddenin-halleri' },
  { id: 'doga-ve-kimya', label: 'Doğa ve Kimya', icon: '🌿', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/kimya/doga-ve-kimya' },
  { id: 'kimyanin-temel-kanunlari', label: 'Kimyanın Temel Kanunları', icon: '⚖️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/kimya/kimyanin-temel-kanunlari' },
  { id: 'kimyasal-hesaplamalar', label: 'Kimyasal Hesaplamalar', icon: '🧮', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/kimya/kimyasal-hesaplamalar' },
  { id: 'karisimlar', label: 'Karışımlar', icon: '🥤', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/kimya/karisimlar' },
  { id: 'asit-baz-tuz', label: 'Asit, Baz ve Tuz', icon: '🧂', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/kimya/asit-baz-tuz' },
  { id: 'kimya-her-yerde', label: 'Kimya Her Yerde', icon: '🌍', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/kimya/kimya-her-yerde' },
];

// TYT Biyoloji Alt Konuları
export const tytBiyolojiAltKonular: AltKonu[] = [
  { id: 'canlilarin-ortak-ozellikleri', label: 'Canlıların Ortak Özellikleri', icon: '🦠', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/biyoloji/canlilarin-ortak-ozellikleri' },
  { id: 'canlilarin-temel-bilesenleri', label: 'Canlıların Temel Bileşenleri', icon: '🧬', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/biyoloji/canlilarin-temel-bilesenleri' },
  { id: 'hucre-organelleri', label: 'Hücre ve Organelleri', icon: '🔬', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/biyoloji/hucre-organelleri' },
  { id: 'madde-gecisleri', label: 'Madde Geçişleri', icon: '🔄', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/biyoloji/madde-gecisleri' },
  { id: 'canlilarin-siniflandirilmasi', label: 'Canlıların Sınıflandırılması', icon: '📋', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/biyoloji/canlilarin-siniflandirilmasi' },
  { id: 'hucre-bolunmeleri-ureme', label: 'Hücre Bölünmeleri ve Üreme', icon: '🔄', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/biyoloji/hucre-bolunmeleri-ureme' },
  { id: 'kalitim', label: 'Kalıtım', icon: '🧬', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/biyoloji/kalitim' },
  { id: 'ekosistem', label: 'Ekosistem', icon: '🌱', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/biyoloji/ekosistem' },
  { id: 'bitkiler-biyolojisi', label: 'Bitkiler Biyolojisi', icon: '🌿', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/biyoloji/bitkiler-biyolojisi' },
];

// AYT Matematik Alt Konuları
export const aytMatematikAltKonular: AltKonu[] = [
  { id: 'temel-kavramlar-ayt', label: 'Temel Kavramlar', icon: '🔢', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-matematik/temel-kavramlar' },
  { id: 'sayi-basamaklari-ayt', label: 'Sayı Basamakları', icon: '🔢', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-matematik/sayi-basamaklari' },
  { id: 'bolme-bolunebilme-ayt', label: 'Bölme ve Bölünebilme', icon: '➗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-matematik/bolme-bolunebilme' },
  { id: 'ebob-ekok-ayt', label: 'EBOB ve EKOK', icon: '🔗', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-matematik/ebob-ekok' },
  { id: 'rasyonel-sayilar-ayt', label: 'Rasyonel Sayılar', icon: '🧮', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-matematik/rasyonel-sayilar' },
  { id: 'basit-esitsizlikler-ayt', label: 'Basit Eşitsizlikler', icon: '≠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik/basit-esitsizlikler' },
  { id: 'mutlak-deger-ayt', label: 'Mutlak Değer', icon: '➖', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-matematik/mutlak-deger' },
  { id: 'uslu-sayilar-ayt', label: 'Üslü Sayılar', icon: '🔼', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-matematik/uslu-sayilar' },
  { id: 'koklu-sayilar-ayt', label: 'Köklü Sayılar', icon: '√', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-matematik/koklu-sayilar' },
  { id: 'carpanlara-ayirma-ayt', label: 'Çarpanlara Ayırma', icon: '✖️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-matematik/carpanlara-ayirma' },
  { id: 'oran-oranti-ayt', label: 'Oran Orantı', icon: '⚖️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-matematik/oran-oranti' },
  { id: 'denklem-cozme-ayt', label: 'Denklem Çözme', icon: '🧩', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-matematik/denklem-cozme' },
  { id: 'problemler-ayt', label: 'Problemler', icon: '❓', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-matematik/problemler' },
  { id: 'kumeler-ayt', label: 'Kümeler', icon: '🔗', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik/kumeler' },
  { id: 'mantik-ayt', label: 'Mantık', icon: '🤔', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-matematik/mantik' },
  { id: 'fonksiyonlar-ayt', label: 'Fonksiyonlar', icon: '📈', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-matematik/fonksiyonlar' },
  { id: 'polinomlar-ayt', label: 'Polinomlar', icon: '🧮', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-matematik/polinomlar' },
  { id: 'ikinci-derece-denklem-ayt', label: '2.Dereceden Denklemler', icon: '2️⃣', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-matematik/ikinci-derece-denklem' },
  { id: 'binom', label: 'Binom', icon: '🔢', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-matematik/binom' },
  { id: 'permutasyon-kombinasyon-ayt', label: 'Permütasyon ve Kombinasyon', icon: '🔄', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-matematik/permutasyon-kombinasyon' },
  { id: 'olasilik-ayt', label: 'Olasılık', icon: '🎲', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-matematik/olasilik' },
  { id: 'veri-istatistik-ayt', label: 'Veri ve İstatistik', icon: '📊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik/veri-istatistik' },
  { id: 'karmasik-sayilar', label: 'Karmaşık Sayılar', icon: 'ℂ', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-matematik/karmasik-sayilar' },
  { id: 'ikinci-derece-esitsizlikler', label: '2.Dereceden Eşitsizlikler', icon: '≠', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-matematik/ikinci-derece-esitsizlikler' },
  { id: 'parabol', label: 'Parabol', icon: '📈', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-matematik/parabol' },
  { id: 'trigonometri', label: 'Trigonometri', icon: '📐', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-matematik/trigonometri' },
  { id: 'logaritma', label: 'Logaritma', icon: '📊', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-matematik/logaritma' },
  { id: 'diziler', label: 'Diziler', icon: '📋', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-matematik/diziler' },
  { id: 'limit', label: 'Limit', icon: '∞', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-matematik/limit' },
  { id: 'turev', label: 'Türev', icon: '📈', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-matematik/turev' },
  { id: 'integral', label: 'İntegral', icon: '∫', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-matematik/integral' },
];

// AYT Edebiyat Alt Konuları
export const aytEdebiyatAltKonular: AltKonu[] = [
  { id: 'anlam-bilgisi', label: 'Anlam Bilgisi', icon: '📖', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-edebiyat/anlam-bilgisi' },
  { id: 'dil-bilgisi', label: 'Dil Bilgisi', icon: '🔤', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-edebiyat/dil-bilgisi' },
  { id: 'metin-turleri', label: 'Metin Türleri', icon: '📝', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-edebiyat/metin-turleri' },
  { id: 'siir-bilgisi', label: 'Şiir Bilgisi', icon: '📜', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-edebiyat/siir-bilgisi' },
  { id: 'edebi-sanatlar', label: 'Edebi Sanatlar', icon: '🎭', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-edebiyat/edebi-sanatlar' },
  { id: 'islamiyet-oncesi-turk-edebiyati', label: 'İslamiyet Öncesi Türk Edebiyatı ve Geçiş Dönemi', icon: '🏹', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-edebiyat/islamiyet-oncesi-turk-edebiyati' },
  { id: 'halk-edebiyati', label: 'Halk Edebiyatı', icon: '👥', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-edebiyat/halk-edebiyati' },
  { id: 'divan-edebiyati', label: 'Divan Edebiyatı', icon: '👑', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-edebiyat/divan-edebiyati' },
  { id: 'tanzimat-edebiyati', label: 'Tanzimat Edebiyatı', icon: '🔄', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-edebiyat/tanzimat-edebiyati' },
  { id: 'servet-i-funun', label: 'Servet-i Fünun', icon: '📚', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-edebiyat/servet-i-funun' },
  { id: 'fecr-i-ati-edebiyati', label: 'Fecr-i Ati Edebiyatı', icon: '🌅', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-edebiyat/fecr-i-ati-edebiyati' },
  { id: 'milli-edebiyat', label: 'Milli Edebiyat', icon: '🇹🇷', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-edebiyat/milli-edebiyat' },
  { id: 'cumhuriyet-donemi-edebiyati', label: 'Cumhuriyet Dönemi Edebiyatı', icon: '🏛️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-edebiyat/cumhuriyet-donemi-edebiyati' },
  { id: 'bati-edebiyat-akimlari', label: 'Batı Edebiyat Akımları', icon: '🌍', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-edebiyat/bati-edebiyat-akimlari' },
];

// AYT Tarih Alt Konuları
export const aytTarihAltKonular: AltKonu[] = [
  { id: 'tarih-ve-zaman-ayt', label: 'Tarih ve Zaman', icon: '⏰', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-tarih/tarih-ve-zaman' },
  { id: 'ilk-insanlar-medeniyetler', label: 'İlk İnsanlar ve Medeniyetler', icon: '🦍', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-tarih/ilk-insanlar-medeniyetler' },
  { id: 'turklerin-ilk-donemleri', label: 'Türklerin İlk Dönemleri', icon: '🏹', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-tarih/turklerin-ilk-donemleri' },
  { id: 'islamiyetin-dogusu-ilk-devletler', label: 'İslamiyet\'in Doğuşu ve İlk Devletler', icon: '🕌', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-tarih/islamiyetin-dogusu-ilk-devletler' },
  { id: 'turklerin-islamiyeti-kabulu-ayt', label: 'Türklerin İslamiyet\'i Kabulü ve İlk Türk-İslam Devletleri', icon: '⚔️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-tarih/turklerin-islamiyeti-kabulu' },
  { id: 'orta-cagda-dunya-ayt', label: 'Orta Çağ\'da Dünya', icon: '🏰', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-tarih/orta-cagda-dunya' },
  { id: 'selcuklu-devleti-anadolu', label: 'Selçuklu Devleti ve Anadolu\'nun Türkleşmesi', icon: '🏛️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-tarih/selcuklu-devleti-anadolu' },
  { id: 'osmanli-devletinin-kurulusu', label: 'Osmanlı Devleti\'nin Kuruluşu', icon: '👑', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-tarih/osmanli-devletinin-kurulusu' },
  { id: 'osmanlida-ordu-savaslar', label: 'Osmanlı\'da Ordu ve Savaşlar', icon: '⚔️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-tarih/osmanlida-ordu-savaslar' },
  { id: 'osmanlida-yonetim-kultur', label: 'Osmanlı\'da Yönetim ve Kültür', icon: '🎭', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-tarih/osmanlida-yonetim-kultur' },
  { id: 'osmanli-devletinin-yukselisi', label: 'Osmanlı Devleti\'nin Yükselişi', icon: '📈', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-tarih/osmanli-devletinin-yukselisi' },
  { id: 'osmanli-merkez-teskilati', label: 'Osmanlı Merkez Teşkilatı ve Yönetimi', icon: '🏛️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-tarih/osmanli-merkez-teskilati' },
  { id: 'osmanli-toplum-duzeni', label: 'Osmanlı Toplum Düzeni', icon: '👥', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-tarih/osmanli-toplum-duzeni' },
  { id: 'yeni-cagda-osmanli', label: 'Yeni Çağ\'da Osmanlı Devleti', icon: '🔄', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-tarih/yeni-cagda-osmanli' },
  { id: 'degisen-dunya-osmanli', label: 'Değişen Dünya ve Osmanlı', icon: '🌍', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-tarih/degisen-dunya-osmanli' },
  { id: 'osmanlinin-diplomasi-stratejileri', label: 'Osmanlı\'nın Diplomasi Stratejileri (1774-1914)', icon: '🤝', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-tarih/osmanlinin-diplomasi-stratejileri' },
  { id: 'devrimler-toplumsal-degisim', label: 'Devrimler ve Toplumsal Değişim', icon: '🔄', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-tarih/devrimler-toplumsal-degisim' },
  { id: 'sanayi-ekonomi-calisma-hayati', label: 'Sanayi, Ekonomi ve Çalışma Hayatı', icon: '🏭', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-tarih/sanayi-ekonomi-calisma-hayati' },
  { id: 'modernlesen-hayat', label: 'Modernleşen Hayat (19. ve 20. Yüzyıl)', icon: '🚗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-tarih/modernlesen-hayat' },
  { id: 'osmanli-devleti-dunya-20yuzyil', label: 'Osmanlı Devleti ve Dünya (20. Yüzyıl Başları)', icon: '🌍', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-tarih/osmanli-devleti-dunya-20yuzyil' },
  { id: 'milli-mucadele-kurtulus-savasi', label: 'Milli Mücadele ve Kurtuluş Savaşı', icon: '⚔️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-tarih/milli-mucadele-kurtulus-savasi' },
  { id: 'ataturkculuk-turk-devrimi', label: 'Atatürkçülük ve Türk Devrimi', icon: '⭐', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-tarih/ataturkculuk-turk-devrimi' },
  { id: 'iki-dunya-savasi-arası-donem', label: 'İki Dünya Savaşı Arası Dönem', icon: '⚖️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-tarih/iki-dunya-savasi-arası-donem' },
  { id: 'ikinci-dunya-savasi-sonrasi', label: 'II. Dünya Savaşı ve Sonrası', icon: '💥', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-tarih/ikinci-dunya-savasi-sonrasi' },
  { id: 'soguk-savas-donemi-turkiye', label: 'Soğuk Savaş Dönemi ve Türkiye', icon: '❄️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-tarih/soguk-savas-donemi-turkiye' },
  { id: 'dunyada-turkiyede-toplumsal-devrimler', label: 'Dünyada ve Türkiye\'de Toplumsal Devrimler', icon: '🔄', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-tarih/dunyada-turkiyede-toplumsal-devrimler' },
  { id: 'yirmi-birinci-yuzyila-girerken', label: '21. Yüzyıla Girerken Türkiye ve Dünya', icon: '🌐', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-tarih/yirmi-birinci-yuzyila-girerken' },
];

// AYT Coğrafya Alt Konuları
export const aytCografyaAltKonular: AltKonu[] = [
  { id: 'ekosistem-biyocesitlilik', label: 'Ekosistem ve Biyoçeşitlilik', icon: '🌱', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-cografya/ekosistem-biyocesitlilik' },
  { id: 'enerji-akisi-madde-dongusu', label: 'Enerji Akışı ve Madde Döngüsü', icon: '🔄', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-cografya/enerji-akisi-madde-dongusu' },
  { id: 'ekstrem-doga-olaylari-dogal-afetler', label: 'Ekstrem Doğa Olayları ve Doğal Afetler', icon: '🌊', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-cografya/ekstrem-doga-olaylari-dogal-afetler' },
  { id: 'nufus-politikalari-turkiyede-nufus', label: 'Nüfus Politikaları ve Türkiye\'de Nüfus', icon: '👥', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-cografya/nufus-politikalari-turkiyede-nufus' },
  { id: 'ekonomik-faaliyetler-dogal-kaynaklar', label: 'Ekonomik Faaliyetler ve Doğal Kaynaklar', icon: '💼', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-cografya/ekonomik-faaliyetler-dogal-kaynaklar' },
  { id: 'turkiye-ekonomisi-sektorel-dagilim', label: 'Türkiye Ekonomisi ve Sektörel Dağılım', icon: '📊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-cografya/turkiye-ekonomisi-sektorel-dagilim' },
  { id: 'turkiyede-tarim-hayvancilik', label: 'Türkiyede Tarım ve Hayvancılık', icon: '🚜', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-cografya/turkiyede-tarim-hayvancilik' },
  { id: 'turkiyede-madenler-enerji-kaynaklari', label: 'Türkiyede Madenler ve Enerji Kaynakları', icon: '⛏️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-cografya/turkiyede-madenler-enerji-kaynaklari' },
  { id: 'turkiyede-sanayi', label: 'Türkiyede Sanayi', icon: '🏭', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-cografya/turkiyede-sanayi' },
  { id: 'turkiyede-ulasim-ticaret', label: 'Türkiyede Ulaşım ve Ticaret', icon: '🚢', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-cografya/turkiyede-ulasim-ticaret' },
  { id: 'turkiyede-turizm', label: 'Türkiyede Turizm', icon: '🏖️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-cografya/turkiyede-turizm' },
  { id: 'turkiyenin-bolgesel-kalkinma-projeleri', label: 'Türkiyenin Bölgesel Kalkınma Projeleri ve İşlevsel Bölgeleri', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-cografya/turkiyenin-bolgesel-kalkinma-projeleri' },
  { id: 'ilk-uygarliklar-kultur-bolgeleri-turk-kulturu', label: 'İlk Uygarlıklar, Kültür Bölgeleri ve Türk Kültürü', icon: '🏛️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-cografya/ilk-uygarliklar-kultur-bolgeleri-turk-kulturu' },
  { id: 'jeopolitik-konum-catisma-bolgeleri', label: 'Jeopolitik Konum ve Çatışma Bölgeleri', icon: '🌍', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-cografya/jeopolitik-konum-catisma-bolgeleri' },
  { id: 'kuresel-bolgesel-orgutler', label: 'Küresel ve Bölgesel Örgütler', icon: '🤝', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-cografya/kuresel-bolgesel-orgutler' },
];

// AYT Felsefe Alt Konuları
export const aytFelsefeAltKonular: AltKonu[] = [
  { id: 'ilk-cag-felsefesi', label: 'İlk Çağ Felsefesi', icon: '🏛️', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-felsefe/ilk-cag-felsefesi' },
  { id: 'orta-cag-felsefesi', label: 'Orta Çağ Felsefesi', icon: '⛪', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-felsefe/orta-cag-felsefesi' },
  { id: 'yeni-cag-felsefesi', label: 'Yeni Çağ Felsefesi (15.-17. yy)', icon: '🔄', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-felsefe/yeni-cag-felsefesi' },
  { id: 'aydinlanma-modern-felsefe', label: 'Aydınlanma ve Modern Felsefe (18.-19. yy)', icon: '💡', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-felsefe/aydinlanma-modern-felsefe' },
  { id: 'yirminci-yuzyil-felsefesi', label: '20. Yüzyıl Felsefesi', icon: '📅', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-felsefe/yirminci-yuzyil-felsefesi' },
  { id: 'mantiga-giris', label: 'Mantığa Giriş', icon: '🧠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-felsefe/mantiga-giris' },
  { id: 'klasik-mantik', label: 'Klasik Mantık', icon: '📚', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-felsefe/klasik-mantik' },
  { id: 'mantik-ve-dil', label: 'Mantık ve Dil', icon: '💬', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-felsefe/mantik-ve-dil' },
  { id: 'sembolik-mantik', label: 'Sembolik Mantık', icon: '🔢', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-felsefe/sembolik-mantik' },
  { id: 'psikolojiye-giris', label: 'Psikolojiye Giriş', icon: '🧠', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-felsefe/psikolojiye-giris' },
  { id: 'temel-psikolojik-surecler', label: 'Temel Psikolojik Süreçler', icon: '⚡', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-felsefe/temel-psikolojik-surecler' },
  { id: 'ogrenme-bellek-dusunme', label: 'Öğrenme, Bellek ve Düşünme', icon: '💭', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-felsefe/ogrenme-bellek-dusunme' },
  { id: 'ruh-sagligi', label: 'Ruh Sağlığı', icon: '❤️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-felsefe/ruh-sagligi' },
  { id: 'sosyolojiye-giris', label: 'Sosyolojiye Giriş', icon: '👥', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-felsefe/sosyolojiye-giris' },
  { id: 'birey-ve-toplum', label: 'Birey ve Toplum', icon: '🤝', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-felsefe/birey-ve-toplum' },
  { id: 'toplumsal-yapi-ve-degisim', label: 'Toplumsal Yapı ve Değişim', icon: '🏗️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-felsefe/toplumsal-yapi-ve-degisim' },
  { id: 'kultur-ve-toplumsal-kurumlar', label: 'Kültür ve Toplumsal Kurumlar', icon: '🏛️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-felsefe/kultur-ve-toplumsal-kurumlar' },
];

// AYT Din Alt Konuları
export const aytDinAltKonular: AltKonu[] = [
  { id: 'dunya-ve-ahiret', label: 'Dünya ve Ahiret', icon: '🌍', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-din/dunya-ve-ahiret' },
  { id: 'kurana-gore-hz-muhammed', label: 'Kuran a Göre Hz. Muhammed', icon: '📖', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-din/kurana-gore-hz-muhammed' },
  { id: 'kuranda-bazi-kavramlar', label: 'Kuran da Bazı Kavramlar', icon: '📚', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-din/kuranda-bazi-kavramlar' },
  { id: 'inancla-ilgili-meseleler', label: 'İnançla İlgili Meseleler', icon: '🤔', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-din/inancla-ilgili-meseleler' },
  { id: 'yahudilik-ve-hristiyanlik', label: 'Yahudilik ve Hristiyanlık', icon: '✡️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-din/yahudilik-ve-hristiyanlik' },
  { id: 'islam-ve-bilim', label: 'İslam ve Bilim', icon: '🔬', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-din/islam-ve-bilim' },
  { id: 'anadoluda-islam', label: 'Anadolu da İslam', icon: '🕌', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-din/anadoluda-islam' },
  { id: 'islam-dusuncesinde-tasavvufi-yorumlar', label: 'İslam Düşüncesinde Tasavvufi Yorumlar', icon: '🧘‍♂️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-din/islam-dusuncesinde-tasavvufi-yorumlar' },
  { id: 'guncel-dini-meseleler', label: 'Güncel Dini Meseleler', icon: '📰', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-din/guncel-dini-meseleler' },
  { id: 'hint-ve-cin-dinleri', label: 'Hint ve Çin Dinleri', icon: '🕉️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-din/hint-ve-cin-dinleri' },
];

// AYT Fizik Alt Konuları
export const aytFizikAltKonular: AltKonu[] = [
  { id: 'vektorler', label: 'Vektörler', icon: '➡️', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-fizik/vektorler' },
  { id: 'kuvvet-tork-denge', label: 'Kuvvet, Tork ve Denge', icon: '⚖️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-fizik/kuvvet-tork-denge' },
  { id: 'kutle-merkezi', label: 'Kütle Merkezi', icon: '🎯', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-fizik/kutle-merkezi' },
  { id: 'basit-makineler', label: 'Basit Makineler', icon: '⚙️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-fizik/basit-makineler' },
  { id: 'hareket', label: 'Hareket', icon: '🏃‍♂️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-fizik/hareket' },
  { id: 'newtonun-hareket-yasalari', label: 'Newtonun Hareket Yasaları', icon: '📜', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-fizik/newtonun-hareket-yasalari' },
  { id: 'is-guc-enerji-ayt', label: 'İş, Güç ve Enerji', icon: '💪', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-fizik/is-guc-enerji' },
  { id: 'atislar', label: 'Atışlar', icon: '🎯', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-fizik/atislar' },
  { id: 'itme-momentum', label: 'İtme ve Momentum', icon: '💥', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-fizik/itme-momentum' },
  { id: 'elektrik-alan-potansiyel', label: 'Elektrik Alan ve Potansiyel', icon: '⚡', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-fizik/elektrik-alan-potansiyel' },
  { id: 'paralel-levhalar-siga', label: 'Paralel Levhalar ve Sığa', icon: '🔋', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-fizik/paralel-levhalar-siga' },
  { id: 'manyetik-alan-kuvvet', label: 'Manyetik Alan ve Manyetik Kuvvet', icon: '🧲', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-fizik/manyetik-alan-kuvvet' },
  { id: 'induksiyon-alternatif-akim-transformatörler', label: 'İndüksiyon, Alternatif Akım ve Transformatörler', icon: '🔌', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-fizik/induksiyon-alternatif-akim-transformatörler' },
  { id: 'duzgun-ceembersel-hareket', label: 'Düzgün Çembersel Hareket', icon: '🔄', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-fizik/duzgun-ceembersel-hareket' },
  { id: 'donme-yuvarlanma-acisal-momentum', label: 'Dönme, Yuvarlanma ve Açısal Momentum', icon: '🎡', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-fizik/donme-yuvarlanma-acisal-momentum' },
  { id: 'kutle-cekim-kepler-yasalari', label: 'Kütle Çekim ve Kepler Yasaları', icon: '🌍', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-fizik/kutle-cekim-kepler-yasalari' },
  { id: 'basit-harmonik-hareket', label: 'Basit Harmonik Hareket', icon: '📏', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-fizik/basit-harmonik-hareket' },
  { id: 'dalga-mekanigi', label: 'Dalga Mekaniği', icon: '🌊', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-fizik/dalga-mekanigi' },
  { id: 'atom-fizigine-giris-radyaktivite', label: 'Atom Fiziğine Giriş ve Radyoaktivite', icon: '⚛️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-fizik/atom-fizigine-giris-radyaktivite' },
  { id: 'modern-fizik', label: 'Modern Fizik', icon: '🔬', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-fizik/modern-fizik' },
  { id: 'modern-fizigin-teknolojideki-uygulamalari', label: 'Modern Fiziğin Teknolojideki Uygulamaları', icon: '💻', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-fizik/modern-fizigin-teknolojideki-uygulamalari' },
];

// AYT Kimya Alt Konuları
export const aytKimyaAltKonular: AltKonu[] = [
  { id: 'kimya-bilimi-ayt', label: 'Kimya Bilimi', icon: '🧪', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-kimya/kimya-bilimi' },
  { id: 'atom-periyodik-sistem-ayt', label: 'Atom ve Periyodik Sistem', icon: '⚛️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-kimya/atom-periyodik-sistem' },
  { id: 'kimyasal-turler-etkilesim-ayt', label: 'Kimyasal Türler Arası Etkileşimler', icon: '🔗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-kimya/kimyasal-turler-etkilesim' },
  { id: 'kimyasal-hesaplamalar-ayt', label: 'Kimyasal Hesaplamalar', icon: '🧮', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-kimya/kimyasal-hesaplamalar' },
  { id: 'kimyanin-temel-kanunlari-ayt', label: 'Kimyanın Temel Kanunları', icon: '⚖️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-kimya/kimyanin-temel-kanunlari' },
  { id: 'asit-baz-tuz-ayt', label: 'Asit, Baz ve Tuz', icon: '🧂', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-kimya/asit-baz-tuz' },
  { id: 'maddenin-halleri-ayt', label: 'Maddenin Halleri', icon: '💧', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-kimya/maddenin-halleri' },
  { id: 'karisimlar-ayt', label: 'Karışımlar', icon: '🥤', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-kimya/karisimlar' },
  { id: 'doga-ve-kimya-ayt', label: 'Doğa ve Kimya', icon: '🌿', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-kimya/doga-ve-kimya' },
  { id: 'kimya-her-yerde-ayt', label: 'Kimya Her Yerde', icon: '🌍', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-kimya/kimya-her-yerde' },
  { id: 'modern-atom-teorisi', label: 'Modern Atom Teorisi', icon: '⚛️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-kimya/modern-atom-teorisi' },
  { id: 'gazlar', label: 'Gazlar', icon: '💨', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-kimya/gazlar' },
  { id: 'sivi-cozeltiler-cozunurluk', label: 'Sıvı Çözeltiler ve Çözünürlük', icon: '🧪', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-kimya/sivi-cozeltiler-cozunurluk' },
  { id: 'kimyasal-tepkimelerde-enerji', label: 'Kimyasal Tepkimelerde Enerji', icon: '⚡', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-kimya/kimyasal-tepkimelerde-enerji' },
  { id: 'kimyasal-tepkimelerde-hiz', label: 'Kimyasal Tepkimelerde Hız', icon: '⏱️', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-kimya/kimyasal-tepkimelerde-hiz' },
  { id: 'kimyasal-tepkimelerde-denge', label: 'Kimyasal Tepkimelerde Denge', icon: '⚖️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-kimya/kimyasal-tepkimelerde-denge' },
  { id: 'asit-baz-dengesi', label: 'Asit-Baz Dengesi', icon: '🧪', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-kimya/asit-baz-dengesi' },
  { id: 'cozunurluk-dengesi', label: 'Çözünürlük Dengesi', icon: '💧', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-kimya/cozunurluk-dengesi' },
  { id: 'kimya-ve-elektrik', label: 'Kimya ve Elektrik', icon: '⚡', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-kimya/kimya-ve-elektrik' },
  { id: 'karbon-kimyasina-giris', label: 'Karbon Kimyasına Giriş', icon: '🔗', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-kimya/karbon-kimyasina-giris' },
  { id: 'organik-kimya', label: 'Organik Kimya', icon: '🌱', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-kimya/organik-kimya' },
  { id: 'enerji-kaynaklari-bilimsel-gelismeler', label: 'Enerji Kaynakları ve Bilimsel Gelişmeler', icon: '🔬', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-kimya/enerji-kaynaklari-bilimsel-gelismeler' },
];

// AYT Biyoloji Alt Konuları
export const aytBiyolojiAltKonular: AltKonu[] = [
  { id: 'sinir-sistemi', label: 'Sinir Sistemi', icon: '🧠', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', route: '/ayt-biyoloji/sinir-sistemi' },
  { id: 'endokrin-sistem', label: 'Endokrin Sistem', icon: '⚡', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-biyoloji/endokrin-sistem' },
  { id: 'duyu-organlari', label: 'Duyu Organları', icon: '👁️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-biyoloji/duyu-organlari' },
  { id: 'destek-hareket-sistemi', label: 'Destek ve Hareket Sistemi', icon: '🦴', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-biyoloji/destek-hareket-sistemi' },
  { id: 'sindirim-sistemi', label: 'Sindirim Sistemi', icon: '🍽️', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-biyoloji/sindirim-sistemi' },
  { id: 'dolasim-sistemi', label: 'Dolaşım Sistemi', icon: '❤️', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-biyoloji/dolasim-sistemi' },
  { id: 'solunum-sistemi', label: 'Solunum Sistemi', icon: '🫁', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-biyoloji/solunum-sistemi' },
  { id: 'uriner-sistem', label: 'Üriner Sistem (Boşaltım Sistemi)', icon: '💧', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)', route: '/ayt-biyoloji/uriner-sistem' },
  { id: 'ureme-sistemi-embriyonik-gelisim', label: 'Üreme Sistemi ve Embriyonik Gelişim', icon: '👶', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', route: '/ayt-biyoloji/ureme-sistemi-embriyonik-gelisim' },
  { id: 'komunite-ekolojisi', label: 'Komünite Ekolojisi', icon: '🌱', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', route: '/ayt-biyoloji/komunite-ekolojisi' },
  { id: 'populasyon-ekolojisi', label: 'Popülasyon Ekolojisi', icon: '👥', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', route: '/ayt-biyoloji/populasyon-ekolojisi' },
  { id: 'genden-proteine', label: 'Genden Proteine', icon: '🧬', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', route: '/ayt-biyoloji/genden-proteine' },
  { id: 'canlilarda-enerji-donusumleri', label: 'Canlılarda Enerji Dönüşümleri', icon: '⚡', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)', route: '/ayt-biyoloji/canlilarda-enerji-donusumleri' },
  { id: 'bitki-biyolojisi-ayt', label: 'Bitki Biyolojisi', icon: '🌿', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', route: '/ayt-biyoloji/bitki-biyolojisi' },
  { id: 'canlilar-ve-cevre', label: 'Canlılar ve Çevre', icon: '🌍', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', route: '/ayt-biyoloji/canlilar-ve-cevre' },
];

// Ana alt konular konfigürasyonu
export const altKonularConfig: Record<string, AltKonu[]> = {
  // TYT Dersleri
  'tyt-matematik': tytMatematikAltKonular,
  'tyt-turkce': tytTurkceAltKonular,
  'tyt-tarih': tytTarihAltKonular,
  
  // AYT Dersleri
  'ayt-matematik': aytMatematikAltKonular,
  
  // Diğer dersler için placeholder'lar (gerçek verilerle değiştirilecek)
  'tyt-cografya': tytCografyaAltKonular,
  'tyt-felsefe': tytFelsefeAltKonular,
  'tyt-din': tytDinAltKonular,
  'tyt-fizik': tytFizikAltKonular,
  'tyt-kimya': tytKimyaAltKonular,
  'tyt-biyoloji': tytBiyolojiAltKonular,
  'ayt-fizik': aytFizikAltKonular,
  'ayt-kimya': aytKimyaAltKonular,
  'ayt-biyoloji': aytBiyolojiAltKonular,
  'ayt-edebiyat': aytEdebiyatAltKonular,
  'ayt-cografya': aytCografyaAltKonular,
  'ayt-tarih': aytTarihAltKonular,
  'ayt-din': aytDinAltKonular,
  'ayt-felsefe': aytFelsefeAltKonular,
}; 