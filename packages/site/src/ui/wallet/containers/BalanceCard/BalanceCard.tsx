import { Col, Row, useConfig, useTheme } from '@peersyst/react-components';

import {
  balance_card_left_border,
  balance_card_right_border,
} from '../../../assets/images';
import Balance from '../../../common/components/display/Balance/Balance';
import { BalanceCardImageBorder, BalanceCardRoot } from './BalanceCard.styles';
import ReceiveModalButton from './ReceiveModalButton';
import SendModalButton from './SendModalButton';
import useGetBalance from 'ui/wallet/query/useGetBalance';
import useGetXrpFiatPriceFromAmount from 'ui/wallet/hooks/useGetXrpFiatPriceFromAmount';
import useWalletState from 'ui/adapter/state/useWalletState';

export type BalanceCardProps = {
  className?: string;
  style?: React.CSSProperties;
};

function BalanceCard({ className, ...rest }: BalanceCardProps) {
  const { spacing } = useTheme();
  const { getXrpFiatPriceFromAmount, isLoading: isPriceLoading } =
    useGetXrpFiatPriceFromAmount();
  const fiatCurrency = useConfig('fiatCurrency');
  const { address } = useWalletState();
  const { data: balance, isLoading } = useGetBalance();

  const loading = isLoading || isPriceLoading || !address;

  const formattedBalance = balance?.formatAmount() ?? '0';
  const fiatBalance = getXrpFiatPriceFromAmount(Number(formattedBalance));

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
            loading={loading}
            fontWeight="600"
            balance={formattedBalance}
            currency={balance?.currency ?? 'XRP'}
            variant="h2"
          />
          <Balance
            loading={loading}
            balance={fiatBalance}
            currency={fiatCurrency}
            fontWeight="500"
            variant="body1"
            options={{
              maximumFractionDigits: 2,
            }}
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
