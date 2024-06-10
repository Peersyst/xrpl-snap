import { css } from "styled-components";

export const ToastStyles = css(({ theme }) => ({
    ".ToastContainer": {
        ".Alert.Alert": {
            padding: "1.5rem",
            color: theme.palette.white,
            ".Icon`": {
                color: theme.palette.white,
            },
            "&.Info": {
                backgroundColor: theme.palette.primary,
                ".Icon": {
                    color: theme.palette.white,
                },
            },
            "&.Success": {
                backgroundColor: theme.palette.status.success,
                color: theme.palette.black,
            },
            "&.Warning": {
                backgroundColor: theme.palette.status.warning,
                color: theme.palette.black,
            },
            "&.Error": {
                background: theme.palette.error,
                color: theme.palette.white,
            },
        },
    },
}));
