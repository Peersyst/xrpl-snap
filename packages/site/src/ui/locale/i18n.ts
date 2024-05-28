import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en/en';
import LanguageDetectorPlugin from './plugins/LanguageDetectorPlugin';

export const defaultNS = 'translation';

export const resources = {
  en,
} as const;

export const i18nextInitializationPromise = i18next
  .use(initReactI18next)
  .use(LanguageDetectorPlugin)
  .init({
    fallbackLng: 'en',
    resources,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnNull: false,
  });

export default i18next;
