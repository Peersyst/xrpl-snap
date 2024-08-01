import { Col, Row, Skeleton } from '@peersyst/react-components';
import { memo, useCallback, useState } from 'react';
import { useTheme } from 'styled-components';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import useParseTransaction from 'ui/transaction/hooks/useParseTransaction';

import TransactionDetailsModal from '../../feedback/TransactionDetailsModal/TransactionDetailsModal';
import TransactionAmount from '../TransactionAmount/TransactionAmount';
import TransactionDate from '../TransactionDate/TransactionDate';
import TransactionCardIcon from '../TransactionIcon/TransactionIcon';
import TransactionLabel from '../TransactionLabel/TransactionLabel';
import { TransactionRoot } from './Transaction.styles';
import type { InnerTransactionProps, TransactionProps } from './Transaction.types';

/**
 * Used to avoid re-rendering the InnerTransaction component when the parent component opens the TransactionDetailsModal.
 */
const InnerTransaction = memo(({ loading = false, tx, accountAddress, onClick }: InnerTransactionProps): JSX.Element => {
  const { txType, account, direction } = useParseTransaction(tx, accountAddress);
  const { spacing } = useTheme();
  const isReceiver = direction === 'in';

  function handleOnClick() {
    if (!loading) {
      onClick();
    }
  }

  return (
    <TransactionRoot gap={spacing[5]} onClick={handleOnClick} loading={loading}>
      <TransactionCardIcon isReceiver={isReceiver} txType={txType} loading={loading} />
      <Row justifyContent="space-between" flex={1}>
        <Col gap={spacing[1]}>
          <Skeleton loading={loading}>
            <TransactionLabel variant="body1" address={account} isReceiver={isReceiver} txType={txType} />
          </Skeleton>
          <TransactionDate format={DateFormat.DATE_TIME} variant="body2" light tx={tx} loading={loading} />
        </Col>
        <TransactionAmount showFiat tx={tx} loading={loading} />
      </Row>
    </TransactionRoot>
  );
});

export function Transaction(props: TransactionProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleOnClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <InnerTransaction onClick={handleOnClick} {...props} />
      {open && <TransactionDetailsModal open={open} onClose={() => setOpen(false)} {...props} />}
    </>
  );
}

export default memo(Transaction);
