import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenMint } from 'xrpl';

import NFTokenTaxonInfoDisplay from '../../TransactionInfoDisplay/NFTokenTaxonInfoDisplay/NFTokenTaxonInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';

export interface NFTokenMintTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenMint>;
}

function NFTokenMintTransactionDetails({ className, tx, ...rest }: NFTokenMintTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('NFTokenMintTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <NFTokenTaxonInfoDisplay NFTokenTaxon={tx.NFTokenTaxon} />
    </BaseTransactionDetails>
  );
}

export default NFTokenMintTransactionDetails;
