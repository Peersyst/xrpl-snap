import { Skeleton } from '@peersyst/react-components';
import clsx from 'clsx';

import useTransactionIcon from './hooks/useTransactionIcon';
import { TransactionCardIconProps } from './TransactionCardIcon.types';
import { TransactionCardIconRoot } from './TransactionIcon.styles';

function TransactionCardIcon({ className, txType, isReceiver, loading, ...rest }: TransactionCardIconProps) {
  const Icon = useTransactionIcon(txType, isReceiver);

  return (
    <Skeleton loading={loading} shape="circular">
      <TransactionCardIconRoot
        size="lg"
        className={clsx('TransactionCardIcon', isReceiver ? 'Active' : '', className)}
        Icon={Icon}
        {...rest}
      />
    </Skeleton>
  );
}

export default TransactionCardIcon;
