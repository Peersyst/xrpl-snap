import { css } from "styled-components";

export const BASE_PAGE_PADDING = "2.5rem";
export const BASE_PAGE_PADDING_SM = "1.75rem";

export const rootStyles = css(({ theme }) => ({
    ":root": {
        "--base-page-padding": BASE_PAGE_PADDING,
        [theme.breakpoints.down("md")]: {
            "--base-page-padding": BASE_PAGE_PADDING_SM,
        },
    },
}));
