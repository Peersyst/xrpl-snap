import { Col, Typography, useConfig, useTheme } from '@peersyst/react-components';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import JsonView from 'react18-json-view';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';

import useTransactionReviewer from './hooks/useTransactionReviewer';
import { TransactionViewerCard } from './TransactionReviewer.styles';

export interface TransactionReviewerProps {
  className?: string;
  style?: React.CSSProperties;
}

function TransactionReviewer({ className }: TransactionReviewerProps) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const { transaction } = useTransactionReviewer();
  const name = useConfig('projectName');

  return (
    <Modal
      css={{ width: '37rem' }}
      closable={false}
      open
      title="Review your transaction"
      className={clsx('TransactionReviewer', className)}
    >
      <Col gap="2rem">
        <AlertCallout
          type="info"
          content={
            <Col gap={spacing[2]}>
              <Typography variant="body1">{translate('reviewTxTitle')}</Typography>
              <Typography variant="body1" light>
                {translate('reviewTxSubtitle')}
              </Typography>
            </Col>
          }
        />
        <TransactionViewerCard>
          <JsonView src={transaction ?? translate('invalidTransaction', { ns: 'error' })} collapseStringMode="address" />
        </TransactionViewerCard>
        <Link to="/">
          <Button fullWidth variant="primary">
            {translate('visiteSite', { name })}
          </Button>
        </Link>
      </Col>
    </Modal>
  );
}

export default TransactionReviewer;
