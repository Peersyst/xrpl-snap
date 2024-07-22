import type { XChainAddAccountCreateAttestation } from 'xrpl';

export const XCHAIN_ADD_ACCOUNT_CREATE_ATTESTATION: XChainAddAccountCreateAttestation = {
  Account: 'r9cYxdjQsoXAEz3qQJc961SNLaXRkWXCvT',
  Amount: '10000000',
  AttestationRewardAccount: 'r9cYxdjQsoXAEz3qQJc961SNLaXRkWXCvT',
  AttestationSignerAccount: 'r9cYxdjQsoXAEz3qQJc961SNLaXRkWXCvT',
  Destination: 'rJdTJRJZ6GXCCRaamHJgEqVzB7Zy4557Pi',
  Fee: '20',
  LastLedgerSequence: 13,
  OtherChainSource: 'raFcdz1g8LWJDJWJE2ZKLRGdmUmsTyxaym',
  PublicKey: 'ED1F4A024ACFEBDB6C7AA88DEDE3364E060487EA31B14CC9E0D610D152B31AADC2',
  Sequence: 5,
  Signature:
    'EEFCFA3DC2AB4AB7C4D2EBBC168CB621A11B82BABD86534DFC8EFA72439A49662D744073CD848E7A587A95B35162CDF9A69BB237E72C9537A987F5B8C394F30D',
  SignatureReward: '100',
  TransactionType: 'XChainAddAccountCreateAttestation',
  WasLockingChainSend: 1,
  XChainAccountCreateCount: '0000000000000006',
  XChainBridge: {
    IssuingChainDoor: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    IssuingChainIssue: {
      currency: 'XRP',
    },
    LockingChainDoor: 'rDJVtEuDKr4rj1B3qtW7R5TVWdXV2DY7Qg',
    LockingChainIssue: {
      currency: 'XRP',
    },
  },
};
