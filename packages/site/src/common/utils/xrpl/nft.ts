import { BigNumber } from 'bignumber.js';

export function normalizeNftTransferFee(transferFee: number): number {
  if (transferFee === 0) {
    return 0;
  }

  return new BigNumber(transferFee).dividedBy(1_000).toNumber();
}
