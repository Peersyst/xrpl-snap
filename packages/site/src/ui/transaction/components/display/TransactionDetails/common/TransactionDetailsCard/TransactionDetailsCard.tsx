import { Col, Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import Card from 'ui/common/components/surface/Card/Card';
import TransactionDate from 'ui/transaction/components/display/TransactionDate/TransactionDate';
import TransactionIcon from 'ui/transaction/components/display/TransactionIcon/TransactionIcon';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';

import useTransactionDetailsLabel from './hooks/useTransactionDetailsLabel';

export interface TransactionDetailsCardProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
  children?: React.ReactNode;
}

const TransactionDetailsCard = ({ className, tx, style, children }: TransactionDetailsCardProps): JSX.Element => {
  const { direction } = useParseTransaction(tx);
  const isReceiver = direction === 'in';
  const label = useTransactionDetailsLabel(tx, isReceiver);

  return (
    <Card css={{ width: '100%' }} className={clsx('TransactionDetailsCard', className)} style={style}>
      <Col flex={1} alignItems="center" gap="0.5rem">
        <Row justifyContent="center" alignItems="center" gap="0.5rem">
          <TransactionIcon size="md" txType={tx.TransactionType} isReceiver={isReceiver} loading={false} />
          <Typography variant="body1" fontWeight="500">
            {label}
          </Typography>
        </Row>
        {children}
        <TransactionDate format={DateFormat.DATE_TIME} variant="body2" light tx={tx} loading={false} />
      </Col>
    </Card>
  );
};

export default TransactionDetailsCard;
