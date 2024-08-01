import { XrplTx } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import { AMMVote } from 'xrpl';

export interface AMMVoteTransactionDetailsReturn {
  ammAccountId: string | undefined;
}

export default function useAMMVoteTransactionDetails(tx: XrplTx<AMMVote>): AMMVoteTransactionDetailsReturn {
  return useMemo(() => {
    const ammAccountId = tx.meta?.getAMMAccountID();
    return { ammAccountId };
  }, [tx]);
}
