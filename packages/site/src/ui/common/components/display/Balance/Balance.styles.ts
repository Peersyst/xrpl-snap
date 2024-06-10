import { Typography } from '@peersyst/react-components';
import styled, { css } from 'styled-components';

import type { BalanceRootProps } from './Balance.types';

export const BalanceRoot = styled(Typography)<BalanceRootProps>(
  ({ theme, action }) =>
    css`
      ${action === 'add' && `color: ${theme.palette.status.success};`}
    `,
);
