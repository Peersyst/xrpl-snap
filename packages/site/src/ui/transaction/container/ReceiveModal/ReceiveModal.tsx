import BaseAccountModal from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal';
import type { BaseAccountModalProps } from 'ui/wallet/containers/BaseAccountModal/BaseAccountModal.types';

import { useTranslate } from '../../../locale';
import useGetAddress from '../../../wallet/hooks/useGetAddress';

function ReceiveModal({ ...rest }: Omit<BaseAccountModalProps, 'address'>) {
  const translate = useTranslate();
  const getAddress = useGetAddress();
  return (
    <BaseAccountModal
      title={translate('receive')}
      address={getAddress()}
      {...rest}
    />
  );
}

export default ReceiveModal;
