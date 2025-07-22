import React from 'react';
import { useNavigate } from 'react-router-dom';
import { altKonularConfigNew as altKonularConfig } from '../../../data/subjects';
import { AltKonu } from '../../../data/subjects/types';
import BackButton from '../navigation';
import { GradientBackground } from '../ui';

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
      <GradientBackground variant="subjects" showParticles={true} particleCount={10}>
        <div className="alt-konu-container">
          <BackButton />
          <div className="alt-konu-header">
            <h1 className="alt-konu-title">{subjectName} - Alt Konular</h1>
            <p className="alt-konu-subtitle">
              📚 Bu ders için henüz alt konular eklenmemiş. Yakında bu dersin alt konuları eklenecek!
            </p>
          </div>
        </div>
      </GradientBackground>
    );
  }

  const handleAltKonuClick = (altKonu: AltKonu) => {
    navigate(altKonu.route);
  };

  return (
    <GradientBackground variant="subjects" showParticles={true} particleCount={10}>
      <div className="alt-konu-container">
        <BackButton />
        <div className="alt-konu-header">
          <h1 className="alt-konu-title">{subjectName} - Alt Konular</h1>
          <p className="alt-konu-subtitle">
            📚 Hangi alt konuyu seçmek istersin? Her alt konuda özgün sorular seni bekliyor!
          </p>
        </div>
        
        <div className="alt-konu-grid">
          {altKonular.map((altKonu, index) => (
            <div
              key={altKonu.id}
              className="alt-konu-card"
              onClick={() => handleAltKonuClick(altKonu)}
              style={{
                background: altKonu.color,
                animation: `popIn 0.5s cubic-bezier(0.39, 0.575, 0.56, 1) ${(index * 0.09).toFixed(2)}s both`
              }}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAltKonuClick(altKonu);
              }}
            >
              <div className="alt-konu-icon">
                {altKonu.icon}
              </div>
              <span className="alt-konu-label">
                {altKonu.label}
              </span>
              <span className="alt-konu-shine" />
            </div>
          ))}
        </div>
      </div>
    </GradientBackground>
  );
};

export default AltKonuSelector; 