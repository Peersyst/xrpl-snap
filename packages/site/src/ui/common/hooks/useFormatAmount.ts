import { config } from 'common/config';
import type Amount from 'common/utils/Amount';
import { formatCurrency } from 'common/utils/token';
import { useTranslate } from 'ui/locale';

export type UseFormatAmountParams<ToParts extends boolean = false> = {
  maxDecimals?: number;
  minDecimals?: number;
  toParts?: ToParts;
};

export type FormatAmountParts = {
  amount: string;
  currency: string;
};

export type FormatAmountResult<ToParts extends boolean = false> =
  ToParts extends true ? FormatAmountParts : string;

export default function useFormatAmount(): <ToParts extends boolean = false>(
  amount: Amount,
  params?: UseFormatAmountParams<ToParts>,
) => FormatAmountResult<ToParts> {
  const translate = useTranslate();
  const formatAmount = <ToParts extends boolean = false>(
    amount: Amount,
    {
      maxDecimals: maxDecimalsParam,
      minDecimals = 0,
      toParts = false as ToParts,
    }: UseFormatAmountParams<ToParts> = {},
  ): FormatAmountResult<ToParts> => {
    const maxDecimals = maxDecimalsParam ?? config.maxNumberDecimals;
    const formattedAmount = translate('formatNumber', {
      val: amount.formatAmount(),
      maximumFractionDigits: maxDecimals,
      minimumFractionDigits: minDecimals,
    });
    return (
      toParts
        ? { amount: formattedAmount, currency: formatCurrency(amount.currency) }
        : `${formattedAmount} ${formatCurrency(amount.currency)}`
    ) as FormatAmountResult<ToParts>;
  };
  return formatAmount;
}
