import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { DepositPreauth } from 'xrpl';

import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface DepositPreauthTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<DepositPreauth>;
}

function DepositPreauthTransactionDetails({ className, tx, ...rest }: DepositPreauthTransactionDetailsProps) {
  const translate = useTranslate('transactions');

  return (
    <BaseTransactionDetails className={clsx('DepositPreauthTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {tx.Authorize && <BlockchainAddressInfoDisplay label={translate('authorize')} account={tx.Authorize} />}
      {tx.Unauthorize && <BlockchainAddressInfoDisplay label={translate('unauthorize')} account={tx.Unauthorize} />}
    </BaseTransactionDetails>
  );
}

export default DepositPreauthTransactionDetails;
