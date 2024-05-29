import { css } from 'styled-components';

export const PopoverStyles = css(({ theme }) => ({
  '.PopoverPopper': {
    backgroundColor: theme.palette.grey[600],
    padding: '1rem',
    borderRadius: theme.borderRadius,
    boxShadow: 'unset',
  },
  '.PopperArrow': {
    '--popper-arrow-size': '0.75rem',
  },
}));
