import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { EscrowCancel } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface EscrowCancelTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<EscrowCancel>;
}

function EscrowCancelTransactionDetails({ className, tx, ...rest }: EscrowCancelTransactionDetailsProps) {
  const translate = useTranslate('transactions');

  return (
    <BaseTransactionDetails className={clsx('EscrowCancelTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <BlockchainAddressInfoDisplay label={translate('owner')} account={tx.Owner} />
      <HashInfoDisplay label={translate('offerSequence')} hash={String(tx.OfferSequence)} />
    </BaseTransactionDetails>
  );
}

export default EscrowCancelTransactionDetails;
