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
