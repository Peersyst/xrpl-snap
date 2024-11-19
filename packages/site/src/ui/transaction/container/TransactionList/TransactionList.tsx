import { Col, type InfiniteScrollProps } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTheme } from 'styled-components';
import useWalletState from 'ui/adapter/state/useWalletState';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import Transaction from 'ui/transaction/components/display/Transaction/Transaction';
import { TransactionSkeleton } from 'ui/transaction/components/feedback/TransactionSkeleton/TransactionSkeleton';

import useGetTransactions from '../../query/useGetTransactions';

export type TransactionListProps = {
  className?: string;
  style?: React.CSSProperties;
  container?: InfiniteScrollProps['container'];
  nothingToShow?: React.ReactNode;
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
        return (
          <Col key={i} gap={spacing[8]}>
            <Transaction key={i} tx={tx} accountAddress={address!} />
          </Col>
        );
      }}
      end={!hasNextPage}
      isLoading={loading}
      Skeleton={TransactionSkeleton}
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
