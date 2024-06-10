import type en from './en';

export declare const translate: (key: keyof typeof en, vars?: Record<string, string>, locale?: string) => string;
