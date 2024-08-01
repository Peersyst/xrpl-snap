import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMWithdraw } from 'xrpl';

import AMMAccountIDInfoDisplay from '../../TransactionInfoDisplay/AMMAccountIDInfoDisplay/AMMAccountIDInfoDisplay';
import AssetInfoDisplay from '../../TransactionInfoDisplay/AssetInfoDisplay/AssetInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';
import useAMMWithdrawTransactionDetails from './hooks/useAMMWithdrawTransactionDetails';

export interface AMMWithdrawTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMWithdraw>;
}

function AMMWithdrawTransactionDetails({ className, tx, ...rest }: AMMWithdrawTransactionDetailsProps) {
  const { ammAccountId, asset, asset2 } = useAMMWithdrawTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMWithdrawTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <AMMAccountIDInfoDisplay accountId={ammAccountId} />}
      {asset && asset.amount !== '0' && <AssetInfoDisplay asset={asset} index={1} direction="out" />}
      {asset2 && asset2.amount !== '0' && <AssetInfoDisplay asset={asset2} index={2} direction="out" />}
    </BaseTransactionDetails>
  );
}

export default AMMWithdrawTransactionDetails;
