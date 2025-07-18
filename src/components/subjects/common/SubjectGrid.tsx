import React from 'react';
import SubjectCard from './SubjectCard';
import SubjectHeader from './SubjectHeader';
import { subjectStyles, themeConfig } from './SubjectStyles';

interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
}

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectClick: (subject: Subject) => void;
  title: string;
  subtitle: string;
  theme: 'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel';
  headerTitle: string;
}

const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  onSubjectClick,
  title,
  subtitle,
  theme,
  headerTitle
}) => {
  // Theme mapping - gelen theme değerini themeConfig anahtarlarına uygun hale getir
  const themeMapping = {
    'tyt': 'tyt',
    'ayt-sayisal': 'aytSayisal',
    'ayt-ea': 'aytEa',
    'ayt-sozel': 'aytSozel'
  };
  
  const mappedTheme = themeMapping[theme] || 'tyt';
  const themeData = themeConfig[mappedTheme as keyof typeof themeConfig];
  
  return (
    <div className="container">
      <SubjectHeader title={headerTitle} />
      
      <div className="card" style={themeData.cardContainer}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ 
            color: themeData.titleColor, 
            fontWeight: 800, 
            fontSize: 28, 
            letterSpacing: 1 
          }}>
            {themeData.emoji} {title}
          </h2>
          <p style={{ color: '#555', fontSize: 16, marginTop: 8 }}>
            {subtitle}
          </p>
        </div>
        
        <div className="category-grid" style={subjectStyles.grid.container}>
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              id={subject.id}
              label={subject.label}
              icon={subject.icon}
              color={subject.color}
              onClick={() => onSubjectClick(subject)}
              index={index}
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
  );
};

export default SubjectGrid; 