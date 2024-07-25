import { useTranslate } from 'ui/locale';
import { Transaction } from 'xrpl';

export default function useTransactionLabel(txType: Transaction['TransactionType'], isReceiver: boolean): string {
  const translate = useTranslate();
  const isPayment = txType === 'Payment';

  if (isPayment) {
    return translate(isReceiver ? 'receivedFrom' : 'sentTo');
  }
  return `${txType} ${translate(isReceiver ? 'from' : 'to').toLocaleLowerCase()}`;
}
