import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { CheckCreate } from 'xrpl';

import AmountInfoDisplay from '../../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import DestinationInfoDisplay from '../../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../../TransactionInfoDisplay/DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import RippleTimeInfoDisplay from '../../../TransactionInfoDisplay/RippleTimeInfoDisplay/RippleTimeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useCheckCreateTransactionDetails from './hooks/useCheckCreateTransactionDetails';

export interface CheckCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCreate>;
}

function CheckCreateTransactionDetails({ className, tx, ...rest }: CheckCreateTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { sendMax } = useCheckCreateTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('CheckCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <DestinationInfoDisplay destination={tx.Destination} />
      {typeof tx.DestinationTag === 'number' && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
      {typeof tx.Expiration === 'number' && <RippleTimeInfoDisplay date={tx.Expiration} label={translate('expiration')} />}
      <AmountInfoDisplay label={translate('sendMax')} amount={sendMax} />
      {tx.InvoiceID && <HashInfoDisplay label={translate('invoiceID')} hash={tx.InvoiceID} />}
    </BaseTransactionDetails>
  );
}

export default CheckCreateTransactionDetails;
