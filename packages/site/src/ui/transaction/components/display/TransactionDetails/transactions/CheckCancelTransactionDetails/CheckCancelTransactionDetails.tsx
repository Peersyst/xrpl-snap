import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { CheckCancel } from 'xrpl';

import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface CheckCancelTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCancel>;
}

function CheckCancelTransactionDetails({ className, tx, ...rest }: CheckCancelTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('CheckCancelTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <HashInfoDisplay label={translate('checkID')} hash={tx.CheckID} />
    </BaseTransactionDetails>
  );
}

export default CheckCancelTransactionDetails;
