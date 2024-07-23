import { IProps as BaseQRCodeProps } from 'react-qrcode-logo';

export type QrCodeProps = {
  value: string;
  disabled?: boolean;
  showLogo?: boolean;
} & BaseQRCodeProps;

export type QrCodeRootProps = {
  size: number;
};
