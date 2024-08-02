import useWalletState from 'ui/adapter/state/useWalletState';
import { useTranslate } from 'ui/locale';
import { Transaction } from 'xrpl';

import useTransactionLabel from '../../../TransactionLabel/hooks/useTransactionLabel';

export default function useTransactionDetailsLabel(tx: Transaction, isReceiver: boolean): string {
  const translate = useTranslate();
  const { address = '' } = useWalletState();
  const label = useTransactionLabel(tx, isReceiver, address);

  const txType = tx.TransactionType;

  switch (true) {
    case txType === 'Payment':
      return translate(isReceiver ? 'received' : 'sent', { ns: 'transactions' });
    default:
      return label;
  }
}
