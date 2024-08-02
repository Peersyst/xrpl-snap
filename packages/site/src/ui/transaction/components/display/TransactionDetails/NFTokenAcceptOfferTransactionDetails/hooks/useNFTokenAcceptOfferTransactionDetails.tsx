import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import { NFTokenAcceptOffer } from 'xrpl';

export default function useNFTokenAcceptOfferTransactionDetails(tx: XrplTx<NFTokenAcceptOffer>) {
  return useMemo(() => {
    const parsedOffer = tx.meta?.parseNFTAcceptOffer(tx.Account);
    const acceptedOfferIds: string[] = [];
    if (tx.NFTokenSellOffer) {
      acceptedOfferIds.push(tx.NFTokenSellOffer);
    }
    if (tx.NFTokenBuyOffer) {
      acceptedOfferIds.push(tx.NFTokenBuyOffer);
    }
    return {
      ...parsedOffer,
      acceptedOfferIds,
    };
  }, [tx]);
}
