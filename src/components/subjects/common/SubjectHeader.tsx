import React from 'react';
import BackButton from '../../common/BackButton';
import { subjectStyles } from './SubjectStyles';

interface SubjectHeaderProps {
  title: string;
  backButtonText?: string;
  backButtonVariant?: 'default' | 'gradient' | 'minimal' | 'floating' | 'neon' | 'glass' | 'modern';
  backButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan';
  backButtonSize?: 'small' | 'medium' | 'large';
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  title,
  backButtonText = 'Geri Dön',
  backButtonVariant = 'modern',
  backButtonColor = 'purple',
  backButtonSize = 'medium'
}) => {
  return (
    <div className="header" style={subjectStyles.header.container}>
      <BackButton 
        variant={backButtonVariant}
        color={backButtonColor}
        size={backButtonSize}
        text={backButtonText}
        showIcon={true}
        style={{ marginRight: '18px' }}
      />
      <h1 style={subjectStyles.header.title}>{title}</h1>
      <div style={subjectStyles.header.spacer} />
    </div>
  );
};

export default SubjectHeader; 