import { Modal } from '@peersyst/react-components';
import styled, { css } from 'styled-components';

export const OnRampModalRoot = styled(Modal)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    --modal-padding: 2rem;
    position: relative;
    padding: 0;
    max-width: calc(100% - 4rem);
    width: 27.75rem;
    height: 80vh;

    background-color: ${theme.palette.background};
    border-radius: 16px;
    overflow: hidden;

    ${theme.breakpoints.down('mobile')} {
      max-height: calc(100% - 4rem);
    }
  `,
);
