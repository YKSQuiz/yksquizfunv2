import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

interface BackButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  text = '← Geri', 
  className = '',
  onClick
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleGoBack();
    }
  };

  return (
    <button 
      className={`back-button ${className}`}
      onClick={handleGoBack}
      onKeyDown={handleKeyDown}
      type="button"
      aria-label="Önceki sayfaya dön"
      title="Önceki sayfaya dön"
    >
      <span className="back-icon">←</span>
      <span className="back-text">{text}</span>
    </button>
  );
};

export default BackButton; 