import { TransactionCardProps } from './TransactionCard.types';
import { DirectionLogo, TransactionCardRoot } from './TransactionCard.styles';
import {
  BlockchainAddress,
  Col,
  Row,
  Skeleton,
  Typography,
} from '@peersyst/react-components';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import DateDisplay from 'ui/common/components/display/DateDisplay/DateDisplay';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import { useTranslate } from 'ui/locale';
import { received, sent } from 'ui/assets/images';

export function TransactionCard({
  account,
  direction,
  timestamp,
  amount,
  token,
  loading = false,
}: TransactionCardProps): JSX.Element {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const isReceiver = direction === 'in';

  return (
    <TransactionCardRoot gap={spacing[5]}>
      <DirectionLogo
        src={isReceiver ? received : sent}
        loading={loading}
        alt="transaction-logo"
      />
      <Row justifyContent="space-between" css={{ flex: 1 }}>
        <Col gap={spacing[1]}>
          <Skeleton loading={loading}>
            <Row gap={spacing[1]}>
              <Typography variant="body1">
                {translate(isReceiver ? 'receivedFrom' : 'sentTo')}
              </Typography>

              <BlockchainAddress
                variant="body1"
                address={account}
                type="account"
                length={4}
              />
            </Row>
          </Skeleton>
          <Skeleton loading={loading}>
            <DateDisplay
              date={timestamp}
              format={DateFormat.DATE_TIME}
              variant="body2"
              light
            />
          </Skeleton>
        </Col>
        <Col gap={spacing[1]} alignItems="end">
          <Balance
            balance={amount.amount}
            currency={token.currency}
            variant="body1"
            loading={loading}
          />
          <Balance
            balance={amount.amount}
            currency={token.currency}
            variant="body2"
            light
            loading={loading}
          />
        </Col>
      </Row>
    </TransactionCardRoot>
  );
}

export default TransactionCard;
