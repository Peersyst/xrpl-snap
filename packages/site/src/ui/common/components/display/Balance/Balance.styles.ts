import { Typography } from "@peersyst/react-components";
import { BalanceRootProps } from "./Balance.types";
import styled, { css } from "styled-components";

export const BalanceRoot = styled(Typography)<BalanceRootProps>(
    ({ theme, action }) =>
        css`
            ${action === "add" && `color: ${theme.palette.status.success};`}
        `,
);
