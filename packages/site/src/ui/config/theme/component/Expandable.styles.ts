import { css } from "styled-components";

export const Expandablestyles = css(({ theme }) => ({
    ".Expandable": {
        borderRadius: theme.borderRadiusSm,
        backgroundColor: theme.palette.grey[700],
        padding: "0 1rem",

        ".ExpandableDisplay": {
            padding: "1rem 0",
            borderBottom: 0,
        },

        ".ExpandableContent": {
            padding: "1rem 0",
            borderTop: `1px solid ${theme.palette.grey[600]}`,
        },

        ".ExpandableFooter": {
            padding: "1rem 0",
            borderTop: `1px solid ${theme.palette.grey[600]}`,
        },
    },
}));
