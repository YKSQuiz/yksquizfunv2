import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectCard, SubjectHeader, subjectStyles, themeConfig } from './common';
import { altKonularConfig, AltKonu } from '../../data/subjects/altKonularConfig';
import './AltKonuSelector.css';

interface AltKonuSelectorProps {
  subjectId: string;
  subjectName: string;
}

const AltKonuSelector: React.FC<AltKonuSelectorProps> = ({ subjectId, subjectName }) => {
  const navigate = useNavigate();
  
  // Alt konuları konfigürasyondan al
  const altKonular = altKonularConfig[subjectId];
  
  if (!altKonular || altKonular.length === 0) {
    return (
      <div className="alt-konu-selection-container">
        <div className="particle-background">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="particle" style={{ top: `${Math.random() * 100}%` }}></div>
          ))}
        </div>

        <div className="alt-konu-selection-content">
          <SubjectHeader title={`${subjectName} - Alt Konular`} />
          <div className="card">
            <div className="alt-konu-selection-header">
              <h2 className="alt-konu-selection-title">
                📚 Bu ders için henüz alt konular eklenmemiş
              </h2>
              <p className="alt-konu-selection-subtitle">
                Yakında bu dersin alt konuları eklenecek!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAltKonuClick = (altKonu: AltKonu) => {
    navigate(altKonu.route);
  };

  // Tema belirleme (subjectId'ye göre)
  const getTheme = (): 'tyt' | 'aytSayisal' | 'aytEa' | 'aytSozel' => {
    if (subjectId.startsWith('tyt-')) return 'tyt';
    if (subjectId.startsWith('ayt-')) {
      // AYT derslerinin hangi kategoride olduğunu belirle
      const aytSubjects: Record<string, 'aytSayisal' | 'aytEa' | 'aytSozel'> = {
        'ayt-matematik': 'aytSayisal',
        'ayt-fizik': 'aytSayisal',
        'ayt-kimya': 'aytSayisal',
        'ayt-biyoloji': 'aytSayisal',
        'ayt-edebiyat': 'aytEa',
        'ayt-tarih': 'aytEa',
        'ayt-cografya': 'aytEa',
        'ayt-din': 'aytSozel',
        'ayt-felsefe': 'aytSozel'
      };
      return aytSubjects[subjectId] || 'aytSayisal';
    }
    return 'tyt';
  };

  const theme = getTheme();
  const themeData = themeConfig[theme];

  return (
    <div className="alt-konu-selection-container">
      {/* Particle Background */}
      <div className="particle-background">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="particle" style={{ top: `${Math.random() * 100}%` }}></div>
        ))}
      </div>

      <div className="alt-konu-selection-content">
        <SubjectHeader title={`${subjectName} - Alt Konular`} />
        
        <div className="card">
          <div className="alt-konu-selection-header">
            <h2 className="alt-konu-selection-title">
              📚 Hangi alt konuyu seçmek istersin?
            </h2>
            <p className="alt-konu-selection-subtitle">
              Her alt konuda özgün sorular seni bekliyor!
            </p>
          </div>
          
          <div className="category-grid">
            {altKonular.map((altKonu, index) => (
              <SubjectCard
                key={altKonu.id}
                id={altKonu.id}
                label={altKonu.label}
                icon={altKonu.icon}
                color={altKonu.color}
                onClick={() => handleAltKonuClick(altKonu)}
                index={index}
                isAltKonu={true}
              />
            ))}
          </div>
          
          <style>{`
            ${subjectStyles.animations.popIn}
            ${subjectStyles.animations.iconSpin}
            ${subjectStyles.animations.shineMove}
            
            .tyt-animated-card {
              position: relative;
              overflow: hidden;
            }
            
            .tyt-animated-card:hover, 
            .tyt-animated-card:focus {
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
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default AltKonuSelector; 