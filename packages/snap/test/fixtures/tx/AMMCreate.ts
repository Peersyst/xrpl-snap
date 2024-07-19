import type { AMMCreate } from 'xrpl';

export const AMM_CREATE: AMMCreate = {
  TransactionType: 'AMMCreate',
  Account: 'rWYkbWkCeg8dP6rXALnjgZSjjLyih5NXm',
  Amount: '1000',
  Amount2: {
    currency: 'USD',
    issuer: 'rPyfep3gcLzkosKC9XiE77Y8DZWG6iWDT9',
    value: '1000',
  },
  TradingFee: 12,
  Sequence: 1337,
};
