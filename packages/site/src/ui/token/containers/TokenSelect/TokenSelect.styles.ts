import { Select } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import styled from 'styled-components';

export const TokenSelectRoot = styled(Select)(({ theme }) => ({
  border: `1px solid`,
  borderColor: theme.palette.grey[200],
  padding: theme.spacing.horizontal(4),
  paddingBottom: theme.spacing[2],
  '&.FormControl': {
    borderRadius: theme.borderRadiusXl,
  },
  '.SelectMenu.SelectMenu.SelectMenu.SelectMenu.SelectMenu': {
    width: '100%',
    '.SelectItem': {
      height: '2.75rem',
    },
  },
  '.Select': {
    '.SelectDisplay.SelectDisplay.SelectDisplay': {
      minHeight: '2rem',
      maxHeight: '2rem',
      '.Placeholder': {
        color: `${alpha(theme.palette.grey[600], 0.2)} `,
      },
      '.Image': {
        filter: 'invert(100%) !important',
      },
    },
  },
}));
