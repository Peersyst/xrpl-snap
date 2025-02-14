import { Col, Skeleton, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import BaseCardListItem from 'ui/common/components/display/BaseCardListItem/BaseCardListItem';

import TokenIcon from '../TokenIcon/TokenIcon';
import type { TokenCardProps } from './TokenCard.types';

export function TokenCard({ className, token, balance, loading = false }: TokenCardProps): JSX.Element {
  const { spacing } = useTheme();

  const parsedCurrency = parseCurrencyCode(token.currency);
  return (
    <BaseCardListItem className={clsx('Token', className)} gap={spacing[5]}>
      <Col>
        <Skeleton shape="circular" loading={loading} css={{ width: '2.5rem', height: '2.5rem' }}>
          {!loading && <TokenIcon token={token} loading={loading} size="2.5rem" />}
        </Skeleton>
      </Col>

      <Col gap={spacing[1]} justifyContent="center">
        <Skeleton loading={loading}>
          <Typography variant={'body1'} fontWeight="500" numberOfLines={1}>
            {parsedCurrency.toUpperCase()}
          </Typography>
        </Skeleton>
        <Balance
          balance={balance}
          currency={parsedCurrency}
          variant="body2"
          fontWeight={400}
          loading={loading}
          light
          options={{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
        />
      </Col>
    </BaseCardListItem>
  );
}

export default TokenCard;
