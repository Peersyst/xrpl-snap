import { Col } from '@peersyst/react-components';
import styled from 'styled-components';

import BasePage from '../../components/layout/BasePage/BasePage';

export const CardPageContentWrapper = styled(Col)(() => ({
  maxWidth: 'min(60rem, 90vw)',
  width: '100%',
  justifyContent: 'center',
  paddingTop: '3rem',
}));

export const CardPageRoot = styled(BasePage)(() => ({
  alignItems: 'center',
}));
