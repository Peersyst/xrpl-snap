import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { EscrowCreate } from 'xrpl';

import DestinationInfoDisplay from '../../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import DestinationTagInfoDisplay from '../../../TransactionInfoDisplay/DestinationTagInfoDisplay/DestinationTagInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import RippleTimeInfoDisplay from '../../../TransactionInfoDisplay/RippleTimeInfoDisplay/RippleTimeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsAmount from '../../TransactionDetailsAmount/TransactionDetailsAmount';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface EscrowCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<EscrowCreate>;
}

function EscrowCreateTransactionDetails({ className, tx, ...rest }: EscrowCreateTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  return (
    <BaseTransactionDetails className={clsx('EscrowCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <TransactionDetailsAmount tx={tx} />
      </TransactionDetailsCard>
      <DestinationInfoDisplay destination={tx.Destination} />
      {typeof tx.DestinationTag === 'number' && <DestinationTagInfoDisplay destinationTag={tx.DestinationTag} />}
      {typeof tx.CancelAfter === 'number' && <RippleTimeInfoDisplay date={tx.CancelAfter} label={translate('cancelAfter')} />}
      {typeof tx.FinishAfter === 'number' && <RippleTimeInfoDisplay date={tx.FinishAfter} label={translate('finishAfter')} />}
      {typeof tx.Condition === 'string' && <HashInfoDisplay hash={tx.Condition} label={translate('condition')} />}
    </BaseTransactionDetails>
  );
}

export default EscrowCreateTransactionDetails;
