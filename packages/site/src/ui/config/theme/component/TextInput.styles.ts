import { css } from "styled-components";

export const TextInputStyles = css(({ theme }) => ({
    ".FormControl": {
        "&&&&": {
            ".TextInput": {
                border: "none",
                padding: `0 ${theme.fromControl.horizontalPadding}`,
                height: theme.fromControl.inputHeight,
            },
            "&.Focused": {
                ".TextInput": {
                    input: {
                        caretColor: theme.palette.accent,
                    },
                },
            },
            "&.Disabled": {
                ".TextInput": {
                    "input::placeholder": {
                        color: theme.palette.disabled,
                    },
                },
            },
        },
    },
}));
