import { Row } from '@peersyst/react-components';
import styled from 'styled-components';
import { alpha } from '@peersyst/react-utils';

export const TokenCardRoot = styled(Row)(({ theme }) => ({
  padding: '1.5rem 2rem',
  transition: 'all 0.3s',
  borderRight: `1.5px solid transparent`,
  '&:hover': {
    borderColor: theme.palette.primary,
    backgroundColor: alpha(theme.palette.primary, 0.08),
  },
}));
