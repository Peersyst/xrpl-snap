import { createModal, ModalProps, Skeleton, useConfig } from '@peersyst/react-components';
import clsx from 'clsx';

import useTransak from '../hooks/useTransak';
import { OnRampModalRoot } from './OnRampModal.styles';

export interface OnRampModalProps extends ModalProps {
  className?: string;
  style?: React.CSSProperties;
}

const OnRampModal = createModal(({ className, ...rest }: OnRampModalProps): JSX.Element => {
  const isInitialized = useTransak();
  const { containerId } = useConfig('transak');

  return (
    <OnRampModalRoot className={clsx('OnRampModal', className)} {...rest}>
      <Skeleton loading={!isInitialized} css={{ width: '100%', height: '100%' }}>
        <div id={containerId} css={{ width: '100%', height: '100%' }} />
      </Skeleton>
    </OnRampModalRoot>
  );
});

export default OnRampModal;
