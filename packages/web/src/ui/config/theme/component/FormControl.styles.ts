import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        "--background-color": theme.palette.grey[700],
        borderRadius: theme.borderRadius,

        "> *:first-child": {
            borderRadius: "inherit",
        },

        ".LabelRoot": {
            gap: 0,

            ".Label": {
                paddingTop: "0.5rem",
                paddingLeft: 0,
                paddingBottom: "0.5rem",
                fontWeight: 400,
                fontSize: theme.typography.caption.style.fontSize,
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
