import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import FiatBalance from 'ui/wallet/containers/FiatBalance/FiatBalance';

import { BalanceWithFiatProps } from './BalanceWithFiat.types';

function BalanceWithFiat({
  className,
  showFiat = true,
  gap = 1,
  loading,
  balanceProps,
  fiatBalanceProps,
  align = 'end',
  currency: currencyProp,
  balance,
  token,
  ...rest
}: BalanceWithFiatProps): JSX.Element {
  const { spacing } = useTheme();

  const currency = currencyProp === 'XRP' ? 'XRP' : parseCurrencyCode(currencyProp);

  return (
    <Col className={clsx('BalanceWithFiat', className)} gap={spacing[gap]} alignItems={align} {...rest}>
      <Balance balance={balance} currency={currency} variant="body1" loading={loading} {...balanceProps} />
      {showFiat && <FiatBalance balance={balance} token={token} variant="body2" light loading={loading} {...fiatBalanceProps} />}
    </Col>
  );
}

export default BalanceWithFiat;
