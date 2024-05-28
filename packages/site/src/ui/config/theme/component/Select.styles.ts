import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const SelectStyles = css(({ theme }) => ({
    ".FormControl": {
        ".Select": {
            ".SelectDisplay": {
                border: "none",
                backgroundColor: "inherit",
                borderRadius: "inherit",
                padding: `0 ${theme.fromControl.horizontalPadding}`,
                minHeight: theme.fromControl.inputHeight,
                maxHeight: theme.fromControl.inputHeight,

                ".DisplayContent": {
                    fontWeight: 400,
                    fontSize: "0.875rem",

                    "&.Placeholder": {
                        color: theme.palette.placeholder,
                    },
                },

                ".SelectDropdown": {
                    fontSize: "0.5rem",
                },
            },

            ".SelectMenu": {
                backgroundColor: "inherit",
                backgroundImage: "none",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,

                ".SelectItem": {
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    padding: `0 ${theme.fromControl.horizontalPadding}`,
                    height: theme.fromControl.inputHeight,
                    display: "flex",
                    alignItems: "center",

                    "&:hover": {
                        backgroundColor: alpha(theme.palette.accent, 0.25),
                    },

                    "&.Selected": {
                        backgroundColor: theme.palette.accent,
                        fontWeight: 600,
                    },
                },
            },
        },
        "&.Focused": {
            ".Select": {
                ".SelectDisplay": {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                },
            },
        },
        "&.Disabled": {
            ".Select": {
                ".SelectDisplay": {
                    ".DisplayContent": {
                        "&.Placeholder": {
                            color: theme.palette.disabled,
                        },
                    },
                },
            },
        },
    },
}));
