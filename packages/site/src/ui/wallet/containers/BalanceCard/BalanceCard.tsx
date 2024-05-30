import { Col, Row, useTheme } from '@peersyst/react-components';
import { BalanceCardImageBorder, BalanceCardRoot } from './BalanceCard.styles';
import {
  balance_card_left_border,
  balance_card_right_border,
} from '../../../assets/images';
import Balance from '../../../common/components/display/Balance/Balance';
import ReceiveModalButton from './ReceiveModalButton';
import SendModalButton from './SendModalButton';

export interface BalanceCardProps {
  className?: string;
  style?: React.CSSProperties;
}

function BalanceCard({ className, ...rest }: BalanceCardProps) {
  const { spacing } = useTheme();

  return (
    <BalanceCardRoot {...rest}>
      <BalanceCardImageBorder src={balance_card_left_border} />
      <Col
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap={spacing[8]}
      >
        <Col gap={spacing[2]} alignItems="center">
          <Balance
            fontWeight="600"
            balance={'3298.09'}
            currency="XRP"
            variant="h2"
          />
          <Balance
            balance={'3298.09'}
            currency="USD"
            fontWeight="500"
            variant="body1"
            light
          />
        </Col>
        <Row gap={spacing[3]} alignItems="center">
          <SendModalButton />
          <ReceiveModalButton />
        </Row>
      </Col>
      <BalanceCardImageBorder src={balance_card_right_border} />
    </BalanceCardRoot>
  );
}

export default BalanceCard;
