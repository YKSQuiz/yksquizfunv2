import React from 'react';
import SubjectCard from './SubjectCard';
import './SubjectStyles.css';

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
}

const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  title,
  subtitle
}) => {
  return (
    <div className="subject-grid-container">
      {title && (
        <div className="subject-grid-header">
          <h2 className="subject-grid-title">{title}</h2>
          {subtitle && (
            <p className="subject-grid-subtitle">{subtitle}</p>
          )}
        </div>
      )}
      <div className="subject-grid">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            label={subject.label}
            icon={subject.icon}
            color={subject.color}
            route={subject.route}
            description={subject.description || undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectGrid; 