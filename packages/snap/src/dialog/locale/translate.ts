import en from './en';

const DEFAULT_LOCALE = 'en';
const locales = {
  en,
};

export type LocaleKey = keyof typeof en;

// Todo: improve locales
export const translate = (key: LocaleKey, vars: Record<string, string> = {}, locale = 'en'): string => {
  // const locale = await snap.request({ method: 'snap_getLocale' });
  let value = (locales[locale as keyof typeof locales] || locales[DEFAULT_LOCALE])[key];
  for (const variable of Object.keys(vars)) {
    value = value.replace(`%${variable}%`, vars[variable] ?? '');
  }
  return value;
};

export const translateDate = (date: Date, locale = 'en'): string => {
  return date.toLocaleString(locale);
};
