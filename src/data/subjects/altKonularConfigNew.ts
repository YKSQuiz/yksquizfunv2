import { AltKonu } from './types';
import { 
  tytMatematikAltKonular, 
  tytTurkceAltKonular, 
  tytTarihAltKonular, 
  tytCografyaAltKonular,
  tytFelsefeAltKonular,
  tytDinAltKonular,
  tytFizikAltKonular,
  tytKimyaAltKonular,
  tytBiyolojiAltKonular
} from './tyt';

import {
  aytMatematikAltKonular,
  aytFizikAltKonular,
  aytKimyaAltKonular,
  aytBiyolojiAltKonular,
  aytEdebiyatAltKonular,
  aytCografyaAltKonular,
  aytTarihAltKonular,
  aytDinAltKonular,
  aytFelsefeAltKonular
} from './ayt';

// Ana alt konular konfigürasyonu - Yeni Organize Edilmiş Versiyon
export const altKonularConfigNew: Record<string, AltKonu[]> = {
  // TYT Dersleri - Ayrı dosyalardan import edildi
  'tyt-matematik': tytMatematikAltKonular,
  'tyt-turkce': tytTurkceAltKonular,
  'tyt-tarih': tytTarihAltKonular,
  'tyt-cografya': tytCografyaAltKonular,
  'tyt-felsefe': tytFelsefeAltKonular,
  'tyt-din': tytDinAltKonular,
  'tyt-fizik': tytFizikAltKonular,
  'tyt-kimya': tytKimyaAltKonular,
  'tyt-biyoloji': tytBiyolojiAltKonular,
  
  // AYT Dersleri - Ayrı dosyalardan import edildi
  'ayt-matematik': aytMatematikAltKonular,
  'ayt-fizik': aytFizikAltKonular,
  'ayt-kimya': aytKimyaAltKonular,
  'ayt-biyoloji': aytBiyolojiAltKonular,
  'ayt-edebiyat': aytEdebiyatAltKonular,
  'ayt-cografya': aytCografyaAltKonular,
  'ayt-tarih': aytTarihAltKonular,
  'ayt-din': aytDinAltKonular,
  'ayt-felsefe': aytFelsefeAltKonular,
}; 