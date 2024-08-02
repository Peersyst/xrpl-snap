import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AccountDelete } from 'xrpl';

import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import SenderRecipientTransactionDetails from '../SenderRecipientTransactionDetails/SenderRecipientTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface AccountDeleteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AccountDelete>;
}

function AccountDeleteTransactionDetails({ className, tx, ...rest }: AccountDeleteTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('AccountDeleteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <SenderRecipientTransactionDetails tx={tx} />
    </BaseTransactionDetails>
  );
}

export default AccountDeleteTransactionDetails;
