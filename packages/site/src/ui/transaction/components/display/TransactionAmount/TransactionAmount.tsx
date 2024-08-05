import { XrplTx } from 'common/models/transaction/tx.types';

import BalanceWithFiat from '../BalanceWithFiat/BalanceWithFiat';
import { BalanceWithFiatProps } from '../BalanceWithFiat/BalanceWithFiat.types';
import useTransactionAmount from './hooks/useTransactionAmount';

export interface TransactionAmountProps extends Omit<BalanceWithFiatProps, 'balance' | 'currency' | 'token'> {
  tx: XrplTx;
}

function TransactionAmount({ tx, ...rest }: TransactionAmountProps): JSX.Element {
  const [token, amount] = useTransactionAmount(tx) ?? [];

  if (!amount || !token) {
    return <></>;
  }

  return <BalanceWithFiat balance={amount.formatAmount()} currency={token.currency} token={token} {...rest} />;
}

export default TransactionAmount;
