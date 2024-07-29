import { Token } from 'common/models';
import Amount from 'common/utils/Amount';
import { Amount as XrplAmount } from 'xrpl';

import { parseCurrencyCode } from '../token/currencyCode';

export function getTransactionToken(amount: XrplAmount): Token {
  if (typeof amount === 'string') {
    return { currency: 'XRP', issuer: '', decimals: 6 };
  }
  return { currency: parseCurrencyCode(amount.currency), issuer: amount.issuer, decimals: 15 };
}

export function getTransactionAmount(amount: XrplAmount, token: Token): Amount {
  if (typeof amount === 'string') {
    return new Amount(amount, 6, 'XRP');
  }
  return Amount.fromDecToken(amount.value, token);
}

export function getTransactionTokenAndAmount(amount: XrplAmount): [Token, Amount] {
  const token = getTransactionToken(amount);

  const amountObj = getTransactionAmount(amount, token);
  return [token, amountObj];
}
