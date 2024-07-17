import type { Transaction } from 'xrpl';

export const NORMAL_TX: Transaction = {
  TransactionType: 'AccountSet',
  Flags: 2147483648,
  Sequence: 23,
  LastLedgerSequence: 8820051,
  Fee: '12',
  SigningPubKey: '02A8A44DB3D4C73EEEE11DFE54D2029103B776AA8A8D293A91D645977C9DF5F544',
  Domain: '6578616D706C652E636F6D',
  Account: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
};
