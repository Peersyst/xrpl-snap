import { TransactionProps } from './Transaction.types';
import { DirectionLogo, TransactionRoot } from './Transaction.styles';
import { BlockchainAddress, Col, Row, Skeleton, Typography } from '@peersyst/react-components';
import { useTheme } from 'styled-components';
import { received, sent } from '../../../../assets/images';
import Balance from '../Balance/Balance';
import { useTranslate } from '../../../../locale';
import DateDisplay from '../DateDisplay/DateDisplay';
import { DateFormat } from '../DateDisplay/hooks/formatDate.types';

export function Transaction({
  account,
  direction,
  timestamp,
  amount,
  token,
  loading = false,
}: TransactionProps): JSX.Element {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const directionLogo = direction === "in" ? received: sent
  const directionPrefix = direction === "in" ? translate('receivedFrom'): translate('sentTo');
  return (
    <Skeleton loading={loading}>
      <TransactionRoot gap={spacing[5]}>
        <Col>
          <DirectionLogo src={directionLogo} />
        </Col>
        <Col gap={spacing[1]}>
          <Row gap={spacing[1]}>
            <Typography variant="body1">{directionPrefix}</Typography><BlockchainAddress variant="body1" address={account} type="account" length={4} />
          </Row>
          <Row>
            <DateDisplay date={timestamp}  format={DateFormat.DATE_TIME} variant="body2" light/>
          </Row>
        </Col>
        <Col gap={spacing[1]} alignItems="end">
          <Row>
            <Balance balance={amount.amount} currency={token.currency} variant="body1" />
          </Row>
          <Row>
            <Balance balance={amount.amount} currency={token.currency} variant="body2" light />
          </Row>
        </Col>
      </TransactionRoot>
    </Skeleton>
  );
}

export default Transaction;
