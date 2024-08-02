import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { SetRegularKey } from 'xrpl';

import RegularKeyInfoDisplay from '../../TransactionInfoDisplay/RegularKeyInfoDisplay/RegularKeyInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';

export interface SetRegularKeyTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<SetRegularKey>;
}

function SetRegularKeyTransactionDetails({ className, tx, ...rest }: SetRegularKeyTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('SetRegularKeyTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <RegularKeyInfoDisplay regularKey={tx.RegularKey} />
    </BaseTransactionDetails>
  );
}

export default SetRegularKeyTransactionDetails;
