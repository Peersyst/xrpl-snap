import type { InfiniteScrollProps } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { useTheme } from 'styled-components';
import useWalletState from 'ui/adapter/state/useWalletState';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TransactionCard from 'ui/transaction/components/TransactionCard/TransactionCard';
import { rippleTimeToUnixTime } from 'xrpl';

import type { Token } from '../../../../common/models/token';
import useGetTransactions from '../../query/useGetTransactions';

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

const extractTransactionProps = (transaction: XrplTx, address: string) => {
  const direction: 'out' | 'in' = getTransactionDirection(transaction, address);
  const timestamp = rippleTimeToUnixTime(transaction.date!);
  // @ts-ignore
  const account = direction === 'out' ? transaction.Destination || transaction.Account : transaction.Account;
  const token = getTransactionToken(transaction);
  const amount = getTransactionAmount(transaction, token);
  return { direction, timestamp, account, token, amount, txHash: transaction.hash ?? '', txType: transaction.TransactionType };
};

const TransactionCardSkeleton = () => (
  <TransactionCard
    txType="Payment"
    txHash=""
    direction="in"
    timestamp={new Date().getTime()}
    account="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA"
    amount={new Amount('46791', 2, 'USD')}
    token={{ currency: 'USD', issuer: '', decimals: 0 }}
    loading
  />
);

function getTransactionAmount(tx: XrplTx, token?: Token): Amount | undefined {
  if (!token) {
    return;
  }
  if ('Amount' in tx) {
    if (typeof tx.Amount === 'string') {
      return new Amount(tx.Amount, 6, 'XRP');
    } else if (typeof tx.Amount === 'object') {
      return Amount.fromDecToken(tx.Amount.value, token);
    }
  }
}

function getTransactionToken(tx: XrplTx): Token | undefined {
  if ('Amount' in tx && typeof tx.Amount !== undefined) {
    if (typeof tx.Amount === 'string') {
      return { currency: 'XRP', issuer: '', decimals: 6 };
    }
    return { currency: tx.Amount?.currency || '', issuer: tx.Amount?.issuer || '', decimals: 15 };
  }
}

function getTransactionDirection(transaction: XrplTx, address: string): 'out' | 'in' {
  if ('Destination' in transaction && transaction.Destination === transaction.Account) {
    return 'in';
  }
  return transaction.Account === address ? 'out' : 'in';
}

export default TransactionList;
