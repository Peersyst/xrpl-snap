import { Col } from '@peersyst/react-components';
import styled from 'styled-components';

import type { QrCodeRootProps } from './QrCode.types';

export const QrCodeRoot = styled(Col)<QrCodeRootProps>(({ theme, size }) => ({
  borderRadius: theme.borderRadius,
  height: size,
  width: size,
  backgroundColor: theme.palette.white,
  justifyContent: 'center',
  alignItems: 'center',
}));
