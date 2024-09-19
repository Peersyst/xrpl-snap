import { TabGroup, TabPanel } from '@peersyst/react-components';
import styled from 'styled-components';

export const SideBarTabGroup = styled(TabGroup)(({ theme: { spacing } }) => ({
  padding: spacing.horizontal(8),
}));

export const SideBarTabPanel = styled(TabPanel)(({ theme: { palette } }) => ({
  height: '100%',
  borderTop: `1px solid ${palette.grey[200]}`,
  maxHeight: '32rem',
  overflowY: 'auto',
  paddingBottom: '2rem',
}));
