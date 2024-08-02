import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { OfferCancel } from 'xrpl';

import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface OfferCancelTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<OfferCancel>;
}

function OfferCancelTransactionDetails({ className, tx, ...rest }: OfferCancelTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('OfferCancelTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <HashInfoDisplay label={translate('offerSequence')} hash={String(tx.OfferSequence)} />
    </BaseTransactionDetails>
  );
}

export default OfferCancelTransactionDetails;
