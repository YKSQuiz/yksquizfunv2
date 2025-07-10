import { RANKS } from './constants';

// Seviye için gereken XP formülü
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(100 * Math.pow(1.5, i - 1));
  }
  return xp;
}

// Seviyeye göre rütbe bulma
export function getRankForLevel(level: number): string {
  let rank = RANKS[0].name;
  for (const r of RANKS) {
    if (level >= r.level) {
      rank = r.name;
    } else {
      break;
    }
  }
  return rank;
}

// Zaman formatı
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Tarih formatı
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Başarı oranı hesaplama
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

// XP kazanma hesaplama
export function calculateXpGain(correct: number, total: number): number {
  const percent = calculateAccuracy(correct, total);
  if (percent === 100) {
    return correct * 20 * 2;
  } else if (percent >= 70) {
    return correct * 20;
  } else {
    return Math.floor((correct * 20) / 2);
  }
}

// Renk gradyanı oluşturma
export function createGradient(color1: string, color2: string): string {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

// Rastgele ID oluşturma
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Metin kısaltma
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Sayı formatı
export function formatNumber(num: number): string {
  return num.toLocaleString('tr-TR');
} 