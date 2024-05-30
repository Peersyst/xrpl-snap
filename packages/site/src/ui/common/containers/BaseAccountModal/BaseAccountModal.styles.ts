import { Image, Row } from '@peersyst/react-components';
import styled from 'styled-components';

export const BalanceCardRoot = styled(Row)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}));


export const BalanceCardImageBorder = styled(Image)(({ theme }) => ({
  width: '1.75rem',
  height: '100%',
  backgroundPosition: 'cover',
}));

