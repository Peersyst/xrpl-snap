import { ACCOUNT_DELETE } from './accountDelete';
import { ACCOUNT_SET } from './accountSet';
import { AMM_BID } from './AMMBid';
import { AMM_CREATE } from './AMMCreate';
import { AMM_DELETE } from './AMMDelete';
import { AMM_DEPOSIT } from './AMMDeposit';
import { AMM_VOTE } from './AMMVote';
import { AMM_WITHDRAW } from './AMMWithdraw';
import { CHECK_CANCEL } from './checkCancel';
import { CHECK_CASH } from './checkCash';
import { CHECK_CREATE } from './checkCreate';
import { CLAWBACK } from './clawback';
import { DEPOSIT_PREAUTH } from './depositPreauth';
import { DID_DELETE } from './DIDDelete';
import { DID_SET } from './DIDSet';
import { ESCROW_CANCEL } from './escrowCancel';
import { ESCROW_CREATE } from './escrowCreate';
import { ESCROW_FINISH } from './escrowFinish';
import { NFT_TOKEN_ACCEPT_OFFER } from './NFTokenAcceptOffer';
import { NFT_TOKEN_BURN } from './NFTokenBurn';
import { NFT_TOKEN_CANCEL_OFFER } from './NFTokenCancelOffer';
import { NFT_TOKEN_CREATE_OFFER } from './NFTokenCreateOffer';
import { NFT_TOKEN_MINT } from './NFTokenMint';
import { OFFER_CANCEL } from './offerCancel';
import { OFFER_CREATE } from './offerCreate';
import { ORACLE_DELETE } from './oracleDelete';
import { ORACLE_SET } from './oracleSet';
import { PAYMENT } from './payment';
import { PAYMENT_CHANNEL_CLAIM } from './paymentChannelClaim';
import { PAYMENT_CHANNEL_CREATE } from './paymentChannelCreate';
import { PAYMENT_CHANNEL_FUND } from './paymentChannelFund';
import { SET_REGULAR_KEY } from './setRegularKey';
import { SIGNER_LIST_SET } from './signerListSet';
import { TICKET_CREATE } from './ticketCreate';
import { TRUST_SET } from './trustSet';
import { XCHAIN_ACCOUNT_CREATE_COMMIT } from './XChainAccountCreateCommit';
import { XCHAIN_ADD_ACCOUNT_CREATE_ATTESTATION } from './XChainAddAccountCreateAttestation';
import { XCHAIN_ADD_CLAIM_ATTESTATION } from './XChainAddClaimAttestation';
import { XCHAIN_CLAIM } from './XChainClaim';
import { XCHAIN_COMMIT } from './XChainCommit';
import { XCHAIN_CREATE_BRIDGE } from './XChainCreateBridge';
import { XCHAIN_CREATE_CLAIM_ID } from './XChainCreateClaimID';
import { XCHAIN_MODIFY_BRIDGE } from './XChainModifyBridge';

const txs = {
  AMMBid: AMM_BID,
  AMMCreate: AMM_CREATE,
  AMMDelete: AMM_DELETE,
  AMMDeposit: AMM_DEPOSIT,
  AMMVote: AMM_VOTE,
  AMMWithdraw: AMM_WITHDRAW,
  AccountDelete: ACCOUNT_DELETE,
  AccountSet: ACCOUNT_SET,
  CheckCancel: CHECK_CANCEL,
  CheckCash: CHECK_CASH,
  CheckCreate: CHECK_CREATE,
  Clawback: CLAWBACK,
  DIDDelete: DID_DELETE,
  DIDSet: DID_SET,
  DepositPreauth: DEPOSIT_PREAUTH,
  EscrowCancel: ESCROW_CANCEL,
  EscrowCreate: ESCROW_CREATE,
  EscrowFinish: ESCROW_FINISH,
  NFTokenAcceptOffer: NFT_TOKEN_ACCEPT_OFFER,
  NFTokenBurn: NFT_TOKEN_BURN,
  NFTokenCancelOffer: NFT_TOKEN_CANCEL_OFFER,
  NFTokenCreateOffer: NFT_TOKEN_CREATE_OFFER,
  NFTokenMint: NFT_TOKEN_MINT,
  OfferCancel: OFFER_CANCEL,
  OfferCreate: OFFER_CREATE,
  OracleDelete: ORACLE_DELETE,
  OracleSet: ORACLE_SET,
  Payment: PAYMENT,
  PaymentChannelClaim: PAYMENT_CHANNEL_CLAIM,
  PaymentChannelCreate: PAYMENT_CHANNEL_CREATE,
  PaymentChannelFund: PAYMENT_CHANNEL_FUND,
  SetRegularKey: SET_REGULAR_KEY,
  SignerListSet: SIGNER_LIST_SET,
  TicketCreate: TICKET_CREATE,
  TrustSet: TRUST_SET,
  XChainAccountCreateCommit: XCHAIN_ACCOUNT_CREATE_COMMIT,
  XChainAddAccountCreateAttestation: XCHAIN_ADD_ACCOUNT_CREATE_ATTESTATION,
  XChainAddClaimAttestation: XCHAIN_ADD_CLAIM_ATTESTATION,
  XChainClaim: XCHAIN_CLAIM,
  XChainCommit: XCHAIN_COMMIT,
  XChainCreateBridge: XCHAIN_CREATE_BRIDGE,
  XChainCreateClaimID: XCHAIN_CREATE_CLAIM_ID,
  XChainModifyBridge: XCHAIN_MODIFY_BRIDGE,
};

export default txs;
