import 'i18next';
import type { resources, defaultNS } from './i18n';

export type LocaleResource = (typeof resources)['en'];
export type LocaleNamespace = keyof LocaleResource;
export type LocaleErrorResource = keyof LocaleResource['error'];
export type LocaleTranslationResource = keyof LocaleResource['translation'];
export type LocaleTransactionsResource = keyof LocaleResource['transactions'];

declare module 'i18next' {
  type CustomTypeOptions = {
    defaultNS: typeof defaultNS;
    resources: LocaleResource;
    returnNull: false;
  };
}
