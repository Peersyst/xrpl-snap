import { Row, useTheme } from '@peersyst/react-components';
import BaseAccountModal from '../BaseAccountModal/BaseAccountModal';
import Button from '../../components/input/Button/Button';
import { useTranslate } from '../../../locale';

interface AccountDetailsModalProps {
  address: string,
}

function AccountDetailsModal({ address }: AccountDetailsModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  return (
    <BaseAccountModal title={translate("accountDetails")} address={address} footer={
      <Row gap={spacing[4]}>
        <Button variant="secondary" fullWidth>{translate('viewOnExplorer')}</Button>
        <Button variant="secondary" fullWidth>{translate('exportPrivateKey')}</Button>
      </Row>
    } />
  );
}

export default AccountDetailsModal;
