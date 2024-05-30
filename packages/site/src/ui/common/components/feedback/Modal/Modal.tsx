import { Col, Typography, useTheme } from '@peersyst/react-components';
import { useControlled } from '@peersyst/react-hooks';
import {
  CloseModalButton,
  ModalRoot,
} from 'ui/common/components/feedback/Modal/Modal.styles';
import type { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';

const Modal = ({
  open: openProp,
  title,
  alignTitle,
  children,
  elevation = 0,
  onClose,
  closable = true,
  subtitle,
  ...rest
}: ModalProps): JSX.Element => {
  const [open, setOpen] = useControlled(true, openProp);
  const { spacing} = useTheme();

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  return (
    <ModalRoot
      open={open}
      elevation={elevation}
      onClose={handleClose}
      closable={closable}
      {...rest}
    >
      <Col css={{ height: '100%' }} gap="1rem" className="ModalContainer">
        {title && (
          <Col alignItems={alignTitle} gap={spacing[2]}>
            <Typography variant="h3">{title}</Typography>
            {subtitle && (
              <Typography variant="body1" fontWeight={400} color="grey.400">
                {subtitle}
              </Typography>
            )}
          </Col>
        )}
        {closable && <CloseModalButton onClick={handleClose} />}
        {children}
      </Col>
    </ModalRoot>
  );
};

export default Modal;
