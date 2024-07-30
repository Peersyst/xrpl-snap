import { Row } from '@peersyst/react-components';
import styled from 'styled-components';

export const TransactionRoot = styled(Row)<{ loading: boolean }>(({ theme, loading }) => ({
  transition: 'all 0.3s',
  width: '100%',
  color: theme.palette.text,
  cursor: loading ? 'unset' : 'pointer',
  '&:hover': {
    color: theme.palette.primary,
  },
}));
