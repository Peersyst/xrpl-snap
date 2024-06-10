import type { Locale } from 'common/models/locale/index.types';
import { useTranslation } from 'react-i18next';
import useTranslate from 'ui/locale/hooks/useTranslate';

import { DateFormat } from './formatDate.types';
import type { FormatStrategy } from './formatDate.types';
import formatDateTime from './strategies/formatDateTime';
import formatShortDate from './strategies/formatShortDate';

export type useFormatDateProps = {
  format: DateFormat;
};

const FORMAT_DATE_STRATEGIES: Record<string, FormatStrategy['formatDate']> = {
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
