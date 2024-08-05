import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMBid } from 'xrpl';

import AmountInfoDisplay from '../../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useAMMBidTransactionDetails from './hooks/useAMMBidTransactionDetails';

export interface AMMBidTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMBid>;
}

function AMMBidTransactionDetails({ className, tx, ...rest }: AMMBidTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { ammAccountId, bidMin, bidMax } = useAMMBidTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMBidTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <BlockchainAddressInfoDisplay account={ammAccountId} label={translate('ammAccountId')} />}
      {bidMin && <AmountInfoDisplay label={translate('minimumSlotPrice')} amount={bidMin} />}
      {bidMax && <AmountInfoDisplay label={translate('maximumSlotPrice')} amount={bidMax} />}
    </BaseTransactionDetails>
  );
}

export default AMMBidTransactionDetails;
