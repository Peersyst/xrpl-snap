import { useFormatNumber } from '../../../../hooks/useFormatNumber';
import { FormatBalanceOptions, formatBalance } from '../utils/formatBalance';
import BigNumber from 'bignumber.js';

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
    const action =
      actionProp || (stringBalance.startsWith('-') ? 'subtract' : 'display');

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
