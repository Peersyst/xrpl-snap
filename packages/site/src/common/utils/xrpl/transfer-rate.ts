import { BigNumber } from 'bignumber.js';

const ZERO_TRANSFER_RATE = 1_000_000_000;

export function normalizeTransferRate(transferFee: number): number {
  if (transferFee === 0) {
    return 0;
  }

  if (transferFee < ZERO_TRANSFER_RATE) {
    throw new Error('Invalid transfer fee value. It cannot be less than 1000000000.');
  }

  return new BigNumber(transferFee).dividedBy(1_000_000).minus(1_000).dividedBy(10).toNumber();
}

/**
 * Checks if a transfer rate is valid according to XRPL rules.
 * 0 and undefined are "no fee", otherwise must be in [1000000000, 2000000000]
 */
export function isValidTransferRate(rate?: number): boolean {
  return rate === undefined || rate === 0 || (typeof rate === 'number' && rate >= 1000000000 && rate <= 2000000000);
}
