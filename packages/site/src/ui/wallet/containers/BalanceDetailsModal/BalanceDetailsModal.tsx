import { Col, Row, Typography, useConfig, useTheme } from '@peersyst/react-components';
import Balance from 'ui/common/components/display/Balance/Balance';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import useNetworkReserve from 'ui/network/hooks/useNetworkReserve';
import useGetBalanceInfo from 'ui/wallet/query/useGetBalanceInfo';

import Modal from '../../../common/components/feedback/Modal/Modal';
import { useTranslate } from '../../../locale';

function BalanceDetailsModal({ ...rest }: ModalProps) {
  const { spacing } = useTheme();
  const reserveInfoLink = useConfig('reserveInfoLink');
  const translate = useTranslate();
  const { data: { expendable, total, reserve } = {}, isLoading } = useGetBalanceInfo();
  const { data: { baseReserveCostInXrp, ownerReserveCostInXrpPerItem } = {} } = useNetworkReserve();

  return (
    <Modal title={translate('aboutYourBalance')} {...rest}>
      <Col gap="1.5rem">
        <InfoDisplay
          title={translate('total')}
          content={
            <Balance
              balance={total?.formatAmount() ?? '0'}
              variant="body1"
              currency={total?.currency}
              loading={isLoading}
              fontWeight="500"
            />
          }
        />
        <InfoDisplay
          title={translate('expendable')}
          content={
            <Balance
              balance={expendable?.formatAmount() ?? '0'}
              variant="body1"
              currency={total?.currency}
              loading={isLoading}
              fontWeight="500"
            />
          }
        />
        <InfoDisplay
          title={translate('reserve')}
          content={
            <Balance
              balance={reserve?.formatAmount() ?? '0'}
              variant="body1"
              currency={total?.currency}
              loading={isLoading}
              fontWeight="500"
            />
          }
        />
        <AlertCallout
          type="info"
          content={
            <Col gap={spacing[2]}>
              <Typography variant="body1">
                {translate('balanceInfoExplanationTitle', { baseReserveCostInXrp, ownerReserveCostInXrpPerItem })}
              </Typography>
              <Col>
                <Typography variant="body1" light>
                  {translate('balanceInfoExplanation')} <ExternalLink to={reserveInfoLink}>{`${translate('knowMore')}.`}</ExternalLink>
                </Typography>
                <Row>
                  <Typography variant="body1" light>
                    {translate('balanceInfoExplanation2')}
                  </Typography>
                </Row>
              </Col>
            </Col>
          }
        />
      </Col>
    </Modal>
  );
}

export default BalanceDetailsModal;
