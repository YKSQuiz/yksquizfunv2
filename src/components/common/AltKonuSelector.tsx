import React from 'react';
import SubjectGrid from './SubjectGrid';
import SubjectHeader from './SubjectHeader';
import { altKonularConfig } from '../../data/subjects/altKonularConfig';

interface AltKonuSelectorProps {
  subjectId: string;
  onAltKonuSelect?: (altKonuId: string) => void;
}

const AltKonuSelector: React.FC<AltKonuSelectorProps> = ({
  subjectId,
  onAltKonuSelect
}) => {
  const altKonular = altKonularConfig[subjectId] || [];

  const handleAltKonuClick = (altKonuId: string) => {
    if (onAltKonuSelect) {
      onAltKonuSelect(altKonuId);
    }
  };

  // Ders adını subjectId'den çıkar
  const getSubjectName = (id: string) => {
    const parts = id.split('-');
    if (parts.length >= 2) {
      const examType = parts[0].toUpperCase();
      const subjectName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      return `${examType} ${subjectName}`;
    }
    return id;
  };

  const subjectName = getSubjectName(subjectId);

  return (
    <div>
      <SubjectHeader
        title={subjectName}
        subtitle={`${subjectName} alt konularını seçin`}
        icon="📚"
      />
      <SubjectGrid
        subjects={altKonular}
        title={`${subjectName} Alt Konuları`}
        subtitle={`${altKonular.length} alt konu bulundu`}
      />
    </div>
  );
};

export default AltKonuSelector; 