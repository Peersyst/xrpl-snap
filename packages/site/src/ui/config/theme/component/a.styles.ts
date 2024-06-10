import { css } from 'styled-components';

export const aStyles = css(({ theme }) => ({
  a: {
    color: theme.palette.purple[30],
    textDecoration: 'none',
    '&:not(:has(> *)):hover': {
      textDecoration: 'underline',
    },
  },
}));
