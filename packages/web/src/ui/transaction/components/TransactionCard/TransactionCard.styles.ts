import styled from "styled-components";
import { Image, Row } from "@peersyst/react-components";

export const TransactionCardRoot = styled(Row)(({ theme }) => ({
    transition: "all 0.3s",
    width: "100%",
    "&:hover": {
        color: theme.palette.primary,
    },
}));

export const DirectionLogo = styled(Image)(() => ({
    width: "2.5rem",
    borderRadius: "50%",
}));
