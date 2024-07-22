import type { XChainClaim } from 'xrpl';

export const XCHAIN_CLAIM: XChainClaim = {
  Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  Amount: '10000',
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
  Destination: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
  Fee: '10',
  Flags: 2147483648,
  Sequence: 1,
  TransactionType: 'XChainClaim',
  XChainClaimID: '0000000000000001',
};
