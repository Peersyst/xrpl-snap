import Code from "react-qr-code";
import { QrCodeRoot } from "./QrCode.styles";
import { QrCodeProps } from "./QrCode.types";
import { useTheme } from "@peersyst/react-components";

const QrCode = ({ value, disabled, style: { size = 160, offset = 18, ...restStyle } = {} }: QrCodeProps): JSX.Element => {
    const { palette } = useTheme();

    return (
        <QrCodeRoot size={size} style={restStyle}>
            {value && <Code color={disabled ? palette.disabled : undefined} value={value} size={size - offset} />}
        </QrCodeRoot>
    );
};

export default QrCode;
