import React from 'react';
import SubjectCard from './SubjectCard';
import BackButton from '../BackButton';

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
  theme?: string;
  headerTitle?: string;
}

const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  title,
  subtitle,
  onSubjectClick
}) => {
  return (
    <div className="subject-grid-container">
      <BackButton />
      
      {title && (
        <div className="subject-grid-header">
          <h2 className="subject-grid-title">{title}</h2>
          {subtitle && (
            <p className="subject-grid-subtitle">{subtitle}</p>
          )}
        </div>
      )}
      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            label={subject.label}
            icon={subject.icon}
            color={subject.color}
            onClick={() => {
              if (onSubjectClick) {
                onSubjectClick(subject);
              } else {
                // Navigate to route
                window.location.href = subject.route;
              }
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectGrid; 