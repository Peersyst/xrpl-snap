import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { CheckCash } from 'xrpl';

import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface CheckCashTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCash>;
}

function CheckCashTransactionDetails({ className, tx, ...rest }: CheckCashTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('CheckCashTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <HashInfoDisplay label={translate('checkID')} hash={tx.CheckID} />
    </BaseTransactionDetails>
  );
}

export default CheckCashTransactionDetails;
