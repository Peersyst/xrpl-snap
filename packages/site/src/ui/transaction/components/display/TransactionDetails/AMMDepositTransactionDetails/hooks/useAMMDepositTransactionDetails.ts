import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { useMemo } from 'react';
import { AMMDeposit } from 'xrpl';

export interface AMMDepositTransactionDetailsReturn {
  ammAccountId: string | undefined;
  asset: Amount | undefined;
  asset2: Amount | undefined;
}

export default function useAMMDepositTransactionDetails(tx: XrplTx<AMMDeposit>): AMMDepositTransactionDetailsReturn {
  return useMemo(() => {
    const ammAccountId = tx.meta?.getAMMAccountID();

    const changes = tx.meta?.findAssetsChanges(tx.Account, tx.Fee);
    const asset = changes?.find(([token]) => token.currency === tx.Asset.currency)?.[1];
    const asset2 = changes?.find(([token]) => token.currency === tx.Asset2.currency)?.[1];

    return { ammAccountId, asset, asset2 };
  }, [tx]);
}
