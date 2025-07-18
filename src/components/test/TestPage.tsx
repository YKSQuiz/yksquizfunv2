import React, { useState } from 'react';
import SubjectSelector from '../common/SubjectSelector';
import AltKonuSelector from '../common/AltKonuSelector';

const TestPage: React.FC = () => {
  const [selectedExamType, setSelectedExamType] = useState<'tyt' | 'ayt-sayisal' | 'ayt-ea' | 'ayt-sozel'>('tyt');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    console.log('Seçilen ders:', subjectId);
  };

  const handleAltKonuSelect = (altKonuId: string) => {
    console.log('Seçilen alt konu:', altKonuId);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        YKS Quiz - Yeni Yapı Test Sayfası
      </h1>

      {/* Sınav Türü Seçimi */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h3>Sınav Türü Seçin:</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['tyt', 'ayt-sayisal', 'ayt-ea', 'ayt-sozel'].map((examType) => (
            <button
              key={examType}
              onClick={() => setSelectedExamType(examType as any)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                background: selectedExamType === examType ? '#667eea' : '#f0f0f0',
                color: selectedExamType === examType ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
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
            examType={selectedExamType}
            onSubjectSelect={handleSubjectSelect}
          />
        </div>
      )}

      {/* Alt Konu Seçimi */}
      {selectedSubject && (
        <div>
          <button
            onClick={() => setSelectedSubject('')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              background: '#ff6b6b',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ← Geri Dön
          </button>
          <AltKonuSelector
            subjectId={selectedSubject}
            onAltKonuSelect={handleAltKonuSelect}
          />
        </div>
      )}

      {/* Debug Bilgileri */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>Debug Bilgileri:</h4>
        <p><strong>Seçilen Sınav Türü:</strong> {selectedExamType}</p>
        <p><strong>Seçilen Ders:</strong> {selectedSubject || 'Henüz seçilmedi'}</p>
      </div>
    </div>
  );
};

export default TestPage; 