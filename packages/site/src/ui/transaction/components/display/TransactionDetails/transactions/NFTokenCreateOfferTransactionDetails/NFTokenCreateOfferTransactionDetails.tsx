import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { useTranslate } from 'ui/locale';
import { NFTokenCreateOffer } from 'xrpl';

import AmountInfoDisplay from '../../../TransactionInfoDisplay/AmountInfoDisplay/AmountInfoDisplay';
import BlockchainAddressInfoDisplay from '../../../TransactionInfoDisplay/BlockchainAddressInfoDisplay/BlockchainAddressInfoDisplay';
import DestinationInfoDisplay from '../../../TransactionInfoDisplay/DestinationInfoDisplay/DestinationInfoDisplay';
import NFTokenIDInfoDisplay from '../../../TransactionInfoDisplay/NFTokenIDInfoDisplay/NFTokenIDInfoDisplay';
import RippleTimeInfoDisplay from '../../../TransactionInfoDisplay/RippleTimeInfoDisplay/RippleTimeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useNFTokenCreateOfferTransactionDetails from './hooks/useNFTokenCreateOfferTransactionDetails';

export interface NFTokenCreateOfferTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<NFTokenCreateOffer>;
}

function NFTokenCreateOfferTransactionDetails({ className, tx, ...rest }: NFTokenCreateOfferTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { amount } = useNFTokenCreateOfferTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('NFTokenCreateOfferTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx} />
      <AmountInfoDisplay label={translate('amount')} amount={amount} />
      <NFTokenIDInfoDisplay NFTokenID={tx.NFTokenID} />
      {tx.Owner && <BlockchainAddressInfoDisplay label={translate('owner')} account={tx.Owner} />}
      {typeof tx.Expiration === 'number' && <RippleTimeInfoDisplay date={tx.Expiration} label={translate('expiration')} />}
      {tx.Destination && <DestinationInfoDisplay destination={tx.Destination} />}
    </BaseTransactionDetails>
  );
}

export default NFTokenCreateOfferTransactionDetails;
