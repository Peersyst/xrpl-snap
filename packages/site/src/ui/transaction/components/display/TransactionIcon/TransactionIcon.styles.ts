import { alpha } from '@peersyst/react-utils';
import styled, { css } from 'styled-components';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';
import { ArrowInIcon } from 'ui/common/icons';

export const ReceivedIcon = styled(ArrowInIcon)(
  ({ theme }) => css`
    path:nth-child(2) {
      fill: ${theme.palette.white} !important;
    }
  `,
);

export const TransactionCardIconRoot = styled(ChipIconButton)(
  ({ theme }) => css`
    .ChipLabel.ChipLabel.ChipLabel {
      font-size: 1.25rem;
    }
    &.Active.Active.Active {
      background-color: ${alpha(theme.palette.primary, 0.08)};
      border-color: transparent;
      .Icon {
        color: ${theme.palette.primary};
      }
    }
    &:hover {
      &.Active.Active.Active {
        border: 1px solid ${alpha(theme.palette.primary, 0.8)};
        .Icon {
          color: ${theme.palette.primary};
        }
      }
    }
  `,
);
