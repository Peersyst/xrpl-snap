import type { Locale } from 'common/models/locale/index.types';
import type { Namespace, TFunction } from 'i18next';

export default function formatDateTime(
  locale: Locale,
  _translate: TFunction<Namespace>,
  date?: Date | string | number | undefined,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
) {
  try {
    if (date === undefined || date === '') {
      return '';
    }
    const finalDate = new Date(date);
    const day = new Intl.DateTimeFormat(locale, { day: options.day }).format(finalDate);
    const month = new Intl.DateTimeFormat(locale, { month: options.month }).format(finalDate).capitalize();
    const year = new Intl.DateTimeFormat(locale, { year: options.year }).format(finalDate);
    const time = new Intl.DateTimeFormat(locale, {
      hour: options.hour,
      minute: options.minute,
      second: options.second,
      hour12: options.hour12,
    }).format(finalDate);
    return `${month} ${day} ${year}, ${time}`;
  } catch (e) {
    return date?.toString() || '';
  }
}
