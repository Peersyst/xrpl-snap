import { BlockchainAddress, Col, Row, Skeleton } from '@peersyst/react-components';
import { useTheme } from 'styled-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import DateDisplay from 'ui/common/components/display/DateDisplay/DateDisplay';
import { DateFormat } from 'ui/common/components/display/DateDisplay/hooks/formatDate.types';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useBlockchainAddressUrl } from 'ui/network/hooks/useBlockchainAddressUrl';
import FiatBalance from 'ui/wallet/containers/FiatBalance/FiatBalance';

import TransactionCardIcon from '../TransactionIcon/TransactionIcon';
import TransactionLabel from '../TransactionLabel/TransactionLabel';
import { TransactionCardRoot } from './TransactionCard.styles';
import type { TransactionCardProps } from './TransactionCard.types';

export function TransactionCard({
  account,
  direction,
  timestamp,
  amount,
  token,
  txHash,
  loading = false,
  txType,
}: TransactionCardProps): JSX.Element {
  const { spacing } = useTheme();
  const isReceiver = direction === 'in';
  const url = useBlockchainAddressUrl('tx', txHash);

  return (
    <ExternalLink to={url}>
      <TransactionCardRoot gap={spacing[5]}>
        <TransactionCardIcon isReceiver={isReceiver} txType={txType} loading={loading} />
        <Row justifyContent="space-between" css={{ flex: 1 }}>
          <Col gap={spacing[1]}>
            <Skeleton loading={loading}>
              <Row gap={spacing[1]}>
                <TransactionLabel variant="body1" isReceiver={isReceiver} txType={txType} />
                <BlockchainAddress variant="body1" address={account} type="mainnetAddress" length={4} />
              </Row>
            </Skeleton>
            <Skeleton loading={loading}>
              <DateDisplay date={timestamp} format={DateFormat.DATE_TIME} variant="body2" light />
            </Skeleton>
          </Col>
          {token && amount && (
            <Col gap={spacing[1]} alignItems="end">
              <Balance balance={amount.formatAmount()} currency={token.currency} variant="body1" loading={loading} />
              <FiatBalance balance={amount.formatAmount()} token={token} variant="body2" light loading={loading} />
            </Col>
          )}
        </Row>
      </TransactionCardRoot>
    </ExternalLink>
  );
}

export default TransactionCard;
