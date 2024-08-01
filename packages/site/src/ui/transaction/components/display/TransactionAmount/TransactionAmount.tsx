import { Col } from '@peersyst/react-components';
import { XrplTx } from 'common/models/transaction/tx.types';
import { parseCurrencyCode } from 'common/utils/token/currencyCode';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import { BalanceProps } from 'ui/common/components/display/Balance/Balance.types';
import { ThemeSpacingKeys } from 'ui/config/spacing';
import FiatBalance from 'ui/wallet/containers/FiatBalance/FiatBalance';

import useTransactionAmount from './hooks/useTransactionAmount';

export interface TransactionAmountProps {
  className?: string;
  style?: React.CSSProperties;
  showFiat?: boolean;
  gap?: ThemeSpacingKeys;
  tx: XrplTx;
  loading?: boolean;
  balanceProps?: Omit<BalanceProps, 'balance' | 'currency'>;
  fiatBalanceProps?: Omit<BalanceProps, 'balance' | 'currency'>;
  align?: 'start' | 'center' | 'end';
}

function TransactionAmount({
  className,
  tx,
  showFiat = true,
  gap = 1,
  loading,
  balanceProps,
  fiatBalanceProps,
  align = 'end',
  ...rest
}: TransactionAmountProps): JSX.Element {
  const { spacing } = useTheme();

  const [token, amount] = useTransactionAmount(tx) ?? [];

  if (!amount || !token) {
    return <></>;
  }

  const currency = token.currency === 'XRP' ? 'XRP' : parseCurrencyCode(token.currency);

  return (
    <Col gap={spacing[gap]} alignItems={align} {...rest}>
      <Balance balance={amount.formatAmount()} currency={currency} variant="body1" loading={loading} {...balanceProps} />
      {showFiat && (
        <FiatBalance balance={amount.formatAmount()} token={token} variant="body2" light loading={loading} {...fiatBalanceProps} />
      )}
    </Col>
  );
}

export default TransactionAmount;
