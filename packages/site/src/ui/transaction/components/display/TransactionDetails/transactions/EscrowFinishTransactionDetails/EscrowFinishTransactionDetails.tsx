import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { EscrowFinish } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useEscrowFinishTransactionDetails from './hooks/useEscrowFinishTransactionDetails';

export interface EscrowFinishTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<EscrowFinish>;
}

function EscrowFinishTransactionDetails({ className, tx, ...rest }: EscrowFinishTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { destination, previousTxHash } = useEscrowFinishTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('EscrowFinishTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      {destination && <BlockchainAddressInfoDisplay label={translate('escrowDestination')} account={destination} />}
      <BlockchainAddressInfoDisplay label={translate('owner')} account={tx.Owner} />
      <HashInfoDisplay label={translate('offerSequence')} hash={String(tx.OfferSequence)} />
      {tx.Condition && <HashInfoDisplay label={translate('condition')} hash={tx.Condition} />}
      {tx.Fulfillment && <HashInfoDisplay label={translate('fulfillment')} hash={tx.Fulfillment} />}
      {previousTxHash && <HashInfoDisplay label={translate('previousTxHash')} hash={previousTxHash} />}
    </BaseTransactionDetails>
  );
}

export default EscrowFinishTransactionDetails;
