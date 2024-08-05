import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';
import { Transaction } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import DestinationInfoDisplay from '../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../TransactionInfoDisplay/DestinationTagInfoDisplay/DestinationTagInfoDisplay';

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
  const translate = useTranslate('transactions');
  const { direction } = useParseTransaction(tx as Transaction);
  return direction === 'out' ? (
    <>
      <DestinationInfoDisplay destination={tx.Destination} />
      {typeof tx.DestinationTag === 'number' && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
    </>
  ) : (
    <BlockchainAddressInfoDisplay account={tx.Account} label={translate('from')} />
  );
}

export default SenderRecipientTransactionDetails;
