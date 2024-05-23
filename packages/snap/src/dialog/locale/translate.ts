import en from './en';

const DEFAULT_LOCALE = 'en';
const locales = {
  en,
};

// Todo: improve locales
export const translate = (
  key: keyof typeof en,
  vars: Record<string, string> = {},
  locale = 'en',
): string => {
  // const locale = await snap.request({ method: 'snap_getLocale' });
  let value = (locales[locale as keyof typeof locales] ||
    locales[DEFAULT_LOCALE])[key];
  for (const variable of Object.keys(vars)) {
    value = value.replace(`%${variable}%`, vars[variable] ?? '');
  }
  return value;
};
