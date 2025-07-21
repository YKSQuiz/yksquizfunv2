import React from 'react';
import { subjectClasses } from './SubjectStyles';
import AutoResizeText from './AutoResizeText';

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
      className={`category-card ${subjectClasses.animatedCard}`}
      onClick={onClick}
      style={{
        background: color,
        animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${animationDelay}s both`,
        position: 'relative',
        borderRadius: '15px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        transition: 'transform 0.18s, box-shadow 0.18s, filter 0.18s',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'center',
        color: 'white',
        fontWeight: 700,
        userSelect: 'none'
      }}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div 
        className={subjectClasses.animatedIcon} 
        style={{
          fontSize: isAltKonu ? 32 : 38,
          marginBottom: 10,
          filter: 'drop-shadow(0 2px 8px #fff8)',
          transition: 'transform 0.2s ease'
        }}
      >
        {icon}
      </div>
      
      {isAltKonu ? (
        <AutoResizeText>{label}</AutoResizeText>
      ) : (
        <span style={{ 
          fontSize: 20,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          lineHeight: 1.2
        }}>
          {label}
        </span>
      )}
      
      <span className={subjectClasses.shine} />
    </div>
  );
};

export default SubjectCard; 