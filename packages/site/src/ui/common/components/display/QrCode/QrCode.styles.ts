import { QRCode } from 'react-qrcode-logo';
import styled from 'styled-components';

import type { QrCodeRootProps } from './QrCode.types';

export const QrCodeRoot = styled(QRCode)<QrCodeRootProps>(({ theme, size }) => ({
  borderRadius: theme.borderRadius,
  height: size,
  width: size,
  backgroundColor: theme.palette.white,
  justifyContent: 'center',
  alignItems: 'center',
}));
