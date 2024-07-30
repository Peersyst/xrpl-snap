import clsx from 'clsx';
import { useRef } from 'react';
import TransactionList from 'ui/transaction/container/TransactionList/TransactionList';
import AccountNotActive from 'ui/wallet/containers/AccountNotActive/AccountNotActive';

import { HomePageTransactionListWrapper, HomeTransactionListShaddow } from './HomePage.styles';

export interface HomeTransactionsProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function HomeTransactions({ className, ...rest }: HomeTransactionsProps) {
  const refContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className={clsx('HomeTransactions', className)} css={{ position: 'relative' }} {...rest}>
      <HomePageTransactionListWrapper ref={refContainerRef} css={{ position: 'relative' }}>
        <TransactionList container={refContainerRef} nothingToShow={<AccountNotActive />} />
      </HomePageTransactionListWrapper>
      <HomeTransactionListShaddow />
    </div>
  );
}

export default HomeTransactions;
