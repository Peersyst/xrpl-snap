import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMCreate } from 'xrpl';

import AmountAssetInfoDisplay from '../../../TransactionInfoDisplay/AmountAssetInfoDisplay/AmountAssetInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import TradingFeeInfoDisplay from '../../../TransactionInfoDisplay/TradingFeeInfoDisplay/TradingFeeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useAMMCreateTransactionDetails from './hooks/useAMMCreateTransactionDetails';

export interface AMMCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMCreate>;
}

function AMMCreateTransactionDetails({ className, tx, ...rest }: AMMCreateTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { ammAccountId, amount, amount2 } = useAMMCreateTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <BlockchainAddressInfoDisplay account={ammAccountId} label={translate('ammAccountId')} />}
      {amount && amount.amount !== '0' && <AmountAssetInfoDisplay asset={amount} index={1} />}
      {amount2 && amount2.amount !== '0' && <AmountAssetInfoDisplay asset={amount2} index={2} />}
      <TradingFeeInfoDisplay tradingFee={tx.TradingFee} />
    </BaseTransactionDetails>
  );
}

export default AMMCreateTransactionDetails;
