import en from './en.json';
import th from './th.json';

export type Translation = typeof en;

export const translations: Record<string, Translation> = {
  en: en,
  th: th
};

export { en, th };