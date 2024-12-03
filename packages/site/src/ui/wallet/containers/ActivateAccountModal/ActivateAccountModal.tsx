import { Col, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTheme } from 'styled-components';
import QrCode from 'ui/common/components/display/QrCode/QrCode';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import Card from 'ui/common/components/surface/Card/Card';
import { useTranslate } from 'ui/locale';
import useNetworkReserve from 'ui/network/hooks/useNetworkReserve';
import AccountChip from 'ui/wallet/components/display/AccountChip';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';

import ActivateAccountCTA from '../ActivateAccountCTA/ActivateAccountCTA';

export interface ActivateAccountModalProps extends Omit<ModalProps, 'title'> {}

function ActivateAccountModal({ className, children, ...rest }: ActivateAccountModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const address = useGetAddress() || '';
  const { data: { baseReserveCostInXrp } = {} } = useNetworkReserve();

  return (
    <Modal title={translate('activateAccoutModalTitle')} className={clsx('ActivateAccountModal', className)} {...rest}>
      <Col gap={spacing['6']}>
        <AlertCallout
          type="info"
          content={
            <Col gap={spacing[2]}>
              <Typography variant="body1">{translate('activateAccountAlertTitle')}</Typography>
              <Typography variant="body1" light>
                {translate('activateAccountAlertText', { baseReserveCostInXrp })}
              </Typography>
            </Col>
          }
        />
        <Card css={{ width: '100%' }}>
          <Col gap={spacing[4]} alignItems="center">
            <Typography variant="body1" light>
              {translate('activateAccountText')}
              <span style={{ fontWeight: '600' }}>{baseReserveCostInXrp} XRP </span>
              {translate('activateAccountText2')}
            </Typography>
            <AccountChip address={address} variant="filled" />
            <QrCode value={address} />
            <ActivateAccountCTA />
          </Col>
        </Card>
      </Col>
    </Modal>
  );
}

export default ActivateAccountModal;
