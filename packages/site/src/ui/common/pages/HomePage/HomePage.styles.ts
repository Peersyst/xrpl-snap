import styled, { css } from 'styled-components';

export const HomePageTransactionListWrapper = styled.div(({ theme }) => ({
  height: '29.75rem',
  overflowY: 'auto',
  padding: theme.spacing[4],
}));

export const HomeTransactionListShaddow = styled.div(() =>
  css({
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '1.5rem',
    width: '100%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
  }),
);
