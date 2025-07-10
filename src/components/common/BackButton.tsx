import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  variant?: 'default' | 'gradient' | 'minimal' | 'floating';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  text?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({
  variant = 'default',
  size = 'medium',
  color = 'primary',
  text = 'Geri Dön',
  showIcon = true,
  className = '',
  style = {}
}) => {
  const navigate = useNavigate();

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    }
  };

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant]
  };

  return (
    <button
      onClick={() => navigate(-1)}
      style={buttonStyles}
      className={`back-button ${variant} ${size} ${color} ${className}`}
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
        
        .back-button:hover {
          transform: translateY(-2px) scale(1.05);
        }
        
        .back-button:active {
          transform: translateY(0) scale(0.98);
        }
        
        .back-button.floating {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .back-button.gradient:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .back-button.minimal:hover {
          background: #667eea;
          color: white;
        }
        
        .back-icon {
          transition: transform 0.3s ease;
        }
        
        .back-button:hover .back-icon {
          transform: translateX(-4px);
        }
      `}</style>
    </button>
  );
};

export default BackButton; 