import { FormatStrategy, DateFormat } from "./formatDate.types";
import { useTranslation } from "react-i18next";
import { Locale } from "common/models/locale/index.types";
import useTranslate from "ui/locale/hooks/useTranslate";
import formatShortDate from "./strategies/formatShortDate";
import formatDateTime from "./strategies/formatDateTime";

export interface useFormatDateProps {
    format: DateFormat;
}

const FORMAT_DATE_STRATEGIES: Record<string, FormatStrategy["formatDate"]> = {
    [DateFormat.SHORT_DATE]: formatShortDate,
    [DateFormat.DATE_TIME]: formatDateTime,
};

export default function useFormatDate({ format }: useFormatDateProps) {
    const formatDate = FORMAT_DATE_STRATEGIES[format];
    const { i18n } = useTranslation();
    const translate = useTranslate();

    const finalFormatDate = (date?: Date | string | number | undefined, options?: Intl.DateTimeFormatOptions) => {
        return formatDate(i18n.language as Locale, translate, date, options);
    };

    return finalFormatDate;
}
