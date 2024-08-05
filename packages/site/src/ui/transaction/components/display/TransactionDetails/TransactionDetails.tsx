import { XrplTx } from 'common/models/transaction/tx.types';

import AccountDeleteTransactionDetails from './transactions/AccountDeleteTransactionDetails/AccountDeleteTransactionDetails';
import AccountSetTransactionDetails from './transactions/AccountSetTransactionDetails/AccountSetTransactionDetails';
import AMMBidTransactionDetails from './transactions/AMMBidTransactionDetails/AMMBidTransactionDetails';
import AMMCreateTransactionDetails from './transactions/AMMCreateTransactionDetails/AMMCreateTransactionDetails';
import AMMDeleteTransactionDetails from './transactions/AMMDeleteTransactionDetails/AMMDeleteTransactionDetails';
import AMMDepositTransactionDetails from './transactions/AMMDepositTransactionDetails/AMMDepositTransactionDetails';
import AMMVoteTransactionDetails from './transactions/AMMVoteTransactionDetails/AMMVoteTransactionDetails';
import AMMWithdrawTransactionDetails from './transactions/AMMWithdrawTransactionDetails/AMMWithdrawTransactionDetails';
import CheckCancelTransactionDetails from './transactions/CheckCancelTransactionDetails/CheckCancelTransactionDetails';
import CheckCashTransactionDetails from './transactions/CheckCashTransactionDetails/CheckCashTransactionDetails';
import CheckCreateTransactionDetails from './transactions/CheckCreateTransactionDetails/CheckCreateTransactionDetails';
import ClawbackTransactionDetails from './transactions/ClawbackTransactionDetails/ClawbackTransactionDetails';
import DepositPreauthTransactionDetails from './transactions/DepositPreauthTransactionDetails/DepositPreauthTransactionDetails';
import EscrowCancelTransactionDetails from './transactions/EscrowCancelTransactionDetails/EscrowCancelTransactionDetails';
import EscrowCreateTransactionDetails from './transactions/EscrowCreateTransactionDetails/EscrowCreateTransactionDetails';
import EscrowFinishTransactionDetails from './transactions/EscrowFinishTransactionDetails/EscrowFinishTransactionDetails';
import GenericTransactionDetails from './transactions/GenericTransactionDetails/GenericTransactionDetails';
import NFTokenAcceptOfferTransactionDetails from './transactions/NFTokenAcceptOfferTransactionDetails/NFTokenAcceptOfferTransactionDetails';
import NFTokenBurnTransactionDetails from './transactions/NFTokenBurnTransactionDetails/NFTokenBurnTransactionDetails';
import NFTokenCancelOfferTransactionDetails from './transactions/NFTokenCancelOfferTransactionDetails/NFTokenCancelOfferTransactionDetails';
import NFTokenCreateOfferTransactionDetails from './transactions/NFTokenCreateOfferTransactionDetails/NFTokenCreateOfferTransactionDetails';
import NFTokenMintTransactionDetails from './transactions/NFTokenMintTransactionDetails/NFTokenMintTransactionDetails';
import OfferCancelTransactionDetails from './transactions/OfferCancelTransactionDetails/OfferCancelTransactionDetails';
import OfferCreateTransactionDetails from './transactions/OfferCreateTransactionDetails/OfferCreateTransactionDetails';
import PaymentTransactionDetails from './transactions/PaymentTransactionDetails/PaymentTransactionDetails';
import SetRegularKeyTransactionDetails from './transactions/SetRegularKeyTransactionDetails/SetRegularKeyTransactionDetails';
import TicketCreateTransactionDetails from './transactions/TicketCreateTransactionDetails/TicketCreateTransactionDetails';
import TrustSetTransactionDetails from './transactions/TrustSetTransactionDetails/TrustSetTransactionDetails';

export interface TransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
}

function TransactionDetails({ tx, ...rest }: TransactionDetailsProps) {
  switch (tx.TransactionType) {
    case 'AccountDelete':
      return <AccountDeleteTransactionDetails tx={tx} {...rest} />;
    case 'AccountSet':
      return <AccountSetTransactionDetails tx={tx} {...rest} />;
    case 'AMMBid':
      return <AMMBidTransactionDetails tx={tx} {...rest} />;
    case 'AMMCreate':
      return <AMMCreateTransactionDetails tx={tx} {...rest} />;
    case 'AMMDelete':
      return <AMMDeleteTransactionDetails tx={tx} {...rest} />;
    case 'AMMDeposit':
      return <AMMDepositTransactionDetails tx={tx} {...rest} />;
    case 'AMMVote':
      return <AMMVoteTransactionDetails tx={tx} {...rest} />;
    case 'AMMWithdraw':
      return <AMMWithdrawTransactionDetails tx={tx} {...rest} />;
    case 'CheckCancel':
      return <CheckCancelTransactionDetails tx={tx} {...rest} />;
    case 'CheckCash':
      return <CheckCashTransactionDetails tx={tx} {...rest} />;
    case 'CheckCreate':
      return <CheckCreateTransactionDetails tx={tx} {...rest} />;
    case 'Clawback':
      return <ClawbackTransactionDetails tx={tx} {...rest} />;
    case 'DepositPreauth':
      return <DepositPreauthTransactionDetails tx={tx} {...rest} />;
    case 'EscrowCancel':
      return <EscrowCancelTransactionDetails tx={tx} {...rest} />;
    case 'EscrowCreate':
      return <EscrowCreateTransactionDetails tx={tx} {...rest} />;
    case 'EscrowFinish':
      return <EscrowFinishTransactionDetails tx={tx} {...rest} />;
    case 'NFTokenAcceptOffer':
      return <NFTokenAcceptOfferTransactionDetails tx={tx} {...rest} />;
    case 'NFTokenBurn':
      return <NFTokenBurnTransactionDetails tx={tx} {...rest} />;
    case 'NFTokenCancelOffer':
      return <NFTokenCancelOfferTransactionDetails tx={tx} {...rest} />;
    case 'NFTokenCreateOffer':
      return <NFTokenCreateOfferTransactionDetails tx={tx} {...rest} />;
    case 'NFTokenMint':
      return <NFTokenMintTransactionDetails tx={tx} {...rest} />;
    case 'OfferCancel':
      return <OfferCancelTransactionDetails tx={tx} {...rest} />;
    case 'OfferCreate':
      return <OfferCreateTransactionDetails tx={tx} {...rest} />;
    case 'Payment':
      return <PaymentTransactionDetails tx={tx} {...rest} />;
    case 'SetRegularKey':
      return <SetRegularKeyTransactionDetails tx={tx} {...rest} />;
    case 'TicketCreate':
      return <TicketCreateTransactionDetails tx={tx} {...rest} />;
    case 'TrustSet':
      return <TrustSetTransactionDetails tx={tx} {...rest} />;
    default:
      return <GenericTransactionDetails tx={tx} {...rest} />;
  }
}

export default TransactionDetails;
