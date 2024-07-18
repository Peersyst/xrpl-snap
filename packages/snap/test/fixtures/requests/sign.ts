import type { Transaction } from 'xrpl';

export const NORMAL_TX: Transaction = {
  TransactionType: 'AccountSet',
  Flags: 2147483648,
  Sequence: 23,
  LastLedgerSequence: 8820051,
  Fee: '12',
  SigningPubKey: '03BFC2F7AE242C3493187FA0B72BE97B2DF71194FB772E507FF9DEA0AD13CA1625',
  Domain: '6578616D706C652E636F6D',
  Account: 'rQKQsPeE3iTRyfUypLhuq74gZdcRdwWqDp',
};
