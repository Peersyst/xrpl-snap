import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenBurn } from 'xrpl';

import NFTokenIDInfoDisplay from '../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import OwnerInfoDisplay from '../../TransactionInfoDisplay/OwnerInfoDisplay/OwnerInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface NFTokenBurnTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenBurn>;
}

function NFTokenBurnTransactionDetails({ className, tx, ...rest }: NFTokenBurnTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('NFTokenBurnTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <NFTokenIDInfoDisplay NFTokenID={tx.NFTokenID} />
      {tx.Owner && <OwnerInfoDisplay owner={tx.Owner} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenBurnTransactionDetails;
