import { AMM_TX_TYPES } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { Transaction } from 'xrpl';

export default function useTransactionDetailsLabel(txType: Transaction['TransactionType'], isReceiver: boolean): string {
  const translate = useTranslate();

  switch (true) {
    case txType === 'Payment':
      return translate(isReceiver ? 'received' : 'sent', { ns: 'transactions' });
    case AMM_TX_TYPES.includes(txType):
      return translate(txType, { ns: 'transactions' });
    case txType === 'TrustSet':
      return translate('TrustSet', { ns: 'transactions' });
    default:
      return txType;
  }
}
