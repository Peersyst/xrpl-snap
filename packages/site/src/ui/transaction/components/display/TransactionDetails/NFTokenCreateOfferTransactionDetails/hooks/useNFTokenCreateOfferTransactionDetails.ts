import { XrplTx } from 'common/models/transaction/tx.types';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { NFTokenCreateOffer } from 'xrpl';

export default function useNFTokenCreateOfferTransactionDetails(tx: XrplTx<NFTokenCreateOffer>) {
  return useMemo(() => {
    return {
      amount: getTransactionTokenAndAmount(tx.Amount)[1],
    };
  }, [tx]);
}
