import { IconButton, Modal, Col } from '@peersyst/react-components';
import styled, { css } from 'styled-components';
import { CloseIcon } from 'ui/common/icons';

export const ModalRoot = styled(Modal)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    --modal-padding: 2rem;
    position: relative;
    padding: var(--modal-padding);
    max-width: calc(100% - 4rem);
    background-color: ${theme.palette.grey[800]};
    border-radius: ${theme.borderRadius};

    ${theme.breakpoints.down('mobile')} {
      max-height: calc(100% - 4rem);
      height: auto;
    }
  `,
);

export const CloseModalButton = styled(IconButton).attrs({
  children: <CloseIcon />,
})(
  ({ theme }) => css`
    position: absolute;
    top: 1.375rem;
    right: 1.375rem;
    font-size: 0.875rem;
    color: ${theme.palette.grey[400]};
  `,
);

export const ModalHeader = styled(Col).attrs({
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.5rem',
})(
  () => css`
    text-align: center;
  `,
);