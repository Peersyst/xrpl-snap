import clsx from 'clsx';
import Amount from 'common/utils/Amount';
import { useTheme } from 'styled-components';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TransactionCard from 'ui/transaction/components/TransactionCard/TransactionCard';
import type { Payment } from 'xrpl';
import { rippleTimeToUnixTime } from 'xrpl';
import type { ResponseOnlyTxInfo } from 'xrpl/src/models/common';

import type { Token } from '../../../../common/models/token';
import useGetAddress from '../../../wallet/hooks/useGetAddress';
import useGetTransactions from '../../query/useGetTransactions';

export type TransactionListProps = {
  className?: string;
  style?: React.CSSProperties;
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

function TransactionList({ className, ...rest }: TransactionListProps) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const address = useGetAddress();
  const { data, fetchNextPage, isLoading } = useGetTransactions();

  const extractTransactionProps = (
    transaction: Payment & ResponseOnlyTxInfo,
  ) => {
    const direction: 'out' | 'in' =
      transaction.Account === address ? 'out' : 'in';
    const timestamp = rippleTimeToUnixTime(transaction.date!);
    const account =
      direction === 'out' ? transaction.Destination : transaction.Account;
    const token: Token =
      typeof transaction.Amount === 'string'
        ? { currency: 'XRP', issuer: '', decimals: 6 }
        : {
            currency: transaction.Amount.currency,
            issuer: transaction.Amount.issuer,
            decimals: 15,
          };
    const amount = new Amount(
      typeof transaction.Amount === 'string'
        ? transaction.Amount
        : transaction.Amount.value,
      token.decimals,
      token.currency,
    );

    new Amount('1', 6, 'XRP') // 0.00001
    return { direction, timestamp, account, token, amount };
  };

  return (
    <InfiniteList
      className={clsx('TransactionList', className)}
      renderItem={(tx, i) => {
        const props = extractTransactionProps(tx);
        return <TransactionCard key={i} {...props} />;
      }}
      isLoading={isLoading}
      Skeleton={TransactionCardSkeleton}
      numberOfSkeletons={5}
      data={data?.pages.flatMap((page) => page.transactions)}
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
