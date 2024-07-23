import { Col, Row, Typography } from '@peersyst/react-components';
import type { TokenWithBalance } from 'common/models/token';
import Balance from 'ui/common/components/display/Balance/Balance';
import TokenIcon from 'ui/token/components/display/TokenIcon/TokenIcon';

export interface TokenSelectItemProps {
  token: TokenWithBalance;
}

export default function TokenSelectItem({ token }: TokenSelectItemProps) {
  return (
    <Row alignItems="center" gap="0.75rem" flex={1}>
      <TokenIcon token={token} />
      <Col gap="0.5rem">
        <Typography variant={'body1'} fontWeight="500" numberOfLines={1}>
          {`${token.currency.toUpperCase()}`}
        </Typography>
        <Balance balance={token.balance.formatAmount()} currency={token.currency} variant="body1" fontWeight={400} light />
      </Col>
    </Row>
  );
}
