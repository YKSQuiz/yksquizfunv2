import React from 'react';
import SubjectGrid from './SubjectGrid';
import { subjectsConfig } from '../../data/subjects';

interface SubjectSelectorProps {
  examType: 'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel';
  onSubjectSelect?: (subjectId: string) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  examType
}) => {
  const subjectCategory = subjectsConfig[examType];
  const subjects = subjectCategory?.subjects || [];

  // const handleSubjectClick = (subjectId: string) => {
  //   if (onSubjectSelect) {
  //     onSubjectSelect(subjectId);
  //   }
  // };

  return (
    <SubjectGrid
      subjects={subjects}
      title={subjectCategory?.title || `${examType.toUpperCase()} Dersleri`}
      subtitle={subjectCategory?.subtitle || `${examType.toUpperCase()} sınavına hazırlanmak için ders seçin`}
    />
  );
};

export default SubjectSelector; 