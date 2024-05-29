import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        "--background-color": theme.palette.grey[700],
        borderRadius: theme.borderRadius,

        "> *:first-child": {
            backgroundColor: "var(--background-color)",
            borderRadius: "inherit",
        },

        ".LabelRoot": {
            gap: 0,

            ".Label": {
                paddingTop: "0.5rem",
                paddingLeft: theme.fromControl.horizontalPadding,
                fontSize: "0.75rem",
                fontWeight: 500,
            },

            ".LabelChildren": {
                backgroundColor: "inherit",
                borderRadius: "inherit",

                "> *:first-child": {
                    backgroundColor: "inherit",
                    borderRadius: "inherit",
                },
            },
        },

        "&&.Focused": {
            ".Label": {
                color: theme.palette.accent,
            },
        },

        ".FormControlError": {
            marginLeft: 0,
        },
    },
}));
