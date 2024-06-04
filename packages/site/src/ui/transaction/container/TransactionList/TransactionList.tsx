import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { useTheme } from 'styled-components';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TransactionCard from 'ui/transaction/components/TransactionCard/TransactionCard';
import type { Payment, Amount as XrplAmount } from 'xrpl';
import { rippleTimeToUnixTime } from 'xrpl';
import type { ResponseOnlyTxInfo } from 'xrpl/src/models/common';
import type { Token } from '../../../../common/models/token';
import useGetTransactions from '../../query/useGetTransactions';
import { InfiniteScrollProps } from '@peersyst/react-components';
import useWalletState from 'ui/adapter/state/useWalletState';

export type TransactionListProps = {
  className?: string;
  style?: React.CSSProperties;
  container?: InfiniteScrollProps['container'];
};

function TransactionList({ className, ...rest }: TransactionListProps) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const { address } = useWalletState();

  const {
    data,
    fetchNextPage,
    isLoading,
    isRefetching,
    isFetching,
    hasNextPage,
  } = useGetTransactions();

  function handleEndReached() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <InfiniteList
      className={clsx('TransactionList', className)}
      renderItem={(tx, i) => {
        const props = extractTransactionProps(tx, address || '');
        return <TransactionCard key={i} {...props} />;
      }}
      end={!hasNextPage}
      isLoading={(!address || isFetching) && !isRefetching}
      Skeleton={TransactionCardSkeleton}
      numberOfSkeletons={isLoading || !isFetching ? 5 : 3}
      data={data?.pages.flatMap((page) => page.transactions)}
      nothingToShow={
        <NothingToShow
          css={{ marginTop: spacing[4] }}
          message={translate('nothingToShow', { context: 'tx' })}
        />
      }
      gap={spacing[8]}
      onEndReached={handleEndReached}
      {...rest}
    />
  );
}

const extractTransactionProps = (
  transaction: Payment & ResponseOnlyTxInfo,
  address: string,
) => {
  const direction: 'out' | 'in' = getTransactionDirection(transaction, address);
  const timestamp = rippleTimeToUnixTime(transaction.date!);
  const account =
    direction === 'out' ? transaction.Destination : transaction.Account;
  const token = getTransactionToken(transaction.Amount);
  const amount = getTransactionAmount(transaction.Amount);
  return { direction, timestamp, account, token, amount };
};

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

function getTransactionAmount(amount: XrplAmount): Amount {
  if (typeof amount === 'string') {
    return new Amount(amount, 6, 'XRP');
  } else {
    return new Amount(amount.value, 15, amount.currency);
  }
}

function getTransactionToken(amount: XrplAmount): Token {
  if (typeof amount === 'string') {
    return { currency: 'XRP', issuer: '', decimals: 6 };
  } else {
    return { currency: amount.currency, issuer: amount.issuer, decimals: 15 };
  }
}

function getTransactionDirection(
  transaction: Payment & ResponseOnlyTxInfo,
  address: string,
): 'out' | 'in' {
  return transaction.Account === address ? 'out' : 'in';
}

export default TransactionList;
