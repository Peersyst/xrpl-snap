import { XrplTx } from 'common/models/transaction/tx.types';

import AccountDeleteTransactionDetails from './AccountDeleteTransactionDetails/AccountDeleteTransactionDetails';
import AccountSetTransactionDetails from './AccountSetTransactionDetails/AccountSetTransactionDetails';
import AMMBidTransactionDetails from './AMMBidTransactionDetails/AMMBidTransactionDetails';
import AMMCreateTransactionDetails from './AMMCreateTransactionDetails/AMMCreateTransactionDetails';
import AMMDeleteTransactionDetails from './AMMDeleteTransactionDetails/AMMDeleteTransactionDetails';
import AMMDepositTransactionDetails from './AMMDepositTransactionDetails/AMMDepositTransactionDetails';
import AMMVoteTransactionDetails from './AMMVoteTransactionDetails/AMMVoteTransactionDetails';
import AMMWithdrawTransactionDetails from './AMMWithdrawTransactionDetails/AMMWithdrawTransactionDetails';
import CheckCancelTransactionDetails from './CheckCancelTransactionDetails/CheckCancelTransactionDetails';
import GenericTransactionDetails from './GenericTransactionDetails/GenericTransactionDetails';
import PaymentTransactionDetails from './PaymentTransactionDetails/PaymentTransactionDetails';
import SetRegularKeyTransactionDetails from './SetRegularKeyTransacionDetails/SetRegularKeyTransacionDetails';

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
    case 'Payment':
      return <PaymentTransactionDetails tx={tx} {...rest} />;
    case 'SetRegularKey':
      return <SetRegularKeyTransactionDetails tx={tx} {...rest} />;
    default:
      return <GenericTransactionDetails tx={tx} {...rest} />;
  }
}

export default TransactionDetails;
