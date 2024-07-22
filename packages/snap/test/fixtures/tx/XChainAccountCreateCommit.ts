import type { XChainAccountCreateCommit } from 'xrpl';

export const XCHAIN_ACCOUNT_CREATE_COMMIT: XChainAccountCreateCommit = {
  Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  XChainBridge: {
    LockingChainDoor: 'rGzx83BVoqTYbGn7tiVAnFw7cbxjin13jL',
    LockingChainIssue: {
      currency: 'XRP',
    },
    IssuingChainDoor: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
    IssuingChainIssue: {
      currency: 'XRP',
    },
  },
  Amount: '1000000',
  Fee: '10',
  Flags: 2147483648,
  Destination: 'rGzx83BVoqTYbGn7tiVAnFw7cbxjin13jL',
  Sequence: 1,
  SignatureReward: '10000',
  TransactionType: 'XChainAccountCreateCommit',
};
