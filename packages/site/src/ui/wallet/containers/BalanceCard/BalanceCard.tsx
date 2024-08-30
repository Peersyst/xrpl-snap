import { Col, Row, Skeleton, useConfig, useTheme } from '@peersyst/react-components';
import clsx from 'clsx';
import useWalletState from 'ui/adapter/state/useWalletState';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import useGetXrpFiatPriceFromAmount from 'ui/wallet/hooks/useGetXrpFiatPriceFromAmount';
import useGetBalance from 'ui/wallet/query/useGetBalance';

import { balance_card_left_border, balance_card_right_border } from '../../../assets/images';
import Balance from '../../../common/components/display/Balance/Balance';
import BalanceDetailsInfoIcon from '../BalanceDetailsInfoIcon/BalanceDetailsInfoIcon';
import { BalanceCardImageBorder, BalanceCardRoot } from './BalanceCard.styles';
import BuyModalButton from './BuyModalButton';
import ReceiveModalButton from './ReceiveModalButton';
import SendModalButton from './SendModalButton';

export type BalanceCardProps = {
  className?: string;
  style?: React.CSSProperties;
};

function BalanceCard({ className, ...rest }: BalanceCardProps) {
  const { spacing } = useTheme();
  const { getXrpFiatPriceFromAmount, isLoading: isPriceLoading } = useGetXrpFiatPriceFromAmount();
  const fiatCurrency = useConfig('fiatCurrency');
  const fiatDecimals = useConfig('fiatDecimals');
  const { address } = useWalletState();
  const { data: network } = useGetActiveNetwork();

  const { data: balance, isLoading } = useGetBalance();

  const loading = isLoading || isPriceLoading || !address;

  const formattedBalance = balance?.formatAmount() ?? '0';
  const fiatBalance = getXrpFiatPriceFromAmount(Number(formattedBalance));

  return (
    <BalanceCardRoot className={clsx('BalanceCard', className)} {...rest}>
      <BalanceCardImageBorder alt="bg-image" src={balance_card_left_border} />
      <Col flex={1} alignItems="center" justifyContent="center" gap={spacing[8]}>
        <Col gap={spacing[2]} alignItems="center">
          <Row alignItems="center" gap="0.5rem">
            <Balance loading={loading} fontWeight="600" balance={formattedBalance} currency={balance?.currency ?? 'XRP'} variant="h2" />
            <BalanceDetailsInfoIcon />
          </Row>
          <Balance
            loading={loading}
            balance={fiatBalance}
            currency={fiatCurrency}
            fontWeight="500"
            variant="body1"
            options={{
              maximumFractionDigits: fiatDecimals,
            }}
            light
          />
        </Col>
        <Skeleton loading={!network}>
          <Row gap={spacing[3]} alignItems="center">
            <SendModalButton />
            <ReceiveModalButton />
            <BuyModalButton />
          </Row>
        </Skeleton>
      </Col>
      <BalanceCardImageBorder alt="bg-image" css={{ borderTopRightRadius: '1rem' }} src={balance_card_right_border} />
    </BalanceCardRoot>
  );
}

export default BalanceCard;
