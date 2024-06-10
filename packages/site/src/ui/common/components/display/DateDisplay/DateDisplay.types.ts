import type { TypographyProps } from '@peersyst/react-components';

import type { DateFormat } from './hooks/formatDate.types';

export type DateType = Date | string | number;
export type DateDisplayProps = {
  date: DateType;
  format?: DateFormat;
} & Omit<TypographyProps, 'children' | 'numberOfLines'>;
