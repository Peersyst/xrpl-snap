import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { TicketCreate } from 'xrpl';

import SimpleTextInfoDisplay from '../../../TransactionInfoDisplay/SimpleTextInfoDisplay/SimpleTextInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface TicketCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<TicketCreate>;
}

function TicketCreateTransactionDetails({ className, tx, ...rest }: TicketCreateTransactionDetailsProps) {
  const translate = useTranslate('transactions');

  return (
    <BaseTransactionDetails className={clsx('TicketCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <SimpleTextInfoDisplay content={String(tx.TicketCount)} label={translate('ticketCount')} />
    </BaseTransactionDetails>
  );
}

export default TicketCreateTransactionDetails;
