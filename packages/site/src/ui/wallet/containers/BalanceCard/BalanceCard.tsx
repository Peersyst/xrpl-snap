import { Col, Row, useTheme } from '@peersyst/react-components';

import {
  balance_card_left_border,
  balance_card_right_border,
} from '../../../assets/images';
import Balance from '../../../common/components/display/Balance/Balance';
import useGetTokens from '../../query/useGetTokens';
import { BalanceCardImageBorder, BalanceCardRoot } from './BalanceCard.styles';
import ReceiveModalButton from './ReceiveModalButton';
import SendModalButton from './SendModalButton';

export type BalanceCardProps = {
  className?: string;
  style?: React.CSSProperties;
};

function BalanceCard({ className, ...rest }: BalanceCardProps) {
  const { spacing } = useTheme();

  const { data: tokens, isLoading } = useGetTokens();

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
            loading={isLoading}
            fontWeight="600"
            balance={
              tokens?.find((token) => token.currency === 'XRP')?.balance
                ?.amount || '0'
            }
            currency="XRP"
            variant="h2"
          />
          <Balance
            loading={isLoading}
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
      <BalanceCardImageBorder
        css={{ borderTopRightRadius: '1rem' }}
        src={balance_card_right_border}
      />
    </BalanceCardRoot>
  );
}

export default BalanceCard;
