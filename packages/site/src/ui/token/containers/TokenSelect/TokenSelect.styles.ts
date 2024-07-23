import { Select } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import styled from 'styled-components';

export const TokenSelectRoot = styled(Select)(({ theme }) => ({
  border: `1px solid`,
  borderColor: theme.palette.grey[200],
  padding: theme.spacing.horizontal(4),
  paddingBottom: theme.spacing[2],
  position: 'relative',
  height: '3.75rem',
  '&.FormControl': {
    borderRadius: theme.borderRadiusXl,
  },
  '&.Focused': {
    borderBottomLeftRadius: 'unset',
    borderBottomRightRadius: 'unset',
    background: alpha(theme.palette.primary, 0.08),
  },
  '.Label.Label.Label': {
    paddingBottom: 'unset',
  },
  transition: '0.2s',
  '.SelectMenu.SelectMenu.SelectMenu.SelectMenu.SelectMenu': {
    width: 'calc(100% + 2px)',
    height: 'fit-content',
    maxHeight: 'calc(8rem + 2px)',
    background: theme.palette.background,
    color: theme.palette.text,
    left: '-1px',
    bottom: '-8rem',
    borderRadius: 'unset',
    borderTopColor: theme.palette.primary,
    borderBottomLeftRadius: theme.borderRadiusXl,
    borderBottomRightRadius: theme.borderRadiusXl,
    '.SelectItem': {
      height: '4rem',
    },
    '.SelectItem:not(:first-child)': {
      borderTop: `1px solid`,
      borderColor: theme.palette.grey[200],
    },
  },
  '.Select': {
    position: 'unset',
    '.SelectDisplay.SelectDisplay.SelectDisplay': {
      minHeight: '2rem',
      maxHeight: '2rem',
      padding: 0,
      '.Placeholder': {
        color: `${alpha(theme.palette.grey[600], 0.2)} `,
      },
      '.SelectDropdown': {
        transform: 'unset',
      },
    },
  },
}));
