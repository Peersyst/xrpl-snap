import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import Button from 'ui/common/components/input/Button/Button';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useTranslate } from 'ui/locale';
import { useBlockchainAddressUrl } from 'ui/network/hooks/useBlockchainAddressUrl';

import FeeInfoDisplay from '../../TransactionInfoDisplay/FeeInfoDisplay/FeeInfoDisplay';
import MemoInfoDisplay from '../../TransactionInfoDisplay/MemoInfoDisplay/MemoInfoDisplay';
import TransactionHashInfoDisplay from '../../TransactionInfoDisplay/TransactionHashInfoDisplay/TransactionHashInfoDisplay';

export interface BaseTransactionDetailsProps {
  className?: string;
  style?: React.CSSProperties;
  tx: XrplTx;
  children: React.ReactNode;
}

function BaseTransactionDetails({ className, tx: { hash = '', Memos, Fee }, children, ...rest }: BaseTransactionDetailsProps) {
  const url = useBlockchainAddressUrl('tx', hash);
  const translate = useTranslate();

  return (
    <Col flex={1} className={clsx('BaseTransactionDetails', className)} gap="1.5rem" {...rest}>
      {children}
      {Memos?.map((memo, index) => (
        <MemoInfoDisplay key={index} memo={memo} />
      ))}
      {Fee && <FeeInfoDisplay fee={Fee} />}
      <TransactionHashInfoDisplay hash={hash} />
      <ExternalLink to={url}>
        <Button fullWidth>{translate('viewOnExplorer')}</Button>
      </ExternalLink>
    </Col>
  );
}

export default BaseTransactionDetails;
