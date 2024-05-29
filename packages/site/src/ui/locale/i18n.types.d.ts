import "i18next";
import { resources, defaultNS } from "./i18n";

export type LocaleResource = (typeof resources)["en"];
export type LocaleNamespace = keyof LocaleResource;
export type LocaleErrorResource = keyof LocaleResource["error"];
export type LocaleTranslationResource = keyof LocaleResource["translation"];

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: LocaleResource;
        returnNull: false;
    }
}
