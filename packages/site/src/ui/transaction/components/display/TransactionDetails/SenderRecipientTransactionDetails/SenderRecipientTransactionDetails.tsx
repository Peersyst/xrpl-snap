import { XrplTx } from 'common/models/transaction/tx.types';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';
import { Transaction } from 'xrpl';

import DestinationInfoDisplay from '../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../TransactionInfoDisplay/DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import FromInfoDisplay from '../../TransactionInfoDisplay/FromInfoDisplay/FromInfoDisplay';

export type TransactionWithDestinationAndDestinationTag = Transaction & {
  Destination: string;
  DestinationTag?: number;
};

export interface SenderRecipientTransactionDetailsProps<T extends TransactionWithDestinationAndDestinationTag> {
  tx: XrplTx<T>;
}

function SenderRecipientTransactionDetails<T extends TransactionWithDestinationAndDestinationTag>({
  tx,
}: SenderRecipientTransactionDetailsProps<T>) {
  const { direction } = useParseTransaction(tx as Transaction);
  return direction === 'out' ? (
    <>
      <DestinationInfoDisplay destination={tx.Destination} />
      {tx.DestinationTag && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
    </>
  ) : (
    <FromInfoDisplay from={tx.Account} />
  );
}

export default SenderRecipientTransactionDetails;
