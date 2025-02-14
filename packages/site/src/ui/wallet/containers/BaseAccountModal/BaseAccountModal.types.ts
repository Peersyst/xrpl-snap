import type { ModalProps } from '../../../common/components/feedback/Modal/Modal.types';

export interface BaseAccountModalProps extends ModalProps {
  address: string;
  footer?: JSX.Element;
  children?: React.ReactNode;
}
