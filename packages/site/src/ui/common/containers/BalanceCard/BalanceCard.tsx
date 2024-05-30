import { Col, Row, useTheme } from '@peersyst/react-components';
import { BalanceCardImageBorder, BalanceCardRoot } from './BalanceCard.styles';
import { useTranslate } from '../../../locale';
import { balance_card_left_border, balance_card_right_border } from '../../../assets/images';
import Balance from '../../components/display/Balance/Balance';
import Button from '../../components/input/Button/Button';

export interface SideBarProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function BalanceCard({ className, children, ...rest }: SideBarProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  return (
    <BalanceCardRoot>
      <BalanceCardImageBorder src={balance_card_left_border} />
      <Col flex={1} alignItems="center" gap={spacing[8]} style={{ padding: '2rem' }}>
        <Col gap={spacing[2]} alignItems="center">
          <Balance balance={"3298.09"} currency="XRP" variant="h2" />
          <Balance balance={"3298.09"} currency="USD" variant="body1" light />
        </Col>
        <Row gap={spacing[3]}>
          <Button variant="secondary">{translate('receive')}</Button>
          <Button variant="secondary">{translate('send')}</Button>
        </Row>
      </Col>
      <BalanceCardImageBorder src={balance_card_right_border} />
    </BalanceCardRoot>
  );
}

export default BalanceCard;
