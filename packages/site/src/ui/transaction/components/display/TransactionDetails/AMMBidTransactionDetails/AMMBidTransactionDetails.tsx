import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMBid } from 'xrpl';

import AMMAccountIDInfoDisplay from '../../TransactionInfoDisplay/AMMAccountIDInfoDisplay/AMMAccountIDInfoDisplay';
import BidInfoDisplay from '../../TransactionInfoDisplay/BidInfoDisplay/BidInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';
import useAMMBidTransactionDetails from './hooks/useAMMBidTransactionDetails';

export interface AMMBidTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMBid>;
}

function AMMBidTransactionDetails({ className, tx, ...rest }: AMMBidTransactionDetailsProps) {
  const { ammAccountId, bidMin, bidMax } = useAMMBidTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMBidTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <AMMAccountIDInfoDisplay accountId={ammAccountId} />}
      {bidMin && <BidInfoDisplay bid={bidMin} type="min" />}
      {bidMax && <BidInfoDisplay bid={bidMax} type="max" />}
    </BaseTransactionDetails>
  );
}

export default AMMBidTransactionDetails;
