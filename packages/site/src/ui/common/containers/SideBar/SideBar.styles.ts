import { Col } from '@peersyst/react-components';
import styled from 'styled-components';

export const SideBarRoot = styled(Col)(({ theme }) => ({
  height: '43rem',
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  width: '18.25rem',
}));

export const SideBarAccountRoot = styled(Col)(({ theme }) => ({
  padding: theme.spacing[8],
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  height: '9.25rem',
  justifyContent: 'space-between',
}));
