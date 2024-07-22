import { IProps as BaseQRCodeProps } from 'react-qrcode-logo';
import { CSSProperties } from 'react';

export type QrCodeStyle = {
  size?: number;
  offset?: number;
} & CSSProperties;

export type QrCodeProps = {
  value: string;
  style?: QrCodeStyle;
  disabled?: boolean;
  showLogo?: boolean;
} & BaseQRCodeProps;

export type QrCodeRootProps = {
  size: number;
};
