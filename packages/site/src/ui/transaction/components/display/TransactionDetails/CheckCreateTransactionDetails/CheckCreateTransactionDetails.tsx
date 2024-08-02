import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { CheckCreate } from 'xrpl';

import DestinationInfoDisplay from '../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../TransactionInfoDisplay/DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import ExpirationInfoDisplay from '../../TransactionInfoDisplay/ExpirationInfoDisplay/ExpirationInfoDisplay';
import InvoiceIDInfoDisplay from '../../TransactionInfoDisplay/InvoiceIDInfoDisplay/InvoiceIDInfoDisplay';
import SendMaxInfoDisplay from '../../TransactionInfoDisplay/SendMaxInfoDisplay/SendMaxInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface CheckCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<CheckCreate>;
}

function CheckCreateTransactionDetails({ className, tx, ...rest }: CheckCreateTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('CheckCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <DestinationInfoDisplay destination={tx.Destination} />
      {typeof tx.DestinationTag === 'number' && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
      {typeof tx.Expiration === 'number' && <ExpirationInfoDisplay expiration={tx.Expiration} />}
      {tx.SendMax && <SendMaxInfoDisplay sendMax={tx.SendMax} />}
      {tx.InvoiceID && <InvoiceIDInfoDisplay invoiceID={tx.InvoiceID} />}
    </BaseTransactionDetails>
  );
}

export default CheckCreateTransactionDetails;
