import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SmartBackButtonProps {
  fallbackPath?: string;
  variant?: 'default' | 'gradient' | 'minimal' | 'floating';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  text?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
  enableHistory?: boolean;
}

const SmartBackButton: React.FC<SmartBackButtonProps> = ({
  fallbackPath = '/',
  variant = 'default',
  size = 'medium',
  color = 'primary',
  text = 'Geri Dön',
  showIcon = true,
  className = '',
  style = {},
  enableHistory = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Tarayıcı geçmişini kontrol et
    setCanGoBack(window.history.length > 1);
  }, [location]);

  const handleBackClick = () => {
    setIsAnimating(true);
    
    // Animasyon süresi
    setTimeout(() => {
      if (canGoBack && enableHistory) {
        navigate(-1);
      } else {
        navigate(fallbackPath);
      }
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    opacity: canGoBack ? 1 : 0.7,
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

  const buttonStyles = {
    ...baseStyles,
    ...colorStyles[color],
    ...sizeStyles[size],
    transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
  };

  return (
    <button
      onClick={handleBackClick}
      style={buttonStyles}
      className={`smart-back-button ${variant} ${size} ${color} ${className} ${isAnimating ? 'animating' : ''}`}
      disabled={isAnimating}
    >
      {showIcon && (
        <span className="back-icon" style={{ fontSize: '1.2em' }}>
          {isAnimating ? '⏳' : '←'}
        </span>
      )}
      {isAnimating ? 'Yönlendiriliyor...' : text}
      
      <style>{`
        .smart-back-button {
          position: relative;
          overflow: hidden;
        }
        
        .smart-back-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .smart-back-button:hover::before {
          left: 100%;
        }
        
        .smart-back-button:hover:not(.animating) {
          transform: translateY(-2px) scale(1.05);
        }
        
        .smart-back-button:active:not(.animating) {
          transform: translateY(0) scale(0.98);
        }
        
        .smart-back-button.animating {
          animation: pulse 0.3s ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .smart-back-button.floating {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        .smart-back-button.gradient:hover:not(.animating) {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .smart-back-button.minimal {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }
        
        .smart-back-button.minimal:hover:not(.animating) {
          background: #667eea;
          color: white;
        }
        
        .back-icon {
          transition: transform 0.3s ease;
        }
        
        .smart-back-button:hover:not(.animating) .back-icon {
          transform: translateX(-4px);
        }
        
        .smart-back-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </button>
  );
};

export default SmartBackButton; 