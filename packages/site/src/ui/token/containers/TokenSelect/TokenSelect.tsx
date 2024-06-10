import type { SelectOption, SelectProps } from '@peersyst/react-components';
import { Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import type { TokenWithBalance } from 'common/models/token';
import { useMemo } from 'react';
import Balance from 'ui/common/components/display/Balance/Balance';
import { getTokenIcon } from 'ui/token/components/display/Token/utils/getTokenIcon';
import useGetTokens from 'ui/wallet/query/useGetTokens';

import { TokenSelectRoot } from './TokenSelect.styles';

export type TokenSelectProps = {} & Omit<SelectProps<TokenWithBalance>, 'children' | 'options'>;

function TokenSelectItem({ token }: { token: TokenWithBalance }) {
  const getIcon = getTokenIcon();
  const Icon = getIcon(token);

  return (
    <Row alignItems="center" gap="0.75rem">
      <Icon
        style={{
          filter: 'unset',
          fontSize: '1.5rem',
          width: '1.5rem',
          height: '1.5rem',
        }}
      />
      <Row gap="0.5rem">
        <Typography variant={'body1'} fontWeight="500" numberOfLines={1}>
          {`${token.currency.toUpperCase()} - `}
        </Typography>
        <Balance balance={token.balance.formatAmount()} currency={token.currency} variant="body1" fontWeight={400} light />
      </Row>
    </Row>
  );
}

function TokenSelect({ className, ...rest }: TokenSelectProps) {
  const { data: tokens = [] } = useGetTokens();
  const options: SelectOption<TokenWithBalance>[] = useMemo(() => {
    return tokens.map((token) => {
      return {
        label: <TokenSelectItem token={token} />,
        value: token,
      };
    });
  }, [tokens]);

  return (
    // @ts-ignore
    <TokenSelectRoot className={clsx('TokenSelect', className)} {...rest} options={options} />
  );
}

export default TokenSelect;
