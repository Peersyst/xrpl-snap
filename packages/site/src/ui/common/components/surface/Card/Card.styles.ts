import { Paper } from '@peersyst/react-components';
import styled, { css } from 'styled-components';

import type { CardRootProps } from './Card.types';

export const CardRoot = styled(Paper)<CardRootProps>(
  ({ color, theme }) => css`
    border-radius: ${theme.borderRadiusXl};
    background-color: ${color};
  `,
);
