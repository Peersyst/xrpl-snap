import type en from './en';

export declare type SnapLocaleKey = keyof typeof en;
export declare const translate: (key: SnapLocaleKey, vars?: Record<string, string>, locale?: string) => string;
