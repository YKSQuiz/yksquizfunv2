import React, { useState } from 'react';
import { AutoResizeText } from '../ui';

interface SubjectCardProps {
  id: string;
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
  index: number;
  isAltKonu?: boolean;
  disabled?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  label,
  icon,
  color,
  onClick,
  index,
  isAltKonu = false,
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const animationDelay = (index * 0.09).toFixed(2);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      key={id}
      className={`subject-card ${isLoading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      style={{
        background: color,
        animation: `popIn 0.5s cubic-bezier(0.39, 0.575, 0.56, 1) ${animationDelay}s both`
      }}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`${label} dersini seç`}
      aria-disabled={disabled || isLoading}
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