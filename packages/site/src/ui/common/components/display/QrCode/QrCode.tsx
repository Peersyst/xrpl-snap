import { useTheme } from '@peersyst/react-components';
import { QRCode } from 'react-qrcode-logo';
import { xrpl_snap_fox_logo } from 'ui/assets/images';

import { QrCodeRoot } from './QrCode.styles';
import type { QrCodeProps } from './QrCode.types';

const QrCode = ({
  value = '',
  disabled,
  showLogo = true,
  logoWidth = 36,
  logoPadding = 4,
  style: { size = 160, offset = 18, ...restStyle } = {},
}: QrCodeProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <QrCodeRoot size={size} style={restStyle}>
      <QRCode
        fgColor={disabled ? palette.disabled : undefined}
        logoWidth={logoWidth}
        logoImage={showLogo ? xrpl_snap_fox_logo : undefined}
        logoPadding={logoPadding}
        value={value}
        size={size - offset}
      />
    </QrCodeRoot>
  );
};

export default QrCode;
