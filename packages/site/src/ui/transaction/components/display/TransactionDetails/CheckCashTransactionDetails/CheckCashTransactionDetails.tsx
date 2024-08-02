import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { CheckCash } from 'xrpl';

import CheckIDInfoDisplay from '../../TransactionInfoDisplay/CheckIDInfoDisplay/CheckIDInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface CheckCashTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCash>;
}

function CheckCashTransactionDetails({ className, tx, ...rest }: CheckCashTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('CheckCashTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <CheckIDInfoDisplay checkId={tx.CheckID} />
    </BaseTransactionDetails>
  );
}

export default CheckCashTransactionDetails;
