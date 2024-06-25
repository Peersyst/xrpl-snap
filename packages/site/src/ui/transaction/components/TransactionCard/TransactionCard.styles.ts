import { Image, Row } from '@peersyst/react-components';
import styled from 'styled-components';

export const TransactionCardRoot = styled(Row)(({ theme }) => ({
  transition: 'all 0.3s',
  width: '100%',
  color: theme.palette.text,
  '&:hover': {
    color: theme.palette.primary,
  },
}));

export const DirectionLogo = styled(Image)(() => ({
  width: '2.5rem',
  borderRadius: '50%',
}));
