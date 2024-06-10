import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const DividerStyles = css(({ theme }) => ({
    ".Divider": {
        color: alpha(theme.palette.grey[100], 0.08),
    },
}));
