import { XrplTx } from 'common/models/transaction/tx.types';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { OfferCreate } from 'xrpl';

export default function useOfferCreateTransactionDetails(tx: XrplTx<OfferCreate>) {
  return useMemo(() => {
    const takerGets = getTransactionTokenAndAmount(tx.TakerGets);
    const takerGetsAmount = takerGets[1];
    const takerPays = getTransactionTokenAndAmount(tx.TakerPays);
    const takerPaysAmount = takerPays[1];

    let rate = new BigNumber(takerGetsAmount.formatAmount()).dividedBy(takerPaysAmount.formatAmount()).toNumber();

    let firstCurrency = takerGetsAmount.currency;
    let secondCurrency = takerPaysAmount.currency;

    if (takerGetsAmount.currency === 'XRP') {
      rate = 1 / rate;
      firstCurrency = secondCurrency;
      secondCurrency = 'XRP';
    }

    return {
      takerGets,
      takerGetsAmount,
      takerPays,
      takerPaysAmount,
      rate: `${rate.toFixed(6)} ${firstCurrency}/${secondCurrency}`,
    };
  }, [tx]);
}
