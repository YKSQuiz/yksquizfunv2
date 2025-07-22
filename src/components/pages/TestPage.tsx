import React, { useState } from 'react';
import { SubjectSelector, AltKonuSelector } from '../common/subjects';
import '../../styles/components/pages/test.css';

const TestPage: React.FC = () => {
  const [selectedExamType, setSelectedExamType] = useState<'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel'>('tyt');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSubjectName] = useState<string>('Test Subject');

  return (
    <div className="test-page-container">
      <h1 className="test-page-title">
        YKS Quiz - Yeni Yapı Test Sayfası
      </h1>

      {/* Sınav Türü Seçimi */}
      <div className="exam-type-section">
        <h3 className="exam-type-title">Sınav Türü Seçin:</h3>
        <div className="exam-type-buttons">
          {['tyt', 'ayt-sayisal', 'ayt-ea', 'ayt-sozel'].map((examType) => (
            <button
              key={examType}
              onClick={() => setSelectedExamType(examType as any)}
              className={`exam-type-button ${selectedExamType === examType ? 'active' : ''}`}
            >
              {examType.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Ders Seçimi */}
      {!selectedSubject && (
        <div>
          <SubjectSelector
            category={selectedExamType}
          />
        </div>
      )}

      {/* Alt Konu Seçimi */}
      {selectedSubject && (
        <div>
          <button
            onClick={() => setSelectedSubject('')}
            className="back-button"
          >
            ← Geri Dön
          </button>
          <AltKonuSelector
            subjectId={selectedSubject}
            subjectName={selectedSubjectName}
          />
        </div>
      )}

      {/* Debug Bilgileri */}
      <div className="debug-section">
        <h4 className="debug-title">Debug Bilgileri:</h4>
        <p className="debug-info"><strong>Seçilen Sınav Türü:</strong> {selectedExamType}</p>
        <p className="debug-info"><strong>Seçilen Ders:</strong> {selectedSubject || 'Henüz seçilmedi'}</p>
      </div>
    </div>
  );
};

export default TestPage; 