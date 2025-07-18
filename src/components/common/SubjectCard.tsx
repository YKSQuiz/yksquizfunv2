import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectStyles.css';

interface SubjectCardProps {
  id: string;
  label: string;
  icon: string;
  color: string;
  route: string;
  description?: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  label,
  icon,
  color,
  route,
  description
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      className="subject-card"
      onClick={handleClick}
      style={{ background: color }}
    >
      <div className="subject-icon">{icon}</div>
      <div className="subject-content">
        <h3 className="subject-title">{label}</h3>
        {description && (
          <p className="subject-description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SubjectCard; 