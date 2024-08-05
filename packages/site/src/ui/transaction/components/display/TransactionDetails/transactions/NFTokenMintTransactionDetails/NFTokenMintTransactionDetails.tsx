import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { NFTokenMint } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import NFTokenIDInfoDisplay from '../../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import TransferFeeInfoDisplay from '../../../TransactionInfoDisplay/TransferFeeInfoDisplay/TransferFeeInfoDisplay';
import URIInfoDisplay from '../../../TransactionInfoDisplay/URIInfoDisplay/URIInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface NFTokenMintTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenMint>;
}

function NFTokenMintTransactionDetails({ className, tx, ...rest }: NFTokenMintTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('NFTokenMintTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {tx.meta?.nftoken_id && <NFTokenIDInfoDisplay NFTokenID={tx.meta.nftoken_id} />}
      <HashInfoDisplay label={translate('NFTokenTaxon')} hash={String(tx.NFTokenTaxon)} />
      {tx.Issuer && <BlockchainAddressInfoDisplay label={translate('issuer')} account={tx.Issuer} />}
      {typeof tx.TransferFee === 'number' && <TransferFeeInfoDisplay transferFee={tx.TransferFee} />}
      {tx.URI && <URIInfoDisplay uri={tx.URI} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenMintTransactionDetails;
