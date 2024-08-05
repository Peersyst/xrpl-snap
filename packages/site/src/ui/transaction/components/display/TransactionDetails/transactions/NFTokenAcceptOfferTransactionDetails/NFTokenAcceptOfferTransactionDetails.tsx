import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { NFTokenAcceptOffer } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import NFTokenIDInfoDisplay from '../../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import OfferIDInfoDisplay from '../../../TransactionInfoDisplay/OfferIDInfoDisplay/OfferIDInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useNFTokenAcceptOfferTransactionDetails from './hooks/useNFTokenAcceptOfferTransactionDetails';

export interface NFTokenAcceptOfferTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenAcceptOffer>;
}

function NFTokenAcceptOfferTransactionDetails({ className, tx, ...rest }: NFTokenAcceptOfferTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { amount, seller, buyer, acceptedOfferIds, nftTokenId } = useNFTokenAcceptOfferTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('NFTokenAcceptOfferTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>{amount?.[1].amount !== '0' && <TransactionDetailsAmount tx={tx} />}</TransactionDetailsCard>
      {acceptedOfferIds.map((offerId) => (
        <OfferIDInfoDisplay offerID={offerId} />
      ))}
      {seller && <BlockchainAddressInfoDisplay label={translate('seller')} account={seller} />}
      {buyer && <BlockchainAddressInfoDisplay label={translate('buyer')} account={buyer} />}
      {nftTokenId && <NFTokenIDInfoDisplay NFTokenID={nftTokenId} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenAcceptOfferTransactionDetails;
