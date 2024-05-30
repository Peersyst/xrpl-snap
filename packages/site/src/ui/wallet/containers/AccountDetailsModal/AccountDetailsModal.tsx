import { Row, useTheme } from '@peersyst/react-components';
import BaseAccountModal from '../BaseAccountModal/BaseAccountModal';
import Button from '../../../common/components/input/Button/Button';
import { useTranslate } from '../../../locale';
import { BaseAccountModalProps } from '../BaseAccountModal/BaseAccountModal.types';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import useAccountExplorerLink from './hooks/useAccountExplorerLink';

interface AccountDetailsModalProps extends BaseAccountModalProps {
  address: string;
}

function AccountDetailsModal({ address, ...rest }: AccountDetailsModalProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const url = useAccountExplorerLink(address);

  return (
    <BaseAccountModal
      title={translate('accountDetails')}
      address={address}
      footer={
        <Row gap={spacing[4]}>
          <ExternalLink to={url} css={{ width: '100%' }}>
            <Button variant="secondary" fullWidth>
              {translate('viewOnExplorer')}
            </Button>
          </ExternalLink>

          <Button variant="secondary" fullWidth>
            {translate('exportPrivateKey')}
          </Button>
        </Row>
      }
      {...rest}
    />
  );
}

export default AccountDetailsModal;
