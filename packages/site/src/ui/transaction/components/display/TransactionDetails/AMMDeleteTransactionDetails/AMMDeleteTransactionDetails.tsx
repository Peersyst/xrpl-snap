import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMDelete } from 'xrpl';

import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';
import CurrencyInfoDisplay from '../../CurrencyInfoDisplay/CurrencyInfoDisplay';

export interface AMMDeleteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMDelete>;
}

function AMMDeleteTransactionDetails({ className, tx, ...rest }: AMMDeleteTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('AMMDeleteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      <CurrencyInfoDisplay asset={tx.Asset} index={1} />
      <CurrencyInfoDisplay asset={tx.Asset2} index={2} />
    </BaseTransactionDetails>
  );
}

export default AMMDeleteTransactionDetails;
