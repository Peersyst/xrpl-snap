import clsx from 'clsx';
import { config } from 'common/config';
import { Token } from 'common/models';
import Balance from 'ui/common/components/display/Balance/Balance';
import { BalanceProps } from 'ui/common/components/display/Balance/Balance.types';
import useGetTokenInfo from 'ui/token/query/useGetTokenInfo';
import useGetXrpFiatPriceFromAmount from 'ui/wallet/hooks/useGetXrpFiatPriceFromAmount';

export interface FiatBalanceProps extends Omit<BalanceProps, 'currency'> {
  token: Token;
  loading?: boolean;
}

function TokenFiatBalance({ className, token, balance, loading, ...rest }: FiatBalanceProps) {
  const { getXrpFiatPriceFromAmount } = useGetXrpFiatPriceFromAmount();
  const { data: { price = 0 } = {} } = useGetTokenInfo(token, { enabled: !loading || token.currency === 'XRP' });
  const xrpEquivalentBalance = BigNumber(balance).times(price).toNumber();
  const fiatBalance = getXrpFiatPriceFromAmount(xrpEquivalentBalance);
  return (
    <Balance
      loading={loading}
      action="round"
      balance={fiatBalance}
      currency={config.fiatCurrency}
      className={clsx('TokenFiatBalance', className)}
      {...rest}
    />
  );
}

function XrpFiatBalance({ className, balance, ...rest }: FiatBalanceProps) {
  const { getXrpFiatPriceFromAmount } = useGetXrpFiatPriceFromAmount();
  const fiatBalance = getXrpFiatPriceFromAmount(Number(balance));
  return (
    <Balance action="round" currency={config.fiatCurrency} balance={fiatBalance} className={clsx('XrpFiatBalance', className)} {...rest} />
  );
}

function FiatBalance({ className, token, loading, ...rest }: FiatBalanceProps) {
  if (token.currency === 'XRP') {
    return <XrpFiatBalance className={clsx('FiatBalance', className)} token={token} loading={loading} {...rest} />;
  }
  return <TokenFiatBalance className={clsx('FiatBalance', className)} token={token} loading={loading} {...rest} />;
}

export default FiatBalance;
