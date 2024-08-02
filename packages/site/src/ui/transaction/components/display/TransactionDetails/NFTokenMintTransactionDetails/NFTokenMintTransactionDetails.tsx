import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenMint } from 'xrpl';

import IssuerInfoDisplay from '../../TransactionInfoDisplay/IssuerInfoDisplay/IssuerInfoDisplay';
import NFTokenIDInfoDisplay from '../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import NFTokenTaxonInfoDisplay from '../../TransactionInfoDisplay/NFTokenTaxonInfoDisplay/NFTokenTaxonInfoDisplay';
import TransferFeeInfoDisplay from '../../TransactionInfoDisplay/TransferFeeInfoDisplay/TransferFeeInfoDisplay';
import URIInfoDisplay from '../../TransactionInfoDisplay/URIInfoDisplay/URIInfoDisplay';
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
      {tx.meta?.nftoken_id && <NFTokenIDInfoDisplay NFTokenID={tx.meta.nftoken_id} />}
      <NFTokenTaxonInfoDisplay NFTokenTaxon={tx.NFTokenTaxon} />
      {tx.Issuer && <IssuerInfoDisplay issuer={tx.Issuer} />}
      {typeof tx.TransferFee === 'number' && <TransferFeeInfoDisplay transferFee={tx.TransferFee} />}
      {tx.URI && <URIInfoDisplay uri={tx.URI} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenMintTransactionDetails;
