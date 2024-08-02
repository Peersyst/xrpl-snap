import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMVote } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import TradingFeeInfoDisplay from '../../../TransactionInfoDisplay/TradingFeeInfoDisplay/TradingFeeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useAMMVoteTransactionDetails from './hooks/useAMMVoteTransactionDetails';

export interface AMMVoteTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMVote>;
}

function AMMVoteTransactionDetails({ className, tx, ...rest }: AMMVoteTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { ammAccountId } = useAMMVoteTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMVoteTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {ammAccountId && <BlockchainAddressInfoDisplay account={ammAccountId} label={translate('ammAccountId')} />}
      <TradingFeeInfoDisplay tradingFee={tx.TradingFee} />
    </BaseTransactionDetails>
  );
}

export default AMMVoteTransactionDetails;
