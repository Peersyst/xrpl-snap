import { ModalProps } from '../../components/feedback/Modal/Modal.types';

export type BaseAccountModalProps = {
  address: string;
  footer?: JSX.Element;
} & ModalProps;

