import React, { useCallback, useMemo } from 'react';
import SubjectCard from './SubjectCard';
import SubjectHeader from './SubjectHeader';
import { GradientBackground } from '../ui';

interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
  description?: string;
}

interface SubjectGridProps {
  subjects: Subject[];
  title?: string;
  subtitle?: string;
  onSubjectClick?: (subject: Subject) => void;
}

const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  title,
  subtitle,
  onSubjectClick
}) => {
  const defaultTitle = useMemo(() => title || "Dersler", [title]);
  const defaultSubtitle = useMemo(() => subtitle || "Alt konuları asd başlayabilirsin", [subtitle]);

  const handleSubjectClick = useCallback((subject: Subject) => {
    if (onSubjectClick) {
      onSubjectClick(subject);
    } else {
      // Navigate to route
      window.location.href = subject.route;
    }
  }, [onSubjectClick]);

  return (
    <GradientBackground variant="subjects" showParticles={true} particleCount={7}>
      <div className="subject-grid-container">
        {/* Header */}
        <SubjectHeader 
          title={defaultTitle}
          subtitle={defaultSubtitle}
        />
        
        <div className="subject-grid-header">
          <h1 className="subject-grid-title">Çalışma Alanını Seç</h1>
          <p className="subject-grid-subtitle">Dersi seçip alt konularını çözerek XP ve Coin kazanabilirsin</p>
        </div>
        
        <div className="subject-grid">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              label={subject.label}
              icon={subject.icon}
              color={subject.color}
              onClick={() => handleSubjectClick(subject)}
              index={index}
            />
          ))}
        </div>
      </div>
    </GradientBackground>
  );
};

export default SubjectGrid; 