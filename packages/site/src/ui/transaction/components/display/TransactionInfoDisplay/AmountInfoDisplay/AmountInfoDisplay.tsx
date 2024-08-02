import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { useTranslate } from 'ui/locale';

import BalanceInfoDisplay from '../common/BalanceInfoDisplay/BalanceInfoDisplay';

export interface AmountInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  amount: Amount;
}

function AmountInfoDisplay({ className, amount, ...rest }: AmountInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <BalanceInfoDisplay
      className={clsx('AmountInfoDisplay', className)}
      label={translate('amount')}
      currency={amount.currency}
      balance={amount.formatAmount()}
      {...rest}
    />
  );
}

export default AmountInfoDisplay;
