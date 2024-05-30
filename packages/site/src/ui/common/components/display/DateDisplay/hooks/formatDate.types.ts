import { Locale } from "common/models/locale/index.types";
import { Namespace, TFunction } from "i18next";

export enum DateFormat {
    SHORT_DATE = "short",
    DATE_TIME = "date-time",
}

export interface FormatStrategy {
    formatDate: (
        locale: Locale,
        translate: TFunction<Namespace>,
        date?: Date | string | number | undefined,
        options?: Intl.DateTimeFormatOptions,
    ) => string;
}
