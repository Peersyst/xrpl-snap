import { Col, InfiniteScrollProps } from '@peersyst/react-components';
import clsx from 'clsx';
import type { TokenWithBalance } from 'common/models/token';
import useWalletState from 'ui/adapter/state/useWalletState';
import { InfiniteList } from 'ui/common/components/display/InfiniteList/InfiniteList';
import NothingToShow from 'ui/common/components/feedback/NothingToShow/NothingToShow';
import { useTranslate } from 'ui/locale';
import TokenCard from 'ui/token/components/display/TokenCard/TokenCard';

import useGetTokens from '../../../wallet/query/useGetTokens';
import AddTokenButton from '../../components/input/AddTokenButton/AddTokenButton';

export type TokenListProps = {
  className?: string;
  style?: React.CSSProperties;
  container?: InfiniteScrollProps['container'];
};

const TokenCardSkeleton = () => (
  <TokenCard
    token={{
      decimals: 0,
      issuer: '',
      currency: 'AAAAA',
    }}
    loading
    balance={'100000'}
  />
);

function TokenList({ className, ...rest }: TokenListProps) {
  const translate = useTranslate();

  const { address } = useWalletState();
  const { data, isLoading } = useGetTokens();

  return (
    <Col style={{ height: '29rem', justifyContent: 'space-between' }}>
      <InfiniteList<TokenWithBalance>
        className={clsx('TokenList', className)}
        renderItem={(token, i) => <TokenCard key={i} token={token} balance={token.balance.formatAmount()} />}
        isLoading={isLoading || !address}
        Skeleton={TokenCardSkeleton}
        numberOfSkeletons={5}
        data={data}
        end={true}
        nothingToShow={<NothingToShow css={{ paddingTop: '2rem' }} message={translate('nothingToShow', { context: 'token' })} />}
        onEndReached={() => ''}
        {...rest}
      />
      <AddTokenButton />
    </Col>
  );
}

export default TokenList;
