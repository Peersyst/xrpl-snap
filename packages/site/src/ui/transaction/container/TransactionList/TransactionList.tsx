import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TransactionCard from 'ui/transaction/components/TransactionCard/TransactionCard';
import useGetTransactions from '../../query/useGetTransactions';
import useGetAddress from '../../../wallet/hooks/useGetAddress';

export interface TransactionListProps {
  className?: string;
  style?: React.CSSProperties;
}

const TransactionCardSkeleton = () => (
  <TransactionCard
    direction="in"
    timestamp={new Date().getTime()}
    account="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA"
    amount={new Amount('46791', 2, 'USD')}
    token={{ currency: 'USD', issuer: '', decimals: 0 }}
    loading
  />
);

function TransactionList({ className, ...rest }: TransactionListProps) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const address = useGetAddress();
  const { data, fetchNextPage, isLoading } = useGetTransactions(address);

  return (
    <InfiniteList<any>
      className={clsx('TransactionList', className)}
      renderItem={(t, i) => (
        <TransactionCard
          direction={i % 2 === 0 ? 'in' : 'out'}
          key={i}
          timestamp={new Date().getTime()}
          account="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA"
          amount={new Amount('46791', 2, 'USD')}
          token={{ currency: 'USD', issuer: '', decimals: 0 }}
        />
      )}
      isLoading={isLoading}
      Skeleton={TransactionCardSkeleton}
      numberOfSkeletons={5}
      data={data?.transactions}
      nothingToShow={
        <NothingToShow
          message={translate('nothingToShow', { context: 'tx' })}
        />
      }
      gap={spacing[8]}
      onEndReached={fetchNextPage}
      {...rest}
    />
  );
}

export default TransactionList;
