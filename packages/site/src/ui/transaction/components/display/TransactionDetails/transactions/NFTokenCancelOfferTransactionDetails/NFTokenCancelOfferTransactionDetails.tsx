import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenCancelOffer } from 'xrpl';

import OfferIDInfoDisplay from '../../../TransactionInfoDisplay/OfferIDInfoDisplay/OfferIDInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';

export interface NFTokenCancelOfferTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenCancelOffer>;
}

function NFTokenCancelOfferTransactionDetails({ className, tx, ...rest }: NFTokenCancelOfferTransactionDetailsProps) {
  return (
    <BaseTransactionDetails className={clsx('NFTokenCancelOfferTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      {tx.NFTokenOffers.map((offerId) => (
        <OfferIDInfoDisplay offerID={offerId} />
      ))}
    </BaseTransactionDetails>
  );
}

export default NFTokenCancelOfferTransactionDetails;
