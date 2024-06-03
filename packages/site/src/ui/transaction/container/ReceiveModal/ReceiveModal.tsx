import BaseAccountModal from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal';
import type { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

import { useTranslate } from '../../../locale';
import useGetAddress from '../../../wallet/hooks/useGetAddress';

function ReceiveModal({ ...rest }: Omit<BaseAccountModalProps, 'address'>) {
  const translate = useTranslate();
  const address = useGetAddress();
  return (
    <BaseAccountModal
      title={translate('receive')}
      address={address ?? 'rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
      {...rest}
    />
  );
}

export default ReceiveModal;
