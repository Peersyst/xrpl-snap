import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMDelete } from 'xrpl';

import CurrencyInfoDisplay from '../../TransactionInfoDisplay/CurrencyInfoDisplay/CurrencyInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface AMMDeleteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMDelete>;
}

function AMMDeleteTransactionDetails({ className, tx, ...rest }: AMMDeleteTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('AMMDeleteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <CurrencyInfoDisplay asset={tx.Asset} index={1} />
      <CurrencyInfoDisplay asset={tx.Asset2} index={2} />
    </BaseTransactionDetails>
  );
}

export default AMMDeleteTransactionDetails;
