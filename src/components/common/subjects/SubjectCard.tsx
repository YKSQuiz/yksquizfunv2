import React from 'react';
import { AutoResizeText } from '../ui';

interface SubjectCardProps {
  id: string;
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
  index: number;
  isAltKonu?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  label,
  icon,
  color,
  onClick,
  index,
  isAltKonu = false
}) => {
  const animationDelay = (index * 0.09).toFixed(2);

  return (
    <div
      key={id}
      className="subject-card"
      onClick={onClick}
      style={{
        background: color,
        animation: `popIn 0.5s cubic-bezier(0.39, 0.575, 0.56, 1) ${animationDelay}s both`
      }}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div 
        className={`subject-icon ${isAltKonu ? 'alt-konu' : ''}`}
      >
        {icon}
      </div>
      
      {isAltKonu ? (
        <AutoResizeText text={label} />
      ) : (
        <span className="subject-label">
          {label}
        </span>
      )}
      
      <span className="subject-shine" />
    </div>
  );
};

export default SubjectCard; 