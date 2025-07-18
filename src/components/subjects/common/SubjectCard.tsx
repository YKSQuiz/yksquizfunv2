import React from 'react';
import { subjectStyles, subjectClasses } from './SubjectStyles';
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
  const iconStyle = isAltKonu ? subjectStyles.icon.altKonu : subjectStyles.icon.base;
  const animationDelay = (index * 0.07).toFixed(2);

  return (
    <div
      key={id}
      className={`category-card ${subjectClasses.animatedCard}`}
      onClick={onClick}
      style={{
        ...subjectStyles.card.base,
        background: color,
        animation: `popIn 0.5s cubic-bezier(.39,.575,.56,1.000) ${animationDelay}s both`
      }}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div 
        className={subjectClasses.animatedIcon} 
        style={iconStyle}
      >
        {icon}
      </div>
      
      {isAltKonu ? (
        <AutoResizeText>{label}</AutoResizeText>
      ) : (
        <span style={{ fontSize: 20 }}>{label}</span>
      )}
      
      <span className={subjectClasses.shine} />
    </div>
  );
};

export default SubjectCard; 