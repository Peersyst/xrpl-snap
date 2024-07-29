import { Col, Row, Skeleton } from '@peersyst/react-components';
import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useBlockchainAddressUrl } from 'ui/network/hooks/useBlockchainAddressUrl';

import TransactionAmount from '../TransactionAmount/TransactionAmount';
import TransactionDate from '../TransactionDate/TransactionDate';
import TransactionCardIcon from '../TransactionIcon/TransactionIcon';
import TransactionLabel from '../TransactionLabel/TransactionLabel';
import { TransactionRoot } from './Transaction.styles';
import type { TransactionProps } from './Transaction.types';
import { extractTransactionProps } from './utils/transaction.utils';

export function Transaction({ loading = false, tx, accountAddress }: TransactionProps): JSX.Element {
  const { txType, account, direction, txHash } = useMemo(() => extractTransactionProps(tx, accountAddress), [tx, accountAddress]);
  const { spacing } = useTheme();
  const isReceiver = direction === 'in';
  const url = useBlockchainAddressUrl('tx', txHash);

  return (
    <ExternalLink to={url}>
      <TransactionRoot gap={spacing[5]}>
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
    </ExternalLink>
  );
}

export default memo(Transaction);
