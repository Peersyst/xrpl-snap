import { Row } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import styled from 'styled-components';

export const BaseCardListItemRoot = styled(Row)(({ theme }) => ({
  padding: '1.5rem 2rem',
  transition: 'all 0.3s',
  borderRight: `1.5px solid transparent`,
  '&:hover': {
    borderColor: theme.palette.primary,
    backgroundColor: alpha(theme.palette.primary, 0.08),
  },
}));
