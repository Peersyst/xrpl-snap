import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';

import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface GenericTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
}

function GenericTransactionDetails({ className, tx, ...rest }: GenericTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('GenericTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
    </BaseTransactionDetails>
  );
}

export default GenericTransactionDetails;
