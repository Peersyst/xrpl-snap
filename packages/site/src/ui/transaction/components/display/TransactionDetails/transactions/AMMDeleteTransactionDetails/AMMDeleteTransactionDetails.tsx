import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMDelete } from 'xrpl';

import CurrencyInfoDisplay from '../../../TransactionInfoDisplay/CurrencyInfoDisplay/CurrencyInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface AMMDeleteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMDelete>;
}

function AMMDeleteTransactionDetails({ className, tx, ...rest }: AMMDeleteTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('AMMDeleteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <CurrencyInfoDisplay asset={tx.Asset} label={translate('asset', { n: 1 })} />
      <CurrencyInfoDisplay asset={tx.Asset2} label={translate('asset', { n: 2 })} />
    </BaseTransactionDetails>
  );
}

export default AMMDeleteTransactionDetails;
