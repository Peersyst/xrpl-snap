import { css } from "styled-components";

export const AlertStyles = css(({ theme }) => ({
    ".Alert": {
        padding: "1.5rem",
        "&.Info": {
            backgroundColor: theme.palette.blue[90],
            color: theme.palette.blue[40],
        },
        "&.Success": {
            backgroundColor: theme.palette.green[100],
            color: theme.palette.green[40],
        },
        "&.Warning": {
            backgroundColor: theme.palette.orange[90],
            color: theme.palette.orange[20],
        },
        "&.Error": {
            backgroundColor: theme.palette.magenta[90],
            color: theme.palette.error[100],
        },
    },
}));
