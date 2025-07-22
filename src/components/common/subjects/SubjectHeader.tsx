import React from 'react';
import BackButton from '../navigation';

interface SubjectHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onBack?: () => void;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  title,
  subtitle,
  icon,
  onBack
}) => {
  return (
    <div className="subject-header">
      {onBack && <BackButton />}
      <div className="subject-header-content">
        {icon && <div className="subject-header-icon">{icon}</div>}
        <div className="subject-header-text">
          <h1 className="subject-header-title">{title}</h1>
          {subtitle && (
            <p className="subject-header-subtitle">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectHeader; 