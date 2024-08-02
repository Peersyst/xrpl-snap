import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenAcceptOffer } from 'xrpl';

import BuyerInfoDisplay from '../../TransactionInfoDisplay/BuyerInfoDisplay/BuyerInfoDisplay';
import NFTokenIDInfoDisplay from '../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import OfferIDInfoDisplay from '../../TransactionInfoDisplay/OfferIDInfoDisplay/OfferIDInfoDisplay';
import SellerInfoDisplay from '../../TransactionInfoDisplay/SellerInfoDisplay/SellerInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../common/TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';
import useNFTokenAcceptOfferTransactionDetails from './hooks/useNFTokenAcceptOfferTransactionDetails';

export interface NFTokenAcceptOfferTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenAcceptOffer>;
}

function NFTokenAcceptOfferTransactionDetails({ className, tx, ...rest }: NFTokenAcceptOfferTransactionDetailsProps) {
  const { amount, seller, buyer, acceptedOfferIds, nftTokenId } = useNFTokenAcceptOfferTransactionDetails(tx);
  return (
    <BaseTransactionDetails className={clsx('NFTokenAcceptOfferTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>{amount?.[1].amount !== '0' && <TransactionDetailsAmount tx={tx} />}</TransactionDetailsCard>
      {acceptedOfferIds.map((offerId) => (
        <OfferIDInfoDisplay offerID={offerId} />
      ))}
      {seller && <SellerInfoDisplay seller={seller} />}
      {buyer && <BuyerInfoDisplay buyer={buyer} />}
      {nftTokenId && <NFTokenIDInfoDisplay NFTokenID={nftTokenId} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenAcceptOfferTransactionDetails;
