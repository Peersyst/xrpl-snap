import type { ThemePalette } from "@peersyst/react-components";

const blue = "#4BB7FF";
const green = "#84F0B6";
const orange = "#FFCCB2";

const magenta: ThemePalette["magenta"] = {
    "90": "#4C0026",
};

const purple: ThemePalette["purple"] = {
    "30": "#8E45D6",
    "50": "#AC5CFB",
    "70": "#5E1BA1",
    "90": "#500F90",
};

const error = "#FB5C79";

const basePalette = {
    lemon: "#61D605",
    mode: "dark",
    primary: purple[50],
    accent: purple[30],
    white: "#FFFFFF",
    black: "#000000",
    purple,
    blue,
    green,
    magenta,
    orange,
    error,
    status: {
        info: blue,
        success: green,
        warning: orange,
        error: error,
    },
} as const;

export default basePalette;
