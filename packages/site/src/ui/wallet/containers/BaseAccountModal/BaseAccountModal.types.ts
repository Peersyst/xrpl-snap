import { ModalProps } from '../../../common/components/feedback/Modal/Modal.types';

export type BaseAccountModalProps = {
  address: string;
  footer?: JSX.Element;
} & ModalProps;
