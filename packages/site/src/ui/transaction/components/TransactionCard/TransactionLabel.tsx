import { Typography } from '@peersyst/react-components';
import { useTranslate } from 'ui/locale';
import { Transaction } from 'xrpl';

export interface TransactionLabelProps {
  isReceiver: boolean;
  txType: Transaction['TransactionType'];
}

function TransactionLabel({ txType, isReceiver }: TransactionLabelProps) {
  const translate = useTranslate();
  const isPayment = txType === 'Payment';

  if (isPayment) {
    return <Typography variant="body1">{translate(isReceiver ? 'receivedFrom' : 'sentTo')}</Typography>;
  }
  return <Typography variant="body1">{`${txType} ${translate(isReceiver ? 'from' : 'to').toLocaleLowerCase()}`}</Typography>;
}

export default TransactionLabel;
