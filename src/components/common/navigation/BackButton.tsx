import React, { useCallback, useMemo, memo } from 'react';
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
  onClick?: () => void;
  fallbackPath?: string;
}

// Sabit stiller - component dışına taşındı
const SIZE_STYLES = {
  small: { fontSize: '14px', padding: '8px 16px', minHeight: '36px' },
  medium: { fontSize: '16px', padding: '12px 24px', minHeight: '44px' },
  large: { fontSize: '18px', padding: '16px 32px', minHeight: '52px' }
} as const;

const COLOR_STYLES = {
  primary: {
    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #6366f1 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)'
  },
  secondary: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(250, 112, 154, 0.3)'
  },
  success: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(67, 233, 123, 0.3)'
  },
  warning: {
    background: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(255, 106, 0, 0.3)'
  },
  danger: {
    background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(255, 65, 108, 0.3)'
  },
  purple: {
    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)'
  },
  cyan: {
    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
  }
} as const;

const BackButton: React.FC<BackButtonProps> = memo(({
  variant = 'default',
  size = 'medium',
  color = 'primary',
  text = 'Geri Dön',
  showIcon = true,
  className = '',
  style = {},
  disabled = false,
  onClick,
  fallbackPath
}) => {
  const navigate = useNavigate();

  // Base stiller - useMemo ile optimize edildi
  const baseStyles = useMemo((): React.CSSProperties => {
    const { border, ...restStyle } = style || {};
    
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderRadius: '16px',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none',
      outline: 'none',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      letterSpacing: '0.3px',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      border: border || '1px solid rgba(255, 255, 255, 0.15)',
      ...restStyle
    };
  }, [disabled, style]);

  // Variant stilleri - useMemo ile optimize edildi
  const variantStyles = useMemo(() => {
    const colorStyle = COLOR_STYLES[color];
    const sizeStyle = SIZE_STYLES[size];

    const variants = {
      default: {
        ...colorStyle,
        ...sizeStyle
      },
      gradient: {
        ...colorStyle,
        ...sizeStyle,
        transform: 'translateY(0)',
        '&:hover': {
          transform: 'translateY(-3px) scale(1.05)',
          boxShadow: `0 8px 30px ${colorStyle.boxShadow.replace('0.3', '0.4')}`
        }
      },
      minimal: {
        background: 'transparent',
        color: '#a855f7',
        border: '2px solid #a855f7',
        ...sizeStyle,
        '&:hover': {
          background: '#a855f7',
          color: 'white',
          transform: 'scale(1.05)'
        }
      },
      floating: {
        ...colorStyle,
        ...sizeStyle,
        borderRadius: '50px',
        boxShadow: `0 8px 32px ${colorStyle.boxShadow}`,
        animation: 'float 3s ease-in-out infinite',
        '&:hover': {
          animation: 'none',
          transform: 'translateY(-4px) scale(1.1)',
          boxShadow: `0 12px 40px ${colorStyle.boxShadow.replace('0.3', '0.5')}`
        }
      },
      neon: {
        background: 'transparent',
        color: '#00ff88',
        border: '2px solid #00ff88',
        ...sizeStyle,
        boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
        animation: 'neon-pulse 2s ease-in-out infinite alternate',
        '&:hover': {
          animation: 'none',
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
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        ...sizeStyle,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.2)',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
        }
      },
      modern: {
        ...colorStyle,
        ...sizeStyle,
        borderRadius: '16px',
        boxShadow: `0 8px 32px ${colorStyle.boxShadow}`,
        '&:hover': {
          transform: 'translateY(-3px) rotate(-1deg)',
          boxShadow: `0 12px 40px ${colorStyle.boxShadow.replace('0.3', '0.4')}`
        }
      }
    };

    return variants[variant];
  }, [variant, color, size]);

  // Button stilleri - useMemo ile optimize edildi
  const buttonStyles = useMemo(() => ({
    ...baseStyles,
    ...variantStyles,
    opacity: disabled ? 0.6 : 1
  }), [baseStyles, variantStyles, disabled]);

  // Click handler - useCallback ile optimize edildi
  const handleClick = useCallback(() => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    } else if (fallbackPath) {
      navigate(fallbackPath);
    } else {
      navigate(-1);
    }
  }, [disabled, onClick, navigate, fallbackPath]);

  // Keyboard handler - useCallback ile optimize edildi
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick, disabled]);

  // CSS sınıfları - useMemo ile optimize edildi
  const buttonClasses = useMemo(() => [
    'back-button',
    `back-button-${variant}`,
    `back-button-${size}`,
    `back-button-${color}`,
    disabled ? 'back-button-disabled' : '',
    className
  ].filter(Boolean).join(' '), [variant, size, color, disabled, className]);

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={buttonStyles}
      className={buttonClasses}
      disabled={disabled}
      aria-label={text}
      title={text}
      tabIndex={disabled ? -1 : 0}
      type="button"
    >
      {showIcon && (
        <span className="back-icon" style={{ fontSize: '1.2em' }} aria-hidden="true">
          ←
        </span>
      )}
      <span className="back-text">{text}</span>
    </button>
  );
});

BackButton.displayName = 'BackButton';

export default BackButton; 