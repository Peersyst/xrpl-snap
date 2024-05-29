import { alpha } from '@peersyst/react-utils';
import { css } from 'styled-components';

export const ChipStyles = css(({ theme }) => ({
  '.Chip': {
    '.ChipLabel': {
      fontWeight: 700,
    },
    '&.Filled': {
      backgroundColor: theme.palette.grey[800],
    },
    '&.Outlined': {
      color: theme.palette.grey[400],
      border: `1px solid currentColor`,
    },
    '&.Success': {
      color: theme.palette.green[30],
      backgroundColor: theme.palette.green[100],
    },
    '&.Primary': {
      color: theme.palette.purple[30],
      backgroundColor: alpha(theme.palette.purple[30], 0.24),
    },
    '&.Accent': {
      color: theme.palette.purple[30],
      backgroundColor: theme.palette.purple[80],
    },
    '&.Blue': {
      color: theme.palette.blue[30],
      backgroundColor: alpha(theme.palette.blue[30], 0.24),
    },
    '&.Orange': {
      color: theme.palette.orange[30],
      backgroundColor: alpha(theme.palette.orange[30], 0.24),
    },

    borderRadius: theme.roundedBorder,
    '&&.Sm': {
      height: '1.75rem',
      columnGap: theme.spacing[1.5],
    },

    '&&.Md': {
      height: '2rem',
      columnGap: theme.spacing[2],
      padding: `0 ${theme.spacing[4]}`,
    },

    '&&.Lg': {
      height: '2.25rem',
      columnGap: theme.spacing[2],
    },
  },
}));
