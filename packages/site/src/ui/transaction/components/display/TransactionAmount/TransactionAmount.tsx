import { Col, TypographyProps } from '@peersyst/react-components';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
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
  balanceProps?: TypographyProps;
  fiatBalanceProps?: TypographyProps;
}

function TransactionAmount({
  className,
  tx,
  showFiat = true,
  gap = 1,
  loading,
  balanceProps,
  fiatBalanceProps,
  ...rest
}: TransactionAmountProps): JSX.Element {
  const { spacing } = useTheme();

  const [token, amount] = useTransactionAmount(tx) ?? [];

  if (!amount || !token) {
    return <></>;
  }

  return (
    <Col gap={spacing[gap]} alignItems="end" {...rest}>
      <Balance balance={amount.formatAmount()} currency={token.currency} variant="body1" loading={loading} {...balanceProps} />
      {showFiat && (
        <FiatBalance balance={amount.formatAmount()} token={token} variant="body2" light loading={loading} {...fiatBalanceProps} />
      )}
    </Col>
  );
}

export default TransactionAmount;
