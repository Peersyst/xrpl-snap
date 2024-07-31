import { XrplTx } from 'common/models/transaction/tx.types';

import GenericTransactionDetails from './GenericTransactionDetails/GenericTransactionDetails';
import PaymentTransactionDetails from './PaymentTransactionDetails/PaymentTransactionDetails';

export interface TransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
}

function TransactionDetails({ tx, ...rest }: TransactionDetailsProps) {
  switch (tx.TransactionType) {
    case 'Payment':
      return <PaymentTransactionDetails tx={tx} {...rest} />;
    default:
      return <GenericTransactionDetails tx={tx} {...rest} />;
  }
}

export default TransactionDetails;
