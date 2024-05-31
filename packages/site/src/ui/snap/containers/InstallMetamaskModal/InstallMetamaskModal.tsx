import clsx from 'clsx';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';

export interface InstallMetamaskModalProps extends ModalProps {}

function InstallMetamaskModal({
  className,
  ...rest
}: InstallMetamaskModalProps) {
  return (
    <Modal className={clsx('InstallMetamaskModal', className)} {...rest} />
  );
}

export default InstallMetamaskModal;
