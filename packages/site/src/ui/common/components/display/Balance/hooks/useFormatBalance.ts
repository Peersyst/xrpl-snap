import type BigNumber from 'bignumber.js';

import { useFormatNumber } from '../../../../hooks/useFormatNumber';
import type { FormatBalanceOptions } from '../utils/formatBalance';
import { formatBalance } from '../utils/formatBalance';

export const useFormatBalance = ({
  numberFormatOptions,
  currency,
  currencyPosition,
  action: actionProp,
  hidden,
  hiddenLength,
  hiddenPlaceholder,
}: FormatBalanceOptions) => {
  const formatNumber = useFormatNumber(numberFormatOptions);

  return (balance: BigNumber.Value) => {
    const stringBalance = balance.toString();
    const absoluteBalance = stringBalance.replace(/^-/, '');
    const action = actionProp || (stringBalance.startsWith('-') ? 'subtract' : 'display');

    const formattedBalance = formatNumber(absoluteBalance);
    return formatBalance(formattedBalance, {
      action,
      currency,
      currencyPosition,
      hidden,
      hiddenLength,
      hiddenPlaceholder,
    });
  };
};
