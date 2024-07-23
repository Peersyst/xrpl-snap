import type { SelectOption, SelectProps } from '@peersyst/react-components';
import { Col, Row, Typography } from '@peersyst/react-components';
import { useControlled } from '@peersyst/react-hooks';
import clsx from 'clsx';
import type { TokenWithBalance } from 'common/models/token';
import { useMemo } from 'react';
import Balance from 'ui/common/components/display/Balance/Balance';
import TokenIcon from 'ui/token/components/display/TokenIcon/TokenIcon';
import useGetTokens from 'ui/wallet/query/useGetTokens';

import { TokenSelectRoot } from './TokenSelect.styles';
import TokenSelectDropdownElement from './TokenSelectDropdownElement/TokenSelectDropdownElement';

export type TokenSelectProps = Omit<SelectProps<TokenWithBalance | undefined>, 'children' | 'options'>;

function TokenSelectItem({ token }: { token: TokenWithBalance }) {
  return (
    <Row alignItems="center" gap="0.75rem">
      <TokenIcon token={token} />
      <Col gap="0.5rem">
        <Typography variant={'body1'} fontWeight="500" numberOfLines={1}>
          {`${token.currency.toUpperCase()}`}
        </Typography>
        <Balance balance={token.balance.formatAmount()} currency={token.currency} variant="body1" fontWeight={400} light />
      </Col>
    </Row>
  );
}

function TokenSelect({
  className,
  value,
  onChange,
  defaultValue,
  open: openProp,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  placeholder,
  ...rest
}: TokenSelectProps) {
  const { data: tokens = [] } = useGetTokens();
  const [token, setToken] = useControlled<TokenWithBalance | undefined>(defaultValue, value, onChange);
  const [open, setOpen] = useControlled(false, openProp, openProp ? onCloseProp : onOpenProp);

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
    <TokenSelectRoot
      value={token}
      // @ts-ignore
      onChange={(v) => setToken(v)}
      className={clsx('TokenSelect', className)}
      renderValue={() => (
        <Col>
          <Typography className={clsx(!token && 'Placeholder')} variant="body1" fontWeight={token ? '500' : undefined}>
            {token ? token?.currency : placeholder}
          </Typography>
        </Col>
      )}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      dropdownElement={<TokenSelectDropdownElement open={open} />}
      {...rest}
      options={options}
    />
  );
}

export default TokenSelect;
