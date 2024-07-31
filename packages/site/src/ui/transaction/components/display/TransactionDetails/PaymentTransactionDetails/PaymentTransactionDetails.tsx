import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';
import { Payment } from 'xrpl';

import DestinationInfoDisplay from '../../DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import FromInfoDisplay from '../../FromInfoDisplay/FromInfoDisplay';
import TransactionAmount from '../../TransactionAmount/TransactionAmount';
import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';
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
        <TransactionAmount
          align="center"
          tx={tx}
          gap={0}
          balanceProps={{ variant: 'h3', fontWeight: '600' }}
          fiatBalanceProps={{ variant: 'body2' }}
        />
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
