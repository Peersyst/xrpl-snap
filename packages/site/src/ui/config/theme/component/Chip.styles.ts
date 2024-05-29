import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const ChipStyles = css(({ theme }) => ({
    ".Chip": {
        ".ChipLabel": {
            fontWeight: 700,
        },
        "&.Filled": {
            backgroundColor: theme.palette.grey[800],
        },
        "&.Outlined": {
            color: theme.palette.grey[400],
            border: `1px solid currentColor`,
        },
        "&.Success": {
            color: theme.palette.green[30],
            backgroundColor: theme.palette.green[100],
        },
        "&.Primary": {
            color: theme.palette.purple[30],
            backgroundColor: alpha(theme.palette.purple[30], 0.24),
        },
        "&.Accent": {
            color: theme.palette.purple[30],
            backgroundColor: theme.palette.purple[80],
        },
        "&.Blue": {
            color: theme.palette.blue[30],
            backgroundColor: alpha(theme.palette.blue[30], 0.24),
        },
        "&.Orange": {
            color: theme.palette.orange[30],
            backgroundColor: alpha(theme.palette.orange[30], 0.24),
        },

        "&&.Sm": {
            height: "1.75rem",
            borderRadius: theme.borderRadiusSm,
            columnGap: theme.spacing[1.5],
        },

        "&&.Md": {
            height: "2rem",
            borderRadius: theme.borderRadius,
            columnGap: theme.spacing[2],
        },

        "&&.Lg": {
            height: "2.25rem",
            borderRadius: theme.borderRadius,
            columnGap: theme.spacing[2],
        },
    },
}));
