import { useConfig } from '@peersyst/react-components';
import { useTranslate } from '../../../ui/locale';

/**
 * Hook to format numbers
 * @param n Number to format
 * @param options Number format options
 */
export function useFormatNumber(options: Intl.NumberFormatOptions = {}) {
  const decimals = useConfig('decimals');

  const { maximumFractionDigits = decimals, ...otherOptions } = options;

  const translate = useTranslate();

  return (n: number | string) => {
    return translate('formatNumber', {
      val: n,
      maximumFractionDigits: maximumFractionDigits,
      ...otherOptions,
    });
  };
}
