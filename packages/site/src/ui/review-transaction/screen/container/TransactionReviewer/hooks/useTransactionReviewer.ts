import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Transaction, validate } from 'xrpl';

export default function useTransactionReviewer() {
  const [params] = useSearchParams();

  const transaction: Transaction | undefined = useMemo(() => {
    try {
      const txData = params.get('data');
      if (!txData) {
        return;
      }
      const jsonTx = JSON.parse(decodeURIComponent(txData)) as Transaction;
      validate(jsonTx as unknown as Record<string, unknown>); // Will throw if invalid
      return jsonTx;
    } catch (e) {}
  }, [params]);

  return { transaction };
}
