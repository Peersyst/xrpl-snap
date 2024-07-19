import en from './en';

const DEFAULT_LOCALE = 'en';

/**
 * To add a new locale, follow these steps:
 * 1. Add the new locale to the `locales` object defined above.
 * 2. Refactor the translate to retrieve the locale using the Metamask API:
 * const locale = await snap.request({ method: 'snap_getLocale' });
 */
const locales = {
  en,
};

export type LocaleKey = keyof typeof en;

export const translate = (key: LocaleKey, vars: Record<string, string> = {}, locale = 'en'): string => {
  let value = (locales[locale as keyof typeof locales] || locales[DEFAULT_LOCALE])[key];
  for (const variable of Object.keys(vars)) {
    value = value.replace(`%${variable}%`, vars[variable] ?? '');
  }
  return value;
};

export const translateDate = (date: Date, locale = 'en'): string => {
  return date.toLocaleString(locale);
};
