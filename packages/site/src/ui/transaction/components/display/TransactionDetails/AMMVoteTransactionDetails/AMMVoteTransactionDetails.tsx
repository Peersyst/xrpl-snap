import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMVote } from 'xrpl';

import AMMAccountIDInfoDisplay from '../../AMMAccountIDInfoDisplay/AMMAccountIDInfoDisplay';
import TradingFeeInfoDisplay from '../../TradingFeeInfoDisplay/TradingFeeInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';
import useAMMVoteTransactionDetails from './hooks/useAMMVoteTransactionDetails';

export interface AMMVoteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMVote>;
}

function AMMVoteTransactionDetails({ className, tx, ...rest }: AMMVoteTransactionDetailsProps) {
  const { ammAccountId } = useAMMVoteTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMVoteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {ammAccountId && <AMMAccountIDInfoDisplay accountId={ammAccountId} />}
      <TradingFeeInfoDisplay tradingFee={tx.TradingFee} />
    </BaseTransactionDetails>
  );
}

export default AMMVoteTransactionDetails;
