/* eslint-disable @typescript-eslint/no-empty-function */
import type { LanguageDetectorAsyncModule } from 'i18next';

import type { Locale } from '../../../common/models/locale/index.types';

export async function getStoredLocale(): Promise<Locale> {
  // TODO(jordi): implement detection of stored locale
  // return ControllerFactory.settingsController.getLocale();
  return new Promise((resolve) => resolve('en'));
}

export function getDefaultLocale(): Locale {
  // TODO(jordi): implement detection of browser language
  return 'en';
}

export async function detect(): Promise<Locale> {
  try {
    const storedLocale = await getStoredLocale();
    return storedLocale || getDefaultLocale();
  } catch (error) {
    /* eslint-disable no-console */
    console.warn('Error reading language', error);
    return 'en';
  }
}

const LanguageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect,
  cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;
