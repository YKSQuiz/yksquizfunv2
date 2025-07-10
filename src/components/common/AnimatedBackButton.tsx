import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnimatedBackButtonProps {
  variant?: 'slide' | 'bounce' | 'rotate' | 'scale' | 'glow';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  text?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

const AnimatedBackButton: React.FC<AnimatedBackButtonProps> = ({
  variant = 'slide',
  size = 'medium',
  color = 'primary',
  text = 'Geri Dön',
  showIcon = true,
  className = '',
  style = {},
  animationSpeed = 'normal'
}) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate(-1);
      setIsAnimating(false);
    }, 300);
  };

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const sizeStyles = {
    small: { fontSize: '14px', padding: '8px 16px' },
    medium: { fontSize: '16px', padding: '12px 24px' },
    large: { fontSize: '18px', padding: '16px 32px' }
  };

  const colorStyles = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
    },
    secondary: {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(250, 112, 154, 0.3)'
    },
    success: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(67, 233, 123, 0.3)'
    },
    warning: {
      background: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(255, 106, 0, 0.3)'
    },
    danger: {
      background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(255, 65, 108, 0.3)'
    }
  };

  const speedStyles = {
    slow: { transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' },
    normal: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
    fast: { transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }
  };

  const buttonStyles = {
    ...baseStyles,
    ...colorStyles[color],
    ...sizeStyles[size],
    ...speedStyles[animationSpeed]
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'slide':
        return `
          .animated-back-button.slide:hover {
            transform: translateX(-8px) scale(1.05);
          }
          .animated-back-button.slide:hover .back-icon {
            transform: translateX(-8px) rotate(-10deg);
          }
        `;
      case 'bounce':
        return `
          .animated-back-button.bounce:hover {
            animation: bounce 0.6s ease-in-out;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `;
      case 'rotate':
        return `
          .animated-back-button.rotate:hover {
            transform: rotate(-5deg) scale(1.05);
          }
          .animated-back-button.rotate:hover .back-icon {
            transform: rotate(-15deg);
          }
        `;
      case 'scale':
        return `
          .animated-back-button.scale:hover {
            transform: scale(1.1);
          }
          .animated-back-button.scale:active {
            transform: scale(0.95);
          }
        `;
      case 'glow':
        return `
          .animated-back-button.glow:hover {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
            transform: translateY(-2px);
          }
          .animated-back-button.glow::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
          }
          .animated-back-button.glow:hover::before {
            left: 100%;
          }
        `;
      default:
        return '';
    }
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyles}
      className={`animated-back-button ${variant} ${size} ${color} ${className} ${isAnimating ? 'animating' : ''}`}
      disabled={isAnimating}
    >
      {showIcon && (
        <span className="back-icon" style={{ fontSize: '1.2em' }}>
          {isAnimating ? '⏳' : '←'}
        </span>
      )}
      {isAnimating ? 'Yönlendiriliyor...' : text}
      
      <style>{`
        .animated-back-button {
          position: relative;
          overflow: hidden;
        }
        
        .animated-back-button.animating {
          animation: pulse 0.3s ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .back-icon {
          transition: transform 0.3s ease;
        }
        
        ${getVariantStyles()}
        
        .animated-back-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </button>
  );
};

export default AnimatedBackButton; 