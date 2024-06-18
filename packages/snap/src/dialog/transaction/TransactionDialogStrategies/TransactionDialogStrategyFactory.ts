import { AccountDeleteDialogStrategy } from './AccountDeleteDialogStrategy/AccountDeleteDialogStrategy';
import { AccountSetDialogStrategy } from './AccountSetDialogStrategy/AccountSetDialogStrategy';
import { AMMBidDialogStrategy } from './AMMBidDialogStrategy/AMMBidDialogStrategy';
import { AMMCreateDialogStrategy } from './AMMCreateDialogStrategy/AMMCreateDialogStrategy';
import { AMMDeleteDialogStrategy } from './AMMDeleteDialogStrategy/AMMDeleteDialogStrategy';
import { AMMDepositDialogStrategy } from './AMMDepositDialogStrategy/AMMDepositDialogStrategy';
import { AMMVoteDialogStrategy } from './AMMVoteDialogStrategy/AMMVoteDialogStrategy';
import { AMMWithdrawDialogStrategy } from './AMMWithdrawDialogStrategy/AMMWithdrawDialogStrategy';
import { CheckCancelDialogStrategy } from './CheckCancelDialogStrategy/CheckCancelDialogStrategy';
import { CheckCashDialogStrategy } from './CheckCashDialogStrategy/CheckCashDialogStrategy';
import { CheckCreateDialogStrategy } from './CheckCreateDialogStrategy/CheckCreateDialogStrategy';
import { ClawbackDialogStrategy } from './ClawbackDialogStrategy/ClawbackDialogStrategy';
import { DepositPreauthDialogStrategy } from './DepositPreauthDialogStrategy/DepositPreauthDialogStrategy';
import { DIDDeleteDialogStrategy } from './DIDDeleteDialogStrategy/DIDDeleteDialogStrategy';
import { DIDSetDialogStrategy } from './DIDSetDialogStrategy/DIDSetDialogStrategy';
import { EscrowCancelDialogStrategy } from './EscrowCancelDialogStrategy/EscrowCancelDialogStrategy';
import { EscrowCreateDialogStrategy } from './EscrowCreateDialogStrategy/EscrowCreateDialogStrategy';
import { EscrowFinishDialogStrategy } from './EscrowFinishDialogStrategy/EscrowFinishDialogStrategy';
import { NFTokenAcceptOfferDialogStrategy } from './NFTokenAcceptOfferDialogStrategy/NFTokenAcceptOfferDialogStrategy';
import { NFTokenBurnDialogStrategy } from './NFTokenBurnDialogStrategy/NFTokenBurnDialogStrategy';
import { NFTokenCancelOfferDialogStrategy } from './NFTokenCancelOfferDialogStrategy/NFTokenCancelOfferDialogStrategy';
import { NFTokenCreateOfferDialogStrategy } from './NFTokenCreateOfferDialogStrategy/NFTokenCreateOfferDialogStrategy';
import { NFTokenMintDialogStrategy } from './NFTokenMintDialogStrategy/NFTokenMintDialogStrategy';
import { OfferCancelDialogStrategy } from './OfferCancelDialogStrategy/OfferCancelDialogStrategy';
import { OfferCreateDialogStrategy } from './OfferCreateDialogStrategy/OfferCreateDialogStrategy';
import { PaymentChannelClaimDialogStrategy } from './PaymentChannelClaimDialogStrategy/PaymentChannelClaimDialogStrategy';
import { PaymentChannelCreateDialogStrategy } from './PaymentChannelCreateDialogStrategy/PaymentChannelCreateDialogStrategy';
import { PaymentChannelFundDialogStrategy } from './PaymentChannelFundDialogStrategy/PaymentChannelFundDialogStrategy';
import { PaymentDialogStrategy } from './PaymentDialogStrategy/PaymentDialogStrategy';
import { SetRegularKeyDialogStrategy } from './SetRegularKeyDialogStrategy/SetRegularKeyDialogStrategy';
import { SignerListSetDialogStrategy } from './SignerListSetDialogStrategy/SignerListSetDialogStrategy';
import { TicketCreateDialogStrategy } from './TickerCreateDialogStrategy/TickerCreateDialogStrategy';
import type { ITransactionDialogStrategiesFactory } from './TransactionDialogStrategies.types';
import { TrustSetDialogStrategy } from './TrustSetDialogStrategy/TrustSetDialogStrategy';
import { XChainAccountCreateCommitDialogStrategy } from './XChainAccountCreateCommitDialogStrategy/XChainAccountCreateCommitDialogStrategy';
import { XChainAddAccountCreateAttestationDialogStrategy } from './XChainAddAccountCreateAttestationDialogStrategy/XChainAddAccountCreateAttestationDialogStrategy';
import { XChainAddClaimAttestationDialogStrategy } from './XChainAddClaimAttestationDialogStrategy/XChainAddClaimAttestationDialogStrategy';
import { XChainClaimDialogStrategy } from './XChainClaimDialogStrategy/XChainClaimDialogStrategy';
import { XChainCommitDialogStrategy } from './XChainCommitDialogStrategy/XChainClaimDialogStrategy';
import { XChainCreateBridgeDialogStrategy } from './XChainCreateBridgeDialogStrategy/XChainCreateBridgeDialogStrategy';
import { XChainCreateClaimIDDialogStrategy } from './XChainCreateClaimIDDialogStrategy/XChainCreateClaimIDDialogStrategy';
import { XChainModifyBridgeDialogStrategy } from './XChainModifyBridgeDialogStrategy/XChainModifyBridgeDialogStrategy';

export const TransactionDialogStrategyFactory = (): ITransactionDialogStrategiesFactory => ({
  AMMBid: new AMMBidDialogStrategy(),
  AMMCreate: new AMMCreateDialogStrategy(),
  AMMDelete: new AMMDeleteDialogStrategy(),
  AMMDeposit: new AMMDepositDialogStrategy(),
  AMMVote: new AMMVoteDialogStrategy(),
  AMMWithdraw: new AMMWithdrawDialogStrategy(),
  AccountDelete: new AccountDeleteDialogStrategy(),
  AccountSet: new AccountSetDialogStrategy(),
  CheckCancel: new CheckCancelDialogStrategy(),
  CheckCash: new CheckCashDialogStrategy(),
  CheckCreate: new CheckCreateDialogStrategy(),
  Clawback: new ClawbackDialogStrategy(),
  DIDDelete: new DIDDeleteDialogStrategy(),
  DIDSet: new DIDSetDialogStrategy(),
  DepositPreauth: new DepositPreauthDialogStrategy(),
  EscrowCancel: new EscrowCancelDialogStrategy(),
  EscrowCreate: new EscrowCreateDialogStrategy(),
  EscrowFinish: new EscrowFinishDialogStrategy(),
  NFTokenAcceptOffer: new NFTokenAcceptOfferDialogStrategy(),
  NFTokenBurn: new NFTokenBurnDialogStrategy(),
  NFTokenCancelOffer: new NFTokenCancelOfferDialogStrategy(),
  NFTokenCreateOffer: new NFTokenCreateOfferDialogStrategy(),
  NFTokenMint: new NFTokenMintDialogStrategy(),
  OfferCancel: new OfferCancelDialogStrategy(),
  OfferCreate: new OfferCreateDialogStrategy(),
  Payment: new PaymentDialogStrategy(),
  PaymentChannelClaim: new PaymentChannelClaimDialogStrategy(),
  PaymentChannelCreate: new PaymentChannelCreateDialogStrategy(),
  PaymentChannelFund: new PaymentChannelFundDialogStrategy(),
  SetRegularKey: new SetRegularKeyDialogStrategy(),
  SignerListSet: new SignerListSetDialogStrategy(),
  TicketCreate: new TicketCreateDialogStrategy(),
  TrustSet: new TrustSetDialogStrategy(),
  XChainAccountCreateCommit: new XChainAccountCreateCommitDialogStrategy(), // @needsaudit
  XChainAddAccountCreateAttestation: new XChainAddAccountCreateAttestationDialogStrategy(), // @needsaudit
  XChainAddClaimAttestation: new XChainAddClaimAttestationDialogStrategy(), // @needsaudit
  XChainClaim: new XChainClaimDialogStrategy(), // @needsaudit
  XChainCommit: new XChainCommitDialogStrategy(), // @needsaudit
  XChainCreateBridge: new XChainCreateBridgeDialogStrategy(), // @needsaudit
  XChainCreateClaimID: new XChainCreateClaimIDDialogStrategy(), // @needsaudit
  XChainModifyBridge: new XChainModifyBridgeDialogStrategy(), // @needsaudit
});
