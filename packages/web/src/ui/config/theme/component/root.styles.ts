import { css } from "styled-components";

export const BASE_PAGE_PADDING = "2.5rem";
export const BASE_PAGE_PADDING_SM = "1.75rem";

export const rootStyles = css(({ theme }) => ({
    "#root": {
        height: "100%",
    },
    ":root": {
        "--base-page-padding": BASE_PAGE_PADDING,
        [theme.breakpoints.down("md")]: {
            "--base-page-padding": BASE_PAGE_PADDING_SM,
        },
    },
    "#gatsby-focus-wrapper, #___gatsby, html, body": {
        height: "100%",
    },
}));
