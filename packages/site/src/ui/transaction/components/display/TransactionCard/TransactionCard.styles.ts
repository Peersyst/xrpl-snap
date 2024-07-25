import { Row } from '@peersyst/react-components';
import styled from 'styled-components';

export const TransactionCardRoot = styled(Row)(({ theme }) => ({
  transition: 'all 0.3s',
  width: '100%',
  color: theme.palette.text,
  '&:hover': {
    color: theme.palette.primary,
  },
}));
