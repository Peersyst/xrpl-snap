import { Col } from "@peersyst/react-components";
import styled from "styled-components";

export const BasePageRoot = styled(Col)(({ theme }) => ({
    backgroundColor: theme.palette.appBackground,
    flex: 1,
    height: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    paddingTop: theme.spacing[8],
}));
