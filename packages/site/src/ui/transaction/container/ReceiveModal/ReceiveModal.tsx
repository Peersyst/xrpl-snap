import BaseAccountModal from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal';
import type { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

import { useTranslate } from '../../../locale';
import useGetAddress from '../../../wallet/hooks/useGetAddress';
import { useConfig } from '@peersyst/react-components';

function ReceiveModal({ ...rest }: Omit<BaseAccountModalProps, 'address'>) {
  const translate = useTranslate();
  const walletAddress = useGetAddress();
  const mockedAddress = useConfig('mockedAddress');
  const address = walletAddress ?? mockedAddress;

  return (
    <BaseAccountModal
      title={translate('receive')}
      address={address}
      {...rest}
    />
  );
}

export default ReceiveModal;
