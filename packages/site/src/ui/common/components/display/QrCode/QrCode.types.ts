import type { QRCodeProps as BaseQrCodeProps } from 'react-qr-code';

export type QrCodeStyle = {
  size?: number;
  offset?: number;
};

export type QrCodeProps = {
  value: string;
  style?: QrCodeStyle;
  disabled?: boolean;
} & BaseQrCodeProps;

export type QrCodeRootProps = {
  size: number;
};
