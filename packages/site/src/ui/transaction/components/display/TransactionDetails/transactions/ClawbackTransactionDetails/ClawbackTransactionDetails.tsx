import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { Clawback } from 'xrpl';

import AmountInfoDisplay from '../../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useClawbackTransactionDetails from './hooks/useClawbackTransactionDetails';

export interface ClawbackTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<Clawback>;
}

function ClawbackTransactionDetails({ className, tx, ...rest }: ClawbackTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { amount } = useClawbackTransactionDetails(tx);
  return (
    <BaseTransactionDetails className={clsx('ClawbackTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <AmountInfoDisplay label={translate('clawbackAmount')} amount={amount} />
    </BaseTransactionDetails>
  );
}

export default ClawbackTransactionDetails;
