import { CircularProgress, Col, Row, Typography, useTheme } from '@peersyst/react-components';
import { DomainEvents } from 'domain/events';
import { useEffect, useState } from 'react';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import Button from 'ui/common/components/input/Button/Button';

import { useTranslate } from '../../../locale';

export function BaseSendModalFeedback({ children }: { children: React.ReactNode }) {
  return (
    <Col flex={1} gap="2rem" justifyContent="center" alignItems="center">
      {children}
    </Col>
  );
}

export function AddTokenModalLoading() {
  const translate = useTranslate();
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const unsubscribe = DomainEvents.transaction.on('onTransactionSigned', () => {
      setLoadingText(translate('transactionSigned'));
      setTimeout(() => {
        setLoadingText(translate('broadCastingTransaction'));
      }, 1000);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <BaseSendModalFeedback>
      <SnapLogo width="10rem" height="10rem" />
      {loadingText ? (
        <Col gap="0.75rem" alignItems="center">
          <Typography variant="body1" light>
            {loadingText}
          </Typography>
          <CircularProgress thickness={2} size={30} />
        </Col>
      ) : (
        <AlertCallout type="info" content={<Typography variant="body1">{translate('goToYourMetaMaskToSignTheTx')}</Typography>} />
      )}
    </BaseSendModalFeedback>
  );
}

function isMetaMaskError(error: Error) {
  return error.message.includes('METAMASK');
}

interface ErrorWithData extends Error {
  data?: unknown;
}

export function AddTokenModalError<E extends Error>({ onClose, error }: { onClose: () => void; error: E }) {
  const translate = useTranslate();
  const { spacing } = useTheme();
  const metamaskError = error ? isMetaMaskError(error) : false;

  const reason =
    typeof error === 'object' && 'data' in error
      ? typeof (error as ErrorWithData).data === 'string'
        ? ((error as ErrorWithData).data as string)
        : JSON.stringify((error as ErrorWithData).data)
      : undefined;

  return (
    <BaseSendModalFeedback>
      <AlertCallout
        type={metamaskError ? 'warning' : 'error'}
        content={
          <Col gap={spacing[2]}>
            <Typography variant="body1">{translate('transferFailed')}</Typography>
            <Typography variant="body1" light>
              {translate('transferFailedText', { context: metamaskError ? 'MetaMask' : 'error' })}
            </Typography>
            {reason && (
              <Typography variant="body1" light>
                {JSON.stringify(reason)}
              </Typography>
            )}
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
