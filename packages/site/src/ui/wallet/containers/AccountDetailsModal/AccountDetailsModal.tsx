import { Row, useConfig, useTheme } from '@peersyst/react-components';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import ExplorerButton from 'ui/network/containers/ExplorerButton/ExplorerButton';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import useExportPrivateKey from 'ui/wallet/query/useExportPrivateKey';

import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';
import BaseAccountModal from '../BaseAccountModal/BaseAccountModal';

function AccountDetailsModal({ ...rest }: ModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const walletAddress = useGetAddress();
  const mockedAddress = useConfig('mockedAddress');
  const address = walletAddress ?? mockedAddress;

  const { mutate: exportPrivateKey } = useExportPrivateKey();

  return (
    <BaseAccountModal
      title={translate('myAccountDetails')}
      address={address}
      footer={
        <Row gap={spacing[4]}>
          <ExplorerButton variant="secondary" css={{ width: '100%' }} address={address} type={'address'} />
          <Button onClick={() => exportPrivateKey()} variant="secondary" fullWidth>
            {translate('exportPrivateKey')}
          </Button>
        </Row>
      }
      {...rest}
    />
  );
}

export default AccountDetailsModal;
