import { BalanceProps } from './Balance.types';
import { BalanceRoot } from './Balance.styles';
import { Skeleton } from '@peersyst/react-components';
import clsx from 'clsx';
import { useFormatBalance } from './hooks/useFormatBalance';

export function Balance({
  className,
  balance,
  currency,
  currencyPosition,
  action,
  options,
  loading = false,
  hidden = false,
  hiddenLength = 6,
  hiddenPlaceholder = '· ',
  ...typographyProps
}: BalanceProps): JSX.Element {
  const formatBalance = useFormatBalance({
    numberFormatOptions: options,
    currency,
    currencyPosition,
    action,
    hidden,
    hiddenLength,
    hiddenPlaceholder,
  });

  return (
    <Skeleton loading={loading}>
      <BalanceRoot
        className={clsx('Balance', className)}
        action={action}
        numberOfLines={1}
        {...typographyProps}
      >
        {formatBalance(balance)}
      </BalanceRoot>
    </Skeleton>
  );
}

export default Balance;
