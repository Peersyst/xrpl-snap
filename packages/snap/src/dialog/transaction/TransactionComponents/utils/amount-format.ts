import type { IssuedCurrencyAmount } from 'xrpl';

import { dropsToXrp } from './xrp-conversion';

export const formatXrpAmount = (amount: string): string => {
  const xrpAmount = dropsToXrp(amount);
  return `${amount} drops (${xrpAmount} XRP)`;
};

export const formatIOUAmount = ({ currency, value }: IssuedCurrencyAmount): string => {
  return `${value} ${currency}`;
};
