/* eslint-disable no-bitwise */
import { Payment, PaymentFlags } from 'xrpl';

/**
 * Perform bitwise AND (&) to check if a flag is enabled within Flags (as a number). (Copied from xrpl)
 *
 * @param Flags - A number that represents flags enabled.
 * @param checkFlag - A specific flag to check if it's enabled within Flags.
 * @returns True if checkFlag is enabled within Flags.
 */
export function isFlagEnabled(Flags: number, checkFlag: number): boolean {
  // eslint-disable-next-line no-bitwise -- flags need bitwise
  return (BigInt(checkFlag) & BigInt(Flags)) === BigInt(checkFlag);
}

export function isPartialPayment(flags: Payment['Flags']) {
  if (typeof flags !== 'number') {
    return false;
  }
  return isFlagEnabled(flags, PaymentFlags.tfPartialPayment);
}
