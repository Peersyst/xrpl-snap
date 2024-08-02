import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { CheckCancel } from 'xrpl';

import CheckIDInfoDisplay from '../../TransactionInfoDisplay/CheckIDInfoDisplay/CheckIDInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';

export interface CheckCancelTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCancel>;
}

function CheckCancelTransactionDetails({ className, tx, ...rest }: CheckCancelTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('CheckCancelTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <CheckIDInfoDisplay checkId={tx.CheckID} />
    </BaseTransactionDetails>
  );
}

export default CheckCancelTransactionDetails;
