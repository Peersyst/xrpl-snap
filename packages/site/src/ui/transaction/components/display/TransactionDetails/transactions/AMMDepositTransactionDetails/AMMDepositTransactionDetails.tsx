import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { AMMDeposit } from 'xrpl';

import AssetInfoDisplay from '../../../TransactionInfoDisplay/AssetInfoDisplay/AssetInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useAMMDepositTransactionDetails from './hooks/useAMMDepositTransactionDetails';

export interface AMMDepositTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AMMDeposit>;
}

function AMMDepositTransactionDetails({ className, tx, ...rest }: AMMDepositTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { ammAccountId, asset, asset2 } = useAMMDepositTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('AMMDepositTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {ammAccountId && <BlockchainAddressInfoDisplay account={ammAccountId} label={translate('ammAccountId')} />}
      {asset && asset.amount !== '0' && <AssetInfoDisplay asset={asset} index={1} direction="in" />}
      {asset2 && asset2.amount !== '0' && <AssetInfoDisplay asset={asset2} index={2} direction="in" />}
    </BaseTransactionDetails>
  );
}

export default AMMDepositTransactionDetails;
