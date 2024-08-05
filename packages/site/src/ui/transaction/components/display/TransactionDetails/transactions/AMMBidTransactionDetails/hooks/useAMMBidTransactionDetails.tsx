import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { AMMBid } from 'xrpl';

export interface AMMBidTransactionDetailsReturn {
  ammAccountId: string | undefined;
  bidMin: Amount | undefined;
  bidMax: Amount | undefined;
}

export default function useAMMBidTransactionDetails(tx: XrplTx<AMMBid>): AMMBidTransactionDetailsReturn {
  return useMemo(() => {
    const ammAccountId = tx.meta?.getAMMAccountID();
    let bidMin: Amount | undefined;
    let bidMax: Amount | undefined;

    if (tx.BidMin) {
      if (tx.BidMin.currency === 'XRP') {
        bidMin = getTransactionTokenAndAmount(tx.BidMin.value)[1];
      } else {
        bidMin = getTransactionTokenAndAmount({ ...tx.BidMin })[1];
      }
    }

    if (tx.BidMax) {
      if (tx.BidMax.currency === 'XRP') {
        bidMax = getTransactionTokenAndAmount(tx.BidMax.value)[1];
      } else {
        bidMax = getTransactionTokenAndAmount({ ...tx.BidMax })[1];
      }
    }

    return { ammAccountId, bidMax, bidMin };
  }, [tx]);
}
