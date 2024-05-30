import { TokenProps } from './Token.types';
import { TokenRoot } from './Token.styles';
import { Col, Row, Skeleton, Typography } from '@peersyst/react-components';
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
  const getTokenIcon = useGetTokenIcon();
  const { spacing } = useTheme();

  return (
    <Skeleton loading={loading}>
      <TokenRoot
        className={clsx('Token', className)}
        gap={spacing[5]}
      >
        <Col>
          {getTokenIcon(token)}
        </Col>
        <Col gap={spacing[1]}>
          <Row>
            <Typography variant={"button"}>{token.currency}</Typography>
          </Row>
          <Balance balance={balance} currency={token.currency} variant="caption" fontWeight={400} light />
        </Col>
      </TokenRoot>
    </Skeleton>
  );
}

export default Token;
