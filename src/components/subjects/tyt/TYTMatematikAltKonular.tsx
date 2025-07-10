import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../common/BackButton';

const matematikAltKonular = [
  { id: 'temel-kavramlar', label: 'Temel Kavramlar', icon: '🔢', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'sayi-basamaklari', label: 'Sayı Basamakları', icon: '🔢', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'bolme-bolunebilme', label: 'Bölme ve Bölünebilme', icon: '➗', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'ebob-ekok', label: 'EBOB – EKOK', icon: '🔗', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'rasyonel-sayilar', label: 'Rasyonel Sayılar', icon: '🧮', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'basit-esitsizlikler', label: 'Basit Eşitsizlikler', icon: '≠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'mutlak-deger', label: 'Mutlak Değer', icon: '➖', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'uslu-sayilar', label: 'Üslü Sayılar', icon: '🔼', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'koklu-sayilar', label: 'Köklü Sayılar', icon: '√', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'carpanlara-ayirma', label: 'Çarpanlara Ayırma', icon: '✖️', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'oran-oranti', label: 'Oran Orantı', icon: '⚖️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'denklem-cozme', label: 'Denklem Çözme', icon: '🧩', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'sayi-problemleri', label: 'Sayı Problemleri', icon: '❓', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'kesir-problemleri', label: 'Kesir Problemleri', icon: '🧃', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'yas-problemleri', label: 'Yaş Problemleri', icon: '🎂', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'hareket-hiz-problemleri', label: 'Hareket Hız Problemleri', icon: '🏃‍♂️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'isci-emek-problemleri', label: 'İşçi Emek Problemleri', icon: '👷‍♂️', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'yuzde-problemleri', label: 'Yüzde Problemleri', icon: '💯', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'kar-zarar-problemleri', label: 'Kar Zarar Problemleri', icon: '📈', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'karisim-problemleri', label: 'Karışım Problemleri', icon: '🥤', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'grafik-problemleri', label: 'Grafik Problemleri', icon: '📊', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'rutin-olmayan-problemler', label: 'Rutin Olmayan Problemler', icon: '🧠', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'kume-kartezyen', label: 'Kümeler – Kartezyen Çarpım', icon: '🔗', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'mantik', label: 'Mantık', icon: '🤔', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'fonksiyonlar', label: 'Fonksiyonlar', icon: '📈', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'polinomlar', label: 'Polinomlar', icon: '🧮', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'ikinci-derece-denklem', label: '2. Dereceden Denklemler', icon: '2️⃣', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'permutasyon-kombinasyon', label: 'Permütasyon ve Kombinasyon', icon: '🔄', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'olasilik', label: 'Olasılık', icon: '🎲', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'veri-istatistik', label: 'Veri – İstatistik', icon: '📊', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
];

// Otomatik font küçültme bileşeni (daha öncekiyle aynı)
const AutoResizeText: React.FC<{children: string, maxFont?: number, minFont?: number, style?: React.CSSProperties}> = ({children, maxFont = 17, minFont = 10, style}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFont);

  useEffect(() => {
    if (!spanRef.current || !containerRef.current) return;
    let currentFont = maxFont;
    spanRef.current.style.fontSize = currentFont + 'px';
    let fits = spanRef.current.scrollHeight <= containerRef.current.offsetHeight && spanRef.current.scrollWidth <= containerRef.current.offsetWidth;
    while (!fits && currentFont > minFont) {
      currentFont -= 1;
      spanRef.current.style.fontSize = currentFont + 'px';
      fits = spanRef.current.scrollHeight <= containerRef.current.offsetHeight && spanRef.current.scrollWidth <= containerRef.current.offsetWidth;
    }
    setFontSize(currentFont);
  }, [children, maxFont, minFont]);

  return (
    <div ref={containerRef} style={{width: '100%', height: '2.8em', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style, overflow: 'hidden'}}>
      <span ref={spanRef} style={{fontSize, fontWeight: 700, lineHeight: 1.22, width: '100%', textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal', display: 'block'}}>{children}</span>
    </div>
  );
};

const TYTMatematikAltKonular: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton 
          variant="gradient"
          color="primary"
          size="medium"
          text="Geri Dön"
          showIcon={true}
          style={{ marginRight: '18px' }}
        />
        <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>TYT Matematik - Alt Konular</h1>
        <div style={{ width: 120 }} />
      </div>
      <div className="card" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', boxShadow: '0 8px 40px #fa709a22' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#fa709a', fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>➗ Hangi alt konuyu seçmek istersin?</h2>
          <p style={{ color: '#555', fontSize: 16, marginTop: 8 }}>Her alt konuda özgün sorular seni bekliyor!</p>
        </div>
        <div className="category-grid" style={{ margin: '40px 0 20px 0' }}>
          {matematikAltKonular.map((subj, i) => (
            <div
              key={subj.id}
              className="category-card tyt-animated-card"
              onClick={() => navigate(`/matematik/${subj.id}`)}
              style={{
                background: subj.color,
                color: 'white',
                fontWeight: 700,
                cursor: 'pointer',
                userSelect: 'none',
                minHeight: 110,
                height: 110,
                width: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 24px #0002',
                border: 'none',
                transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
                animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${(i * 0.07).toFixed(2)}s both`,
                textAlign: 'center',
                padding: '0 8px'
              }}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') navigate(`/matematik/${subj.id}`); }}
            >
              <div className="tyt-animated-icon" style={{ fontSize: 32, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>{subj.icon}</div>
              <AutoResizeText>{subj.label}</AutoResizeText>
              <span className="tyt-shine" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.7) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .tyt-animated-card, .category-card {
            position: relative;
            overflow: hidden;
            padding: 0 14px;
            min-width: 160px;
            max-width: 220px;
            white-space: normal;
            word-break: break-word;
            text-align: center;
            height: 110px;
            width: 220px;
            font-size: 16px;
            line-height: 1.2;
          }
          .tyt-animated-card:hover, .tyt-animated-card:focus {
            filter: brightness(1.13) saturate(1.15);
            transform: scale(1.06) rotate(-1deg);
            box-shadow: 0 12px 36px #0003, 0 0 0 4px #fff4;
            z-index: 2;
          }
          .tyt-animated-card:active {
            filter: brightness(1.22) saturate(1.2);
            transform: scale(0.97) rotate(1deg);
            box-shadow: 0 2px 8px #0002;
          }
          .tyt-animated-card:hover .tyt-animated-icon {
            animation: tyt-icon-spin 0.7s cubic-bezier(.39,.575,.56,1.000);
          }
          @keyframes tyt-icon-spin {
            0% { transform: rotate(0deg) scale(1); }
            60% { transform: rotate(18deg) scale(1.18); }
            100% { transform: rotate(0deg) scale(1); }
          }
          .tyt-shine {
            content: '';
            position: absolute;
            top: -60%;
            left: -60%;
            width: 220%;
            height: 220%;
            background: linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.01) 60%);
            transform: rotate(25deg);
            pointer-events: none;
            z-index: 1;
            animation: tyt-shine-move 2.2s linear infinite;
          }
          @keyframes tyt-shine-move {
            0% { left: -60%; top: -60%; }
            100% { left: 100%; top: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TYTMatematikAltKonular; 