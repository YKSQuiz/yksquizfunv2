import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../common/BackButton';

const cografyaAltKonular = [
  { id: 'ekosistem-biyoceşitlilik', label: 'Ekosistem ve Biyoçeşitlilik', icon: '🌱', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'enerji-madde-dongusu', label: 'Enerji Akışı ve Madde Döngüsü', icon: '🔄', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'dogal-afetler', label: 'Ekstrem Doğa Olayları ve Doğal Afetler', icon: '🌪️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'nufus-politikalari', label: "Nüfus Politikaları ve Türkiye'de Nüfus", icon: '👥', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'ekonomik-faaliyetler', label: 'Ekonomik Faaliyetler ve Doğal Kaynaklar', icon: '🏭', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'turkiye-ekonomisi', label: 'Türkiye Ekonomisi ve Sektörel Dağılım', icon: '💹', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'tarim-hayvancilik', label: 'Türkiyede Tarım ve Hayvancılık', icon: '🌾', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { id: 'madenler-enerji', label: 'Türkiyede Madenler ve Enerji Kaynakları', icon: '⛏️', color: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
  { id: 'sanayi', label: 'Türkiyede Sanayi', icon: '🏭', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'ulasim-ticaret', label: "Türkiyede Ulaşım ve Ticaret", icon: '🚚', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 'turizm', label: "Türkiyede Turizm", icon: '🏖️', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 'bolgesel-kalkinma', label: 'Türkiyenin Bölgesel Kalkınma Projeleri ve İşlevsel Bölgeleri', icon: '🗺️', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'ilk-uygarliklar', label: 'İlk Uygarlıklar, Kültür Bölgeleri ve Türk Kültürü', icon: '🏺', color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
  { id: 'jeopolitik', label: 'Jeopolitik Konum ve Çatışma Bölgeleri', icon: '🌍', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'orgutler', label: 'Küresel ve Bölgesel Örgütler', icon: '🌐', color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
];

const AYTCografyaAltKonular: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton 
          variant="gradient"
          color="secondary"
          size="medium"
          text="Geri Dön"
          showIcon={true}
          style={{ marginRight: '18px' }}
        />
        <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>AYT Coğrafya - Alt Konular</h1>
        <div style={{ width: 120 }} />
      </div>
      <div className="card" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', boxShadow: '0 8px 40px #30cfd022' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#30cfd0', fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>🗺️ Hangi alt konuyu seçmek istersin?</h2>
          <p style={{ color: '#555', fontSize: 16, marginTop: 8 }}>Her alt konuda özgün sorular seni bekliyor!</p>
        </div>
        <div className="category-grid" style={{ margin: '40px 0 20px 0' }}>
          {cografyaAltKonular.map((subj, i) => (
            <div
              key={subj.id}
              className="category-card tyt-animated-card"
              onClick={() => navigate(`/ayt-cografya/${subj.id}`)}
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
              onKeyDown={e => { if (e.key === 'Enter') navigate(`/ayt-cografya/${subj.id}`); }}
            >
              <div className="tyt-animated-icon" style={{ fontSize: 32, marginBottom: 10, filter: 'drop-shadow(0 2px 8px #fff8)' }}>{subj.icon}</div>
              {subj.label}
              <span className="tyt-shine" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.7) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .category-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .tyt-animated-card {
            position: relative;
            overflow: hidden;
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

export default AYTCografyaAltKonular; 