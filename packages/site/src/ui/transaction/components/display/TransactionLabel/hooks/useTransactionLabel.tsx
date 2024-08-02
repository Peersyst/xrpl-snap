import { formatHash } from '@peersyst/react-utils';
import { AMM_TX_TYPES } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { SetRegularKey, Transaction } from 'xrpl';

export default function useTransactionLabel(tx: Transaction, isReceiver: boolean, account: string): string {
  const translate = useTranslate();
  const formattedAccount = formatHash(account, 'middle', 4);
  const txType = tx.TransactionType;

  switch (true) {
    case txType === 'Payment':
      return translate(isReceiver ? 'receivedFrom' : 'sentTo', { address: formattedAccount, ns: 'transactions' });
    case AMM_TX_TYPES.includes(txType):
      return translate(txType, { ns: 'transactions' });
    case txType === 'TrustSet':
      return translate('TrustSet', { ns: 'transactions' });
    case txType === 'AccountSet':
      return translate('AccountSet', { ns: 'transactions' });
    case txType === 'SetRegularKey':
      return translate((tx as SetRegularKey).RegularKey ? 'addRegularKey' : 'deleteRegularKey', { ns: 'transactions' });
    default:
      return `${txType} ${translate(isReceiver ? 'from' : 'to').toLocaleLowerCase()} ${formattedAccount}`;
  }
}
