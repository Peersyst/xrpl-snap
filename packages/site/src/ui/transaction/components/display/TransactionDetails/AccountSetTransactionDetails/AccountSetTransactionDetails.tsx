import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { AccountSet } from 'xrpl';

import AccountSetFlagInfoDisplay from '../../TransactionInfoDisplay/AccountSetFlagInfoDisplay/AccountSetFlagInfoDisplay';
import DomainInfoDisplay from '../../TransactionInfoDisplay/DomainInfoDisplay/DomainInfoDisplay';
import EmailHashInfoDisplay from '../../TransactionInfoDisplay/EmailHashInfoDisplay/EmailHashInfoDisplay';
import MessageKeyInfoDisplay from '../../TransactionInfoDisplay/MessageKeyInfoDisplay/MessageKeyInfoDisplay';
import NFTokenMinterInfoDisplay from '../../TransactionInfoDisplay/NFTokenMinterInfoDisplay/NFTokenMinterInfoDisplay';
import TickSizeInfoDisplay from '../../TransactionInfoDisplay/TickSizeInfoDisplay/TickSizeInfoDisplay';
import TransferRateInfoDisplay from '../../TransactionInfoDisplay/TransferRateInfoDisplay/TransferRateInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';

export interface AccountSetTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<AccountSet>;
}

function AccountSetTransactionDetails({ className, tx, ...rest }: AccountSetTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('AccountSetTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {typeof tx.Domain === 'string' && <DomainInfoDisplay domain={tx.Domain} />}
      {typeof tx.EmailHash === 'string' && <EmailHashInfoDisplay emailHash={tx.EmailHash} />}
      {typeof tx.MessageKey === 'string' && <MessageKeyInfoDisplay messageKey={tx.MessageKey} />}
      {typeof tx.SetFlag === 'number' && <AccountSetFlagInfoDisplay flag={tx.SetFlag} type="set" />}
      {typeof tx.ClearFlag === 'number' && <AccountSetFlagInfoDisplay flag={tx.ClearFlag} type="clear" />}
      {typeof tx.TransferRate === 'number' && <TransferRateInfoDisplay transferRate={tx.TransferRate} />}
      {typeof tx.TickSize === 'number' && <TickSizeInfoDisplay tickSize={tx.TickSize} />}
      {typeof tx.NFTokenMinter === 'string' && <NFTokenMinterInfoDisplay nftTokenMinter={tx.NFTokenMinter} />}
    </BaseTransactionDetails>
  );
}

export default AccountSetTransactionDetails;
