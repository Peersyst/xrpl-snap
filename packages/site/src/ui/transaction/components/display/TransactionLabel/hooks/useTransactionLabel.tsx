import { formatHash } from '@peersyst/react-utils';
import { useTranslate } from 'ui/locale';
import { Transaction } from 'xrpl';

export default function useTransactionLabel(tx: Transaction, isReceiver: boolean, account: string): string {
  const translate = useTranslate();
  const formattedAccount = formatHash(account, 'middle', 4);
  const txType = tx.TransactionType;

  switch (txType) {
    case 'Payment':
      return translate(isReceiver ? 'receivedFrom' : 'sentTo', { address: formattedAccount, ns: 'transactions' });
    case 'SetRegularKey':
      return translate(tx.RegularKey ? 'addRegularKey' : 'deleteRegularKey', { ns: 'transactions' });
    case 'TrustSet':
      if (tx.LimitAmount.value === '0') {
        return translate(tx.LimitAmount.issuer === account ? 'removeIncomingTrustLine' : 'removeTrustLine', { ns: 'transactions' });
      }
      return translate(tx.LimitAmount.issuer === account ? 'addIcomingTrustLine' : 'addTrustLine', { ns: 'transactions' });
    default:
      return translate(txType, { ns: 'transactions' });
  }
}
