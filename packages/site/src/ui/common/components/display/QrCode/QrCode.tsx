import { useTheme } from '@peersyst/react-components';
import { xrpl_snap_fox_logo } from 'ui/assets/images';

import { QrCodeRoot } from './QrCode.styles';
import type { QrCodeProps } from './QrCode.types';

const QrCode = ({
  value = '',
  disabled,
  showLogo = true,
  logoWidth = 34,
  logoPadding = 4,
  logoPaddingStyle = 'square',
  size = 144,
  quietZone = 8,
  style,
  ...rest
}: QrCodeProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <QrCodeRoot
      removeQrCodeBehindLogo
      fgColor={disabled ? palette.disabled : undefined}
      logoWidth={logoWidth}
      logoImage={showLogo ? xrpl_snap_fox_logo : undefined}
      logoPadding={logoPadding}
      logoPaddingStyle={logoPaddingStyle}
      quietZone={quietZone}
      value={value}
      style={{ borderRadius: '0.5rem', ...style }}
      size={size}
      {...rest}
    />
  );
};

export default QrCode;
