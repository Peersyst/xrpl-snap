import { useTheme } from '@peersyst/react-components';
import Code from 'react-qr-code';

import { QrCodeRoot } from './QrCode.styles';
import type { QrCodeProps } from './QrCode.types';

const QrCode = ({ value, disabled, style: { size = 160, offset = 18, ...restStyle } = {} }: QrCodeProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <QrCodeRoot size={size} style={restStyle}>
      {value && <Code color={disabled ? palette.disabled : undefined} value={value} size={size - offset} />}
    </QrCodeRoot>
  );
};

export default QrCode;
