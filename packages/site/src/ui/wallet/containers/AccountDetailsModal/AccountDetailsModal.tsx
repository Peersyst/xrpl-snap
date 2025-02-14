import { Col, Row, useConfig, useTheme } from '@peersyst/react-components';
import ExplorerButton from 'ui/network/containers/ExplorerButton/ExplorerButton';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import useExportPrivateKey from 'ui/wallet/query/useExportPrivateKey';

import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';
import { WalletManager } from '../../components/WalletManager';
import BaseAccountModal from '../BaseAccountModal/BaseAccountModal';

interface Props {
  renderAtRoot?: boolean;
  open: boolean;
  onClose: () => void;
}

function AccountDetailsModal({ renderAtRoot, open, onClose }: Props) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const walletAddress = useGetAddress();
  const mockedAddress = useConfig('mockedAddress');
  const address = walletAddress ?? mockedAddress;

  const { mutate: exportPrivateKey } = useExportPrivateKey();

  return (
    <BaseAccountModal title={translate('myAccountDetails')} address={address} open={open} onClose={onClose} renderAtRoot={renderAtRoot}>
      <Col gap={spacing[4]}>
        <Row gap={spacing[4]}>
          <ExplorerButton variant="secondary" css={{ width: '100%' }} address={address} type="address" />
          <Button onClick={() => exportPrivateKey()} variant="secondary" fullWidth>
            {translate('exportPrivateKey')}
          </Button>
        </Row>
        <WalletManager />
      </Col>
    </BaseAccountModal>
  );
}

export default AccountDetailsModal;
