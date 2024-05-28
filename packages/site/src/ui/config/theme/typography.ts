import { Theme } from "@peersyst/react-components";

const typography: Partial<Theme["typography"]> = {
    h4: {
        component: "h6",
        style: {
            fontSize: "2rem",
            lineHeight: "119%",
            fontWeight: 700,
        },
    },
    h6: {
        component: "h6",
        style: {
            fontSize: "1.25rem",
            lineHeight: "130%",
            fontWeight: 700,
        },
    },
    heading: {
        component: "h6",
        style: {
            fontSize: "1rem",
            lineHeight: "150%",
            fontWeight: 600,
        },
    },
    body1: {
        component: "p",
        style: {
            fontSize: "1rem",
            lineHeight: "150%",
        },
    },
    body2: {
        component: "p",
        style: {
            fontSize: "0.875rem",
            lineHeight: "171%",
        },
    },
    caption1: {
        component: "span",
        style: {
            fontSize: "0.875rem",
            lineHeight: "143%",
        },
    },
    caption2: {
        component: "span",
        style: {
            fontSize: "0.75rem",
            lineHeight: "133%",
        },
    },
    caption3: {
        component: "span",
        style: {
            fontSize: "0.6rem",
            lineHeight: "123%",
        },
    },
};

export default typography;
