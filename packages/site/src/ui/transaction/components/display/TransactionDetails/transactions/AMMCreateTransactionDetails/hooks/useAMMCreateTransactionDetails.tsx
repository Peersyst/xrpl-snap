import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { getTransactionTokenAndAmount } from 'common/utils/xrpl/transaction-amount';
import { useMemo } from 'react';
import { AMMCreate } from 'xrpl';

export interface AMMCreateTransactionDetailsReturn {
  ammAccountId: string | undefined;
  amount: Amount | undefined;
  amount2: Amount | undefined;
}

export default function useAMMCreateTransactionDetails(tx: XrplTx<AMMCreate>): AMMCreateTransactionDetailsReturn {
  return useMemo(() => {
    const ammAccountId = tx.meta?.getAMMAccountID();
    const amount = getTransactionTokenAndAmount(tx.Amount)[1];
    const amount2 = getTransactionTokenAndAmount(tx.Amount2)[1];

    return { ammAccountId, amount, amount2 };
  }, [tx]);
}
