import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';
import { Payment } from 'xrpl';

import DestinationInfoDisplay from '../../DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import FromInfoDisplay from '../../FromInfoDisplay/FromInfoDisplay';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../TransactionDetailsCard/TransactionDetailsCard';

export interface PaymentTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<Payment>;
}

function PaymentTransactionDetails({ className, tx, ...rest }: PaymentTransactionDetailsProps) {
  const { direction } = useParseTransaction(tx);

  return (
    <BaseTransactionDetails className={clsx('PaymentTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} showFiat={false} />
      </TransactionDetailsCard>
      {direction === 'out' ? (
        <>
          <DestinationInfoDisplay destination={tx.Destination} />
          {tx.DestinationTag && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
        </>
      ) : (
        <FromInfoDisplay from={tx.Account} />
      )}
    </BaseTransactionDetails>
  );
}

export default PaymentTransactionDetails;
