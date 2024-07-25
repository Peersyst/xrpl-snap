import { Typography, TypographyProps } from '@peersyst/react-components';
import { Transaction } from 'xrpl';

import useTransactionLabel from './hooks/useTransactionLabel';

export interface TransactionLabelProps extends Omit<TypographyProps, 'children'> {
  isReceiver: boolean;
  txType: Transaction['TransactionType'];
}

function TransactionLabel({ txType, isReceiver, ...rest }: TransactionLabelProps) {
  const label = useTransactionLabel(txType, isReceiver);

  return <Typography {...rest}>{label}</Typography>;
}

export default TransactionLabel;
