import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AMMDeposit } from 'xrpl';

import AMMAccountIDInfoDisplay from '../../TransactionInfoDisplay/AMMAccountIDInfoDisplay/AMMAccountIDInfoDisplay';
import AssetInfoDisplay from '../../TransactionInfoDisplay/AssetInfoDisplay/AssetInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';
import useAMMDepositTransactionDetails from './hooks/useAMMDepositTransactionDetails';

export interface AMMDepositTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMDeposit>;
}

function AMMDepositTransactionDetails({ className, tx, ...rest }: AMMDepositTransactionDetailsProps) {
  const { ammAccountId, asset, asset2 } = useAMMDepositTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMDepositTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <AMMAccountIDInfoDisplay accountId={ammAccountId} />}
      {asset && asset.amount !== '0' && <AssetInfoDisplay asset={asset} index={1} direction="in" />}
      {asset2 && asset2.amount !== '0' && <AssetInfoDisplay asset={asset2} index={2} direction="in" />}
    </BaseTransactionDetails>
  );
}

export default AMMDepositTransactionDetails;
