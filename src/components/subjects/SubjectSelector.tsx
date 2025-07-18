import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectGrid } from './common';
import { subjectsConfig, Subject } from '../../data/subjects';

interface SubjectSelectorProps {
  category: 'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel';
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ category }) => {
  const navigate = useNavigate();
  
  // Konfigürasyondan kategori verilerini al
  const configKey = category === 'ayt-sayisal' ? 'aytSayisal' : 
                   category === 'ayt-ea' ? 'aytEa' : 
                   category === 'ayt-sozel' ? 'aytSozel' : 'tyt';
  
  const config = subjectsConfig[configKey];
  
  if (!config) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Kategori bulunamadı: {category}</h2>
      </div>
    );
  }

  const handleSubjectClick = (subject: Subject) => {
    navigate(subject.route);
  };

  return (
    <SubjectGrid
      subjects={config.subjects}
      onSubjectClick={handleSubjectClick}
      title={config.subtitle}
      subtitle={config.subtitle}
      theme={config.theme}
      headerTitle={config.title}
    />
  );
};

export default SubjectSelector; 