import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

interface BackButtonProps {
  variant?: 'default' | 'gradient' | 'minimal' | 'floating' | 'neon' | 'glass' | 'modern';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan';
  text?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  variant = 'default',
  size = 'medium',
  color = 'primary',
  text = 'Geri Dön',
  showIcon = true,
  className = '',
  style = {},
  disabled = false
}) => {
  const navigate = useNavigate();

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    outline: 'none',
    ...style
  };

  const sizeStyles = {
    small: { fontSize: '14px', padding: '8px 16px', minHeight: '36px' },
    medium: { fontSize: '16px', padding: '12px 24px', minHeight: '44px' },
    large: { fontSize: '18px', padding: '16px 32px', minHeight: '52px' }
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
    },
    purple: {
      background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(168, 85, 247, 0.3)'
    },
    cyan: {
      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      color: 'white',
      boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)'
    }
  };

  const variantStyles = {
    default: {
      ...colorStyles[color],
      ...sizeStyles[size]
    },
    gradient: {
      ...colorStyles[color],
      ...sizeStyles[size],
      background: `linear-gradient(135deg, ${colorStyles[color].background})`,
      transform: 'translateY(0)',
      '&:hover': {
        transform: 'translateY(-2px) scale(1.05)',
        boxShadow: `0 8px 25px ${colorStyles[color].boxShadow.replace('0.3', '0.4')}`
      }
    },
    minimal: {
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      ...sizeStyles[size],
      '&:hover': {
        background: '#667eea',
        color: 'white',
        transform: 'scale(1.05)'
      }
    },
    floating: {
      ...colorStyles[color],
      ...sizeStyles[size],
      borderRadius: '50px',
      boxShadow: `0 8px 32px ${colorStyles[color].boxShadow}`,
      '&:hover': {
        transform: 'translateY(-4px) scale(1.1)',
        boxShadow: `0 12px 40px ${colorStyles[color].boxShadow.replace('0.3', '0.5')}`
      }
    },
    neon: {
      background: 'transparent',
      color: '#00ff88',
      border: '2px solid #00ff88',
      ...sizeStyles[size],
      boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
      '&:hover': {
        background: '#00ff88',
        color: '#000',
        boxShadow: '0 0 30px rgba(0, 255, 136, 0.8)',
        transform: 'scale(1.05)'
      }
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      ...sizeStyles[size],
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
      }
    },
    modern: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      ...sizeStyles[size],
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      '&:hover': {
        transform: 'translateY(-3px) rotate(-1deg)',
        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
      }
    }
  };

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    opacity: disabled ? 0.6 : 1
  };

  const handleClick = () => {
    if (!disabled) {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={buttonStyles}
      className={`back-button ${variant} ${size} ${color} ${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      aria-label={text}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {showIcon && (
        <span className="back-icon" style={{ fontSize: '1.2em' }}>
          ←
        </span>
      )}
      {text}
      <style>{`
        .back-button {
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .back-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .back-button:hover::before {
          left: 100%;
        }
        
        .back-button:hover:not(.disabled) {
          transform: translateY(-2px) scale(1.05);
        }
        
        .back-button:active:not(.disabled) {
          transform: translateY(0) scale(0.98);
        }
        
        .back-button.floating {
          animation: float 3s ease-in-out infinite;
        }
        
        .back-button.floating:hover {
          animation: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .back-button.gradient:hover:not(.disabled) {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .back-button.minimal:hover:not(.disabled) {
          background: #667eea;
          color: white;
        }
        
        .back-button.neon {
          animation: neon-pulse 2s ease-in-out infinite alternate;
        }
        
        .back-button.neon:hover {
          animation: none;
        }
        
        @keyframes neon-pulse {
          from { box-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
          to { box-shadow: 0 0 30px rgba(0, 255, 136, 0.8); }
        }
        
        .back-button.glass {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .back-button.modern {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .back-icon {
          transition: transform 0.3s ease;
        }
        
        .back-button:hover:not(.disabled) .back-icon {
          transform: translateX(-4px);
        }
        
        .back-button.disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .back-button:focus {
          outline: 2px solid rgba(102, 126, 234, 0.5);
          outline-offset: 2px;
        }
        
        /* Responsive tasarım */
        @media (max-width: 768px) {
          .back-button {
            font-size: 14px !important;
            padding: 10px 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .back-button {
            font-size: 13px !important;
            padding: 8px 16px !important;
            gap: 6px !important;
          }
        }
        
        /* High contrast mode desteği */
        @media (prefers-contrast: high) {
          .back-button {
            border: 2px solid currentColor;
          }
        }
        
        /* Reduced motion desteği */
        @media (prefers-reduced-motion: reduce) {
          .back-button {
            animation: none !important;
            transition: none !important;
          }
          
          .back-button:hover {
            transform: none !important;
          }
        }
      `}</style>
    </button>
  );
};

export default BackButton; 