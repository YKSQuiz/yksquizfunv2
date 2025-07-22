import React from "react";

interface JokerPanelProps {
  jokers: any;
  onUseJoker: (type: string) => void;
  onPurchaseJoker: (type: string) => void;
  isLoading?: boolean;
}

const JokerPanel: React.FC<JokerPanelProps> = ({ jokers, onUseJoker, onPurchaseJoker, isLoading = false }) => {
  return (
    <div className="joker-panel">
      <h3>Joker Hakları</h3>
      <div className="joker-grid">
        {Object.entries(jokers).map(([type, joker]: [string, any]) => (
          <div key={type} className="joker-item">
            <div className="joker-icon">
              {type === 'eliminate' && '➗'}
              {type === 'extraTime' && '⏰'}
              {type === 'doubleAnswer' && '2️⃣'}
              {type === 'autoCorrect' && '✅'}
            </div>
            <div className="joker-info">
              <span className="joker-name">
                {type === 'eliminate' && 'Elimine Et'}
                {type === 'extraTime' && 'Ekstra Süre'}
                {type === 'doubleAnswer' && 'Çift Cevap'}
                {type === 'autoCorrect' && 'Otomatik Düzelt'}
              </span>
              <span className="joker-count">{joker.count}</span>
            </div>
            <div className="joker-actions">
              <button 
                onClick={() => onUseJoker(type)}
                disabled={joker.count <= 0 || isLoading}
                className="joker-use-btn"
              >
                Kullan
              </button>
              <button 
                onClick={() => onPurchaseJoker(type)}
                disabled={isLoading}
                className="joker-purchase-btn"
              >
                Satın Al
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokerPanel; 