import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { NFTokenBurn } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import NFTokenIDInfoDisplay from '../../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface NFTokenBurnTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenBurn>;
}

function NFTokenBurnTransactionDetails({ className, tx, ...rest }: NFTokenBurnTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('NFTokenBurnTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <NFTokenIDInfoDisplay NFTokenID={tx.NFTokenID} />
      {tx.Owner && <BlockchainAddressInfoDisplay label={translate('owner')} account={tx.Owner} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenBurnTransactionDetails;
