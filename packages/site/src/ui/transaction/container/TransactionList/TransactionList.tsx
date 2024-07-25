import type { InfiniteScrollProps } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTheme } from 'styled-components';
import useWalletState from 'ui/adapter/state/useWalletState';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TransactionCard from 'ui/transaction/components/display/TransactionCard/TransactionCard';
import { TransactionCardSkeleton } from 'ui/transaction/components/feedback/TransactionCardSkeleton/TransactionCardSkeleton';

import useGetTransactions from '../../query/useGetTransactions';
import { extractTransactionProps } from './utils/transaction-list-utils';

export type TransactionListProps = {
  className?: string;
  style?: React.CSSProperties;
  container?: InfiniteScrollProps['container'];
};

function TransactionList({ className, ...rest }: TransactionListProps) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const { address } = useWalletState();

  const { data, fetchNextPage, isLoading, isRefetching, isFetching, hasNextPage } = useGetTransactions();

  function handleEndReached() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const loading = (!address || isFetching) && !isRefetching;

  return (
    <InfiniteList
      className={clsx('TransactionList', className)}
      renderItem={(tx, i) => {
        const props = extractTransactionProps(tx, address || '');
        return <TransactionCard key={i} {...props} loading={loading} />;
      }}
      end={!hasNextPage}
      isLoading={loading}
      Skeleton={TransactionCardSkeleton}
      numberOfSkeletons={isLoading || !isFetching ? 5 : 3}
      data={data?.pages.flatMap((page) => page.transactions)}
      nothingToShow={<NothingToShow css={{ marginTop: spacing[4] }} message={translate('nothingToShow', { context: 'tx' })} />}
      gap={spacing[8]}
      onEndReached={handleEndReached}
      {...rest}
    />
  );
}

export default TransactionList;
