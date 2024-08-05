import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { TrustSet } from 'xrpl';

import AmountInfoDisplay from '../../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import CurrencyInfoDisplay from '../../../TransactionInfoDisplay/CurrencyInfoDisplay/CurrencyInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useTrustSetTransactionDetails from './hooks/useTrustSetTransactionDetails';

export interface TrustSetTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<TrustSet>;
}

function TrustSetTransactionDetails({ className, tx, ...rest }: TrustSetTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { isIncoming, limitAmount, isRemove } = useTrustSetTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('TrustSetTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <CurrencyInfoDisplay label={translate('currency')} asset={{ currency: tx.LimitAmount.currency, issuer: tx.LimitAmount.issuer }} />
      {isIncoming ? (
        <BlockchainAddressInfoDisplay label={translate('from')} account={tx.Account} />
      ) : (
        <>
          <BlockchainAddressInfoDisplay label={translate('issuer')} account={tx.LimitAmount.issuer} />
        </>
      )}
      {!isRemove && <AmountInfoDisplay label={translate('limitAmount')} amount={limitAmount} />}
    </BaseTransactionDetails>
  );
}

export default TrustSetTransactionDetails;
