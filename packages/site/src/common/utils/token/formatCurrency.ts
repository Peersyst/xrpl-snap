import { WRAPPED_TOKEN_PREFIX, WRAPPED_TOKEN_SEPARATOR } from '../../constants/token.contants';

/**
 * Given a non-formatted currency, returns a formatted token.
 * @param currency - The non-formatted token.
 * @returns The formatted token.
 * @example formatCurrency("PER-3954e597") -> "wPER"
 */
export function formatCurrency(currency: string): string {
  const regex = new RegExp(`${WRAPPED_TOKEN_SEPARATOR}[0-9a-fA-F]{8}$`);

  if (!regex.test(currency)) {
    return currency;
  }

  return `${WRAPPED_TOKEN_PREFIX}${currency.replace(regex, '')}`;
}
