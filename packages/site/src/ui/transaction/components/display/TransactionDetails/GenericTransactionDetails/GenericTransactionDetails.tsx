import { Col, Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import useWalletState from 'ui/adapter/state/useWalletState';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import Card from 'ui/common/components/surface/Card/Card';
import FeeInfoDisplay from 'ui/transaction/components/display/FeeInfoDisplay/FeeInfoDisplay';
import TransactionDate from 'ui/transaction/components/display/TransactionDate/TransactionDate';
import TransactionIcon from 'ui/transaction/components/display/TransactionIcon/TransactionIcon';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';

import BaseTransactionDetails from '../BaseTransactionDetails/BaseTransactionDetails';

export interface GenericTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
}

function GenericTransactionDetails({ className, tx, ...rest }: GenericTransactionDetailsProps) {
  const { address = '' } = useWalletState();
  const { direction } = useParseTransaction(tx, address);

  return (
    <BaseTransactionDetails className={clsx('GenericTransactionDetails', className)} tx={tx} {...rest}>
      <Card css={{ width: '100%' }}>
        <Col flex={1} alignItems="center">
          <Row justifyContent="center" alignItems="center" gap="0.5rem">
            <TransactionIcon txType={tx.TransactionType} isReceiver={direction === 'in'} loading={false} />
            <Typography variant="body1" fontWeight="500">
              {tx.TransactionType}
            </Typography>
          </Row>
          <TransactionDate format={DateFormat.DATE_TIME} variant="body2" light tx={tx} loading={false} />
        </Col>
      </Card>
      {tx.Fee && <FeeInfoDisplay fee={tx.Fee} />}
    </BaseTransactionDetails>
  );
}

export default GenericTransactionDetails;
