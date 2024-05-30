import clsx from 'clsx';
import { Token } from 'common/models/token';
import { useEffect, useState } from 'react';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TokenCard from 'ui/token/components/display/Token/TokenCard';

export interface TokenListProps {
  className?: string;
  style?: React.CSSProperties;
}

const TokenCardSkeleton = () => (
  <TokenCard
    token={{
      decimals: 0,
      issuer: '',
      currency: 'loading...',
    }}
    loading
    balance={'100000'}
  />
);

function TokenList({ className, ...rest }: TokenListProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Token[]>([]);
  const translate = useTranslate();

  function fetchNextPage() {}

  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const random = Math.random();
      setData(
        random > 0.5
          ? []
          : ['XRP', 'USDC', 'USDT'].map((currency) => ({
              currency,
              issuer: 'blabla',
              decimals: 0,
            })),
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <InfiniteList<Token>
      className={clsx('TokenList', className)}
      renderItem={(token, i) => (
        <TokenCard key={i} token={token} balance={'3.14'} />
      )}
      isLoading={loading}
      Skeleton={TokenCardSkeleton}
      numberOfSkeletons={5}
      data={data}
      nothingToShow={
        <NothingToShow
          css={{ paddingTop: '2rem' }}
          message={translate('nothingToShow', { context: 'token' })}
        />
      }
      onEndReached={fetchNextPage}
      {...rest}
    />
  );
}

export default TokenList;
