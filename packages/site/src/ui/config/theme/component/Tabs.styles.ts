import { css } from "styled-components";

export const TabsStyles = css(({ theme }) => ({
    ".Tabs": {
        rowGap: 0,

        ".TabsTab": {
            fontWeight: 600,
            fontSize: "1rem",
            color: theme.palette.grey[500],
            padding: "0.5rem 0",

            "&.Active": {
                color: theme.palette.accent,
            },
        },

        ".TabIndicator": {
            background: theme.palette.accent,
        },

        ".TabGroup": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
    },
}));
