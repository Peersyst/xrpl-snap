import styled from "styled-components";

export const PeersystLogoRoot = styled.a(({ theme }) => ({
    display: "flex",
    svg: {
        color: theme.palette.text,
        width: "6rem",
        height: "auto",
    },
    "&:hover": {
        opacity: 0.8,
    },
}));
