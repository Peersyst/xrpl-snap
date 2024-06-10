import { QRCodeProps as BaseQrCodeProps } from "react-qr-code";

export interface QrCodeStyle {
    size?: number;
    offset?: number;
}

export interface QrCodeProps extends BaseQrCodeProps {
    value: string;
    style?: QrCodeStyle;
    disabled?: boolean;
}

export interface QrCodeRootProps {
    size: number;
}
