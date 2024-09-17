import clsx from 'clsx';
import { useRef } from 'react';
import TransactionList from 'ui/transaction/container/TransactionList/TransactionList';
import useGetTransactions from 'ui/transaction/query/useGetTransactions';
import AccountNotActive from 'ui/wallet/containers/AccountNotActive/AccountNotActive';
import useGetBalance from 'ui/wallet/query/useGetBalance';

import { HomePageTransactionListWrapper, HomeTransactionListShaddow } from './HomePage.styles';

export interface HomeTransactionsProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function HomeTransactions({ className, ...rest }: HomeTransactionsProps) {
  const refContainerRef = useRef<HTMLDivElement>(null);
  const { data: balance } = useGetBalance();
  const { data } = useGetTransactions();
  const numberOfTransactions = data?.pages[0]?.transactions.length ?? 0;
  const accountNotActive = balance?.amount === '0' && numberOfTransactions === 0;

  return (
    <div className={clsx('HomeTransactions', className)} css={{ position: 'relative' }} {...rest}>
      <HomePageTransactionListWrapper ref={refContainerRef} css={{ position: 'relative' }}>
        {accountNotActive ? <AccountNotActive /> : <TransactionList container={refContainerRef} />}
      </HomePageTransactionListWrapper>
      <HomeTransactionListShaddow />
    </div>
  );
}

export default HomeTransactions;
