import clsx from 'clsx';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { useTranslate } from 'ui/locale';
import { Amount } from 'xrpl';

import BalanceInfoDisplay from '../common/BalanceInfoDisplay/BalanceInfoDisplay';

export interface SendMaxInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  sendMax: Amount;
}

function SendMaxInfoDisplay({ className, sendMax, ...rest }: SendMaxInfoDisplayProps) {
  const translate = useTranslate('transactions');
  const parsedAmount = useMemo(() => getTransactionTokenAndAmount(sendMax)[1], [sendMax]);

  return (
    <BalanceInfoDisplay
      className={clsx('SendMaxInfoDisplay', className)}
      label={translate('sendMax')}
      currency={parsedAmount.currency}
      balance={parsedAmount.formatAmount()}
      {...rest}
    />
  );
}

export default SendMaxInfoDisplay;
