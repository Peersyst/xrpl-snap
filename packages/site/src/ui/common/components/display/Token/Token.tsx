import { TokenProps } from './Token.types';
import { TokenRoot } from './Token.styles';
import { Col, Skeleton, Typography } from '@peersyst/react-components';
import Balance from '../Balance/Balance';
import { useGetTokenIcon } from './hooks/useGetTokenIcon';
import { useTheme } from 'styled-components';
import clsx from 'clsx';

export function Token({
  className,
  token,
  balance,
  loading = false,
}: TokenProps): JSX.Element {
  const tokenIcon = useGetTokenIcon(token);
  const { spacing } = useTheme();

  return (
    <Skeleton loading={loading}>
      <TokenRoot className={clsx('Token', className)} gap={spacing[5]}>
        {tokenIcon}
        <Col gap={spacing[1]} justifyContent="center">
          <Typography variant={'body1'} fontWeight="500">
            {token.currency}
          </Typography>
          <Balance
            balance={balance}
            currency={token.currency}
            variant="body2"
            fontWeight={400}
            light
          />
        </Col>
      </TokenRoot>
    </Skeleton>
  );
}

export default Token;
