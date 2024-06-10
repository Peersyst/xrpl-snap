import { Image, Row } from "@peersyst/react-components";
import styled from "styled-components";

export const BalanceCardRoot = styled(Row)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    height: "13.25rem",
}));

export const BalanceCardImageBorder = styled(Image)(() => ({
    width: "1.75rem",
    height: "100%",
    backgroundPosition: "cover",
}));
