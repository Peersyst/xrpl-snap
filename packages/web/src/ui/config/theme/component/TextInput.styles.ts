import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const TextInputStyles = css(({ theme }) => ({
    ".FormControl": {
        ".FormControlHint": {
            marginTop: "0.25rem",
            overflow: "visible",
        },
        "&.TextField": {
            border: `1px solid`,
            borderColor: theme.palette.grey[200],
            padding: theme.spacing.horizontal(4),
            borderRadius: theme.borderRadiusXl,
            height: "3.75rem",
            ".Label": {
                paddingBottom: 0,
            },
        },
        "&&&&": {
            ".TextInput": {
                marginTop: "-0.25rem",
                border: "none",
                padding: 0,
                height: theme.fromControl.inputHeight,
                color: theme.palette.text,
                fontWeight: "500",
                background: "transparent",
                "input::placeholder": {
                    color: `${alpha(theme.palette.grey[600], 0.2)} `,
                },
            },
            "&.Focused": {
                borderColor: theme.palette.primary,
                ".TextInput": {
                    input: {
                        caretColor: theme.palette.accent,
                        borderColor: theme.palette.accent,
                    },
                },
            },
            "&.Invalid:not(.Focused)": {
                background: alpha(theme.palette.status.error, 0.08),
                borderColor: theme.palette.status.error,
            },
            "&.Disabled": {
                background: theme.palette.disabled,
                ".TextInput": {
                    "input::placeholder": {
                        color: alpha(theme.palette.grey[600], 0.2),
                    },
                },
                ".Label": {
                    color: theme.palette.grey[400],
                },
            },
        },
    },
}));
