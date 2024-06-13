import type { LocaleKey } from '../../../locale/translate';
import { translate } from '../../../locale/translate';

export const translateLabel = (label: LocaleKey): string => {
  return `**${translate(label)}**:`;
};
