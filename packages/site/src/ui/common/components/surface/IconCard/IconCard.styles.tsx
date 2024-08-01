import { alpha } from '@peersyst/react-utils';
import styled, { css } from 'styled-components';

import Card from '../Card/Card';

export const IconCardRoot = styled(Card)(
  ({ theme }) => css`
    background-color: ${alpha(theme.palette.primary, 0.16)};
    justify-content: center;
    align-items: center;
    width: 5.5rem;
    height: 5.5rem;
    .Icon {
      font-size: 2.5rem;
      color: ${theme.palette.primary};
    }
  `,
);
