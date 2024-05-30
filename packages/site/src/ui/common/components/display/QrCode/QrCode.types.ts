import { ViewStyle } from "react-native";

export interface QrCodeStyle extends Omit<ViewStyle, "width" | "height"> {
    size?: number;
    offset?: number;
}

export interface QrCodeProps {
    value: string;
    style?: QrCodeStyle;
    disabled?: boolean;
}

export interface QrCodeRootProps {
    size: number;
}
