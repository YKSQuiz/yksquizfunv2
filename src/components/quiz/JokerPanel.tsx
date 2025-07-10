import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { User } from '../../types/index';

const JOKER_ICONS = {
  eliminate: "➗",
  extraTime: "⏰",
  doubleAnswer: "2️⃣",
  autoCorrect: "✅",
};
const JOKER_LABELS = {
  eliminate: "2 Şık Eleme",
  extraTime: "Ekstra 60sn",
  doubleAnswer: "Çift Cevap",
  autoCorrect: "Doğru Kabul",
};

const JOKER_TYPES = ["eliminate", "extraTime", "doubleAnswer", "autoCorrect"] as const;
type JokerType = typeof JOKER_TYPES[number];

export default function JokerPanel({ jokers, jokersUsed, onUseJoker }: {
  jokers: Record<JokerType, { count: number }>;
  jokersUsed: Record<JokerType, number>;
  onUseJoker: (type: JokerType) => void;
}) {
  return (
    <div className="joker-panel">
      {JOKER_TYPES.map((type) => (
        <div key={type} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            disabled={jokers[type].count === 0}
            onClick={() => onUseJoker(type)}
            title={JOKER_LABELS[type]}
            style={{
              fontSize: 24,
              padding: "10px 18px",
              borderRadius: 12,
              border: "2px solid #764ba2",
              background: jokers[type].count === 0 ? "#eee" : "#fff",
              cursor: jokers[type].count === 0 ? "not-allowed" : "pointer",
              position: "relative",
              minWidth: 60,
            }}
          >
            <span>{JOKER_ICONS[type]}</span>
            <span style={{
              position: "absolute", top: 2, right: 8, fontSize: 14, color: "#764ba2", fontWeight: 700
            }}>{jokers[type].count}</span>
          </button>
          <span style={{ fontSize: 12, color: "#764ba2", marginTop: 2 }}>
            Kullanıldı: {jokersUsed[type] || 0}
          </span>
        </div>
      ))}
    </div>
  );
} 