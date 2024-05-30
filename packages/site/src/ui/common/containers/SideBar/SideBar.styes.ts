import { Col, Row } from '@peersyst/react-components';
import styled from 'styled-components';

export const SideBarRoot = styled(Col)(({ theme }) => ({
  height: '100%',
  borderRight: `1px solid ${theme.palette.grey[200]}`
}));

export const SideBarAccountRoot = styled(Col)(({ theme }) => ({
  padding: theme.spacing[8],
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}));
