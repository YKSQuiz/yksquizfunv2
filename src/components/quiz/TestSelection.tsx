import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../common/BackButton';

const TEST_COUNT = 10;

const mainTopicLabels: Record<string, string> = {
  turkce: 'TYT Türkçe',
  tarih: 'TYT Tarih',
  cografya: 'TYT Coğrafya',
  felsefe: 'TYT Felsefe',
  din: 'TYT Din',
  matematik: 'TYT Matematik',
  fizik: 'TYT Fizik',
  kimya: 'TYT Kimya',
  biyoloji: 'TYT Biyoloji',
};

const TestSelection: React.FC = () => {
  const navigate = useNavigate();
  const { subTopic } = useParams();
  const mainTopic = window.location.pathname.split('/')[1];

  if (!mainTopic || !subTopic) {
    return (
      <div className="container">
        <div className="header"><h1>Test Seçimi</h1></div>
        <div className="card">
          <p style={{ color: 'red', fontWeight: 600, fontSize: 18 }}>Hatalı yönlendirme: Lütfen önce bir konu ve alt konu seçin.</p>
        </div>
      </div>
    );
  }

  const handleTestClick = (testNumber: number) => {
    navigate(`/quiz/${mainTopic}/${subTopic}/${testNumber}`);
  };

  const gradients = [
    'linear-gradient(135deg, #00FF66 0%, #33FF33 100%)',
    'linear-gradient(135deg, #33FF33 0%, #66FF00 100%)',
    'linear-gradient(135deg, #66FF00 0%, #99FF00 100%)',
    'linear-gradient(135deg, #99FF00 0%, #CCFF00 100%)',
    'linear-gradient(135deg, #CCFF00 0%, #FFCC00 100%)',
    'linear-gradient(135deg, #FFCC00 0%, #FF9900 100%)',
    'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
    'linear-gradient(135deg, #FF6600 0%, #FF3300 100%)',
    'linear-gradient(135deg, #FF3300 0%, #FF0000 100%)',
    'linear-gradient(135deg, #FF0000 0%, #b80000 100%)',
  ];
  const emojis = [
    '🟢', '😀', '🧩', '📘', '🧠', '🤔', '🔥', '⚡', '🚀', '🏆'
  ];

  return (
    <div className="container">
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackButton 
          variant="gradient"
          color="success"
          size="medium"
          text="Geri Dön"
          showIcon={true}
          style={{ marginRight: '18px' }}
        />
        <h1 style={{ flex: 1, textAlign: 'center', margin: 0 }}>{mainTopicLabels[mainTopic] || mainTopic} - {subTopic.replace(/-/g, ' ')}</h1>
        <div style={{ width: 120 }} />
      </div>
      <div className="card" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)', boxShadow: '0 8px 40px #43e97b22' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#43e97b', fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>🔢 Hangi testi çözmek istersin?</h2>
          <p style={{ color: '#555', fontSize: 16, marginTop: 8 }}>Aşağıdan bir test seçerek başlayabilirsin.</p>
        </div>
        <div className="test-grid">
          {Array.from({ length: TEST_COUNT }, (_, index) => (
            <div
              key={index}
              className="test-card tyt-animated-card"
              style={{ background: gradients[index % gradients.length], animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${(index * 0.09).toFixed(2)}s both` }}
              onClick={() => handleTestClick(index + 1)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleTestClick(index + 1); }}
            >
              <span className="test-emoji" aria-label="emoji" role="img">{emojis[index % emojis.length]}</span>
              <span className="test-label">Test {index + 1}</span>
              <span className="tyt-shine" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.7) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            padding: 20px;
          }
          .test-card {
            font-weight: 700;
            font-size: 20px;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100px;
            cursor: pointer;
            transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            position: relative;
            overflow: hidden;
          }
          .test-emoji {
            font-size: 2.1rem;
            margin-right: 12px;
            display: inline-block;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TestSelection; 