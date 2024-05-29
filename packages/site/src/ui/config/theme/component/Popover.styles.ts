import { css } from 'styled-components';

export const PopoverStyles = css(({ theme }) => ({
  '.PopoverPopper': {
    backgroundColor: theme.palette.grey[700],
    padding: '1rem',
    borderRadius: theme.borderRadius,
  },
  '.PopperArrow': {
    '--popper-arrow-size': '0.75rem',
  },
}));
