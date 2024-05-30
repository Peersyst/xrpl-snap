import { Col } from "@peersyst/react-components";
import { QrCodeRootProps } from "./QrCode.types";
import styled from 'styled-components';

export const QrCodeRoot = styled(Col)<QrCodeRootProps>(({ theme, size }) => ({
    borderRadius: theme.borderRadius,
    height: size,
    width: size,
    backgroundColor: theme.palette.gray.light,
    justifyContent: "center",
    alignItems: "center",
}));
