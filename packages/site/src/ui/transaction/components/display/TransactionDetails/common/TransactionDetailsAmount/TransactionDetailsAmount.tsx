import { XrplTx } from 'common/models/transaction/tx.types';

import TransactionAmount from '../../../TransactionAmount/TransactionAmount';

export interface TransactionDetailsAmountProps {
  tx: XrplTx;
  showFiat?: boolean;
}

function TransactionDetailsAmount({ tx, showFiat }: TransactionDetailsAmountProps) {
  return (
    <TransactionAmount
      align="center"
      tx={tx}
      showFiat={showFiat}
      gap={0}
      balanceProps={{ variant: 'h3', fontWeight: '600' }}
      fiatBalanceProps={{ variant: 'body2' }}
    />
  );
}

export default TransactionDetailsAmount;
