import { capitalize } from '@peersyst/react-utils';
import type { Locale } from 'common/models/locale/index.types';
import type { Namespace, TFunction } from 'i18next';

export default function formatShortDate(
  locale: Locale,
  _translate: TFunction<Namespace>,
  date?: Date | string | number | undefined,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
) {
  try {
    if (date === undefined || date === '') {
      return '';
    }
    const finalDate = new Date(date);
    const day = new Intl.DateTimeFormat(locale, { day: options.day }).format(finalDate);
    const month = capitalize(new Intl.DateTimeFormat(locale, { month: options.month }).format(finalDate));
    const year = new Intl.DateTimeFormat(locale, { year: options.year }).format(finalDate);
    return `${month} ${day} ${year}`;
  } catch (e) {
    return date?.toString() || '';
  }
}
