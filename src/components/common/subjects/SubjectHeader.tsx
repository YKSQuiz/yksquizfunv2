import React from 'react';

interface SubjectHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  title,
  subtitle,
  icon
}) => {
  return (
    <div className="subject-header">
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