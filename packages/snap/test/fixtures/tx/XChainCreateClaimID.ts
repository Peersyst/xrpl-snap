import type { XChainCreateClaimID } from 'xrpl';

export const XCHAIN_CREATE_CLAIM_ID: XChainCreateClaimID = {
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
  Fee: '10',
  Flags: 2147483648,
  OtherChainSource: 'rGzx83BVoqTYbGn7tiVAnFw7cbxjin13jL',
  Sequence: 1,
  SignatureReward: '10000',
  TransactionType: 'XChainCreateClaimID',
};
