import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { Payment } from 'xrpl';

import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';
import SenderRecipientTransactionDetails from '../SenderRecipientTransactionDetails/SenderRecipientTransactionDetails';

export interface PaymentTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<Payment>;
}

function PaymentTransactionDetails({ className, tx, ...rest }: PaymentTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('PaymentTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      <SenderRecipientTransactionDetails tx={tx} />
    </BaseTransactionDetails>
  );
}

export default PaymentTransactionDetails;
