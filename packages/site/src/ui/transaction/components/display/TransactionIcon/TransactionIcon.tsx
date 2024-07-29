import { Skeleton } from '@peersyst/react-components';
import clsx from 'clsx';

import useTransactionIcon from './hooks/useTransactionIcon';
import { TransactionIconRoot } from './TransactionIcon.styles';
import { TransactionIconProps } from './TransactionIcon.types';

function TransactionIcon({ className, txType, isReceiver, loading, ...rest }: TransactionIconProps) {
  const Icon = useTransactionIcon(txType, isReceiver);

  return (
    <Skeleton loading={loading} shape="circular">
      <TransactionIconRoot size="lg" className={clsx('TransactionCardIcon', isReceiver ? 'Active' : '', className)} Icon={Icon} {...rest} />
    </Skeleton>
  );
}

export default TransactionIcon;
