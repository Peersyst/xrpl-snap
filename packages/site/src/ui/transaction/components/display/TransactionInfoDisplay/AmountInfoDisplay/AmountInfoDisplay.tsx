import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';

import BalanceInfoDisplay from '../BalanceInfoDisplay/BalanceInfoDisplay';

export interface AmountInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  amount: Amount;
}

function AmountInfoDisplay({ className, amount, label, ...rest }: AmountInfoDisplayProps) {
  const currency = amount.currency === 'XRP' ? 'XRP' : parseCurrencyCode(amount.currency);

  return (
    <BalanceInfoDisplay
      className={clsx('AmountInfoDisplay', className)}
      label={label}
      currency={currency}
      balance={amount.formatAmount()}
      {...rest}
    />
  );
}

export default AmountInfoDisplay;
