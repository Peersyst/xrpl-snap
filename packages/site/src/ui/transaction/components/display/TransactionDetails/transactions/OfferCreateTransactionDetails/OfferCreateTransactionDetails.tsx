import { Row } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { ArrowRightIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';
import { OfferCreate } from 'xrpl';

import BalanceWithFiat from '../../../BalanceWithFiat/BalanceWithFiat';
import BalanceInfoDisplay from '../../../TransactionInfoDisplay/BalanceInfoDisplay/BalanceInfoDisplay';
import HashInfoDisplay from '../../../TransactionInfoDisplay/HashInfoDisplay/HashInfoDisplay';
import RippleTimeInfoDisplay from '../../../TransactionInfoDisplay/RippleTimeInfoDisplay/RippleTimeInfoDisplay';
import BaseTransactionDetails from '../../BaseTransactionDetails/BaseTransactionDetails';
import TransactionDetailsCard from '../../TransactionDetailsCard/TransactionDetailsCard';
import useOfferCreateTransactionDetails from './hooks/useOfferCreateTransactionDetails';

export interface OfferCreateTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx<OfferCreate>;
}

function OfferCreateTransactionDetails({ className, tx, ...rest }: OfferCreateTransactionDetailsProps) {
  const translate = useTranslate('transactions');
  const { takerGets, takerPays, takerGetsAmount, takerPaysAmount, rate, rateCurrency } = useOfferCreateTransactionDetails(tx);

  return (
    <BaseTransactionDetails className={clsx('OfferCreateTransactionDetails', className)} tx={tx} {...rest}>
      <TransactionDetailsCard tx={tx}>
        <Row gap="1rem" alignItems="center">
          <BalanceWithFiat
            showFiat={true}
            token={takerGets[0]}
            gap={0}
            balance={takerGetsAmount.formatAmount()}
            currency={takerGetsAmount.currency}
            balanceProps={{ variant: 'h3', fontWeight: '600', options: { maximumFractionDigits: 4 } }}
            fiatBalanceProps={{ variant: 'body2' }}
            align="center"
          />
          <ArrowRightIcon />
          <BalanceWithFiat
            showFiat={true}
            token={takerPays[0]}
            gap={0}
            balance={takerPaysAmount.formatAmount()}
            currency={takerPaysAmount.currency}
            balanceProps={{ variant: 'h3', fontWeight: '600', options: { maximumFractionDigits: 4 } }}
            fiatBalanceProps={{ variant: 'body2' }}
            align="center"
          />
        </Row>
      </TransactionDetailsCard>
      <BalanceInfoDisplay label={translate('rate')} balance={rate} currency={rateCurrency} />
      {typeof tx.Expiration === 'number' && <RippleTimeInfoDisplay date={tx.Expiration} label={translate('expiration')} />}
      {typeof tx.OfferSequence === 'number' && <HashInfoDisplay label={translate('offerSequence')} hash={String(tx.OfferSequence)} />}
    </BaseTransactionDetails>
  );
}

export default OfferCreateTransactionDetails;
