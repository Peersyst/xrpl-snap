import { css } from 'styled-components';

export const PopoverStyles = css(({ theme }) => ({
  '.PopoverPopper': {
    backgroundColor: theme.palette.inverted,
    color: theme.palette.invertedContrast,
    borderRadius: theme.borderRadius,
    boxShadow: 'unset',
    padding: 0,
    width: '14.5rem',
  },
  '.PopperArrow': {
    '--popper-arrow-size': '0.75rem',
  },
}));
