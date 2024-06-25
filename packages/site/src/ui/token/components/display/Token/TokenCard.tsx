import { Col, Skeleton, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';

import TokenIcon from '../TokenIcon/TokenIcon';
import { TokenCardRoot } from './TokenCard.styles';
import type { TokenCardProps } from './TokenCard.types';

export function TokenCard({ className, token, balance, loading = false }: TokenCardProps): JSX.Element {
  const { spacing } = useTheme();

  return (
    <TokenCardRoot className={clsx('Token', className)} gap={spacing[5]}>
      <Col>
        <Skeleton shape="circular" loading={loading} css={{ width: '2.5rem', height: '2.5rem' }}>
          {!loading && <TokenIcon token={token} loading={loading} size="2.5rem" />}
        </Skeleton>
      </Col>

      <Col gap={spacing[1]} justifyContent="center">
        <Skeleton loading={loading}>
          <Typography variant={'body1'} fontWeight="500" numberOfLines={1}>
            {token.currency.toUpperCase()}
          </Typography>
        </Skeleton>
        <Balance balance={balance} currency={token.currency} variant="body2" fontWeight={400} loading={loading} light />
      </Col>
    </TokenCardRoot>
  );
}

export default TokenCard;
