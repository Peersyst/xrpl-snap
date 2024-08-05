import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMWithdraw } from 'xrpl';

import AssetInfoDisplay from '../../../TransactionInfoDisplay/AssetInfoDisplay/AssetInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useAMMWithdrawTransactionDetails from './hooks/useAMMWithdrawTransactionDetails';

export interface AMMWithdrawTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMWithdraw>;
}

function AMMWithdrawTransactionDetails({ className, tx, ...rest }: AMMWithdrawTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { ammAccountId, asset, asset2 } = useAMMWithdrawTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMWithdrawTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <BlockchainAddressInfoDisplay account={ammAccountId} label={translate('ammAccountId')} />}
      {asset && asset.amount !== '0' && <AssetInfoDisplay asset={asset} index={1} direction="out" />}
      {asset2 && asset2.amount !== '0' && <AssetInfoDisplay asset={asset2} index={2} direction="out" />}
    </BaseTransactionDetails>
  );
}

export default AMMWithdrawTransactionDetails;
