import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { NFTokenCreateOffer } from 'xrpl';

import AmountInfoDisplay from '../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import DestinationInfoDisplay from '../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import ExpirationInfoDisplay from '../../TransactionInfoDisplay/ExpirationInfoDisplay/ExpirationInfoDisplay';
import NFTokenIDInfoDisplay from '../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import OwnerInfoDisplay from '../../TransactionInfoDisplay/OwnerInfoDisplay/OwnerInfoDisplay';
import BaseTransactionDetails from '../common/BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../common/TransactionDetailsCard/TransactionDetailsCard';
import useNFTokenCreateOfferTransactionDetails from './hooks/useNFTokenCreateOfferTransactionDetails';

export interface NFTokenCreateOfferTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenCreateOffer>;
}

function NFTokenCreateOfferTransactionDetails({ className, tx, ...rest }: NFTokenCreateOfferTransactionDetailsProps) {
  const { amount } = useNFTokenCreateOfferTransactionDetails(tx);
  return (
    <BaseTransactionDetails className={clsx('NFTokenCreateOfferTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <AmountInfoDisplay amount={amount} />
      <NFTokenIDInfoDisplay NFTokenID={tx.NFTokenID} />
      {tx.Owner && <OwnerInfoDisplay owner={tx.Owner} />}
      {typeof tx.Expiration === 'number' && <ExpirationInfoDisplay expiration={tx.Expiration} />}
      {tx.Destination && <DestinationInfoDisplay destination={tx.Destination} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenCreateOfferTransactionDetails;
