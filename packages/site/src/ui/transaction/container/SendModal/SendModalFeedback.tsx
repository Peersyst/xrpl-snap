import { useTranslate } from '../../../locale';
import {
  CircularProgress,
  Col,
  Row,
  Typography,
  useTheme,
} from '@peersyst/react-components';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';
import Button from 'ui/common/components/input/Button/Button';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import { useEffect, useState } from 'react';
import { DomainEvents } from 'domain/events';

export function BaseSendModalFeedback({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Col flex={1} gap="2rem" justifyContent="center" alignItems="center">
      {children}
    </Col>
  );
}

export function SendModalLoading() {
  const translate = useTranslate();
  const [loadingText, setLoadingText] = useState(translate('loading'));

  useEffect(() => {
    const unsubscribe = DomainEvents.transaction.on(
      'onTransactionSigned',
      () => {
        setLoadingText(translate('transactionSigned'));
        setTimeout(() => {
          setLoadingText(translate('broadCastingTransaction'));
        }, 1000);
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <BaseSendModalFeedback>
      <SnapLogo width="10rem" height="10rem" />
      <Col gap="0.75rem" alignItems="center">
        <Typography variant="body1" light>
          {loadingText}
        </Typography>
        <CircularProgress thickness={2} size={30} />
      </Col>
    </BaseSendModalFeedback>
  );
}

export function SendModalSuccess({ onClose }: { onClose: () => void }) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  return (
    <BaseSendModalFeedback>
      <AlertCallout
        type="info"
        content={
          <Col gap={spacing[2]}>
            <Typography variant="body1">
              {translate('transferCompltedSuccessfully')}
            </Typography>
            <Typography variant="body1" light>
              {translate('transferCompletedText')}
            </Typography>
          </Col>
        }
      />
      <Row css={{ width: '100%' }} gap="1rem">
        <Button onClick={onClose} fullWidth variant="secondary">
          {translate('viewOnExplorer')}
        </Button>
        <Button onClick={onClose} fullWidth>
          {translate('close')}
        </Button>
      </Row>
    </BaseSendModalFeedback>
  );
}

export function SendModalError({ onClose }: { onClose: () => void }) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  return (
    <BaseSendModalFeedback>
      <AlertCallout
        type="error"
        content={
          <Col gap={spacing[2]}>
            <Typography variant="body1">
              {translate('transferFailed')}
            </Typography>
            <Typography variant="body1" light>
              {translate('transferFailedText')}
            </Typography>
          </Col>
        }
      />
      <Row css={{ width: '100%' }} gap="1rem">
        <Button onClick={onClose} fullWidth>
          {translate('close')}
        </Button>
      </Row>
    </BaseSendModalFeedback>
  );
}
