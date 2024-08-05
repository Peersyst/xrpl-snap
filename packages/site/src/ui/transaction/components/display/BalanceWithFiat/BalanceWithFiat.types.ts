import { Token } from 'common/models';
import { BalanceProps } from 'ui/common/components/display/Balance/Balance.types';
import { ThemeSpacingKeys } from 'ui/config/spacing';

export interface BalanceWithFiatProps {
  className?: string;
  style?: React.CSSProperties;
  showFiat?: boolean;
  gap?: ThemeSpacingKeys;
  loading?: boolean;
  balance: string;
  currency: string;
  token: Token;
  balanceProps?: Omit<BalanceProps, 'balance' | 'currency'>;
  fiatBalanceProps?: Omit<BalanceProps, 'balance' | 'currency'>;
  align?: 'start' | 'center' | 'end';
}
