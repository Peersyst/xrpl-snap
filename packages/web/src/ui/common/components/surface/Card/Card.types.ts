import type { PaperProps, ThemeColor } from "@peersyst/react-components";

export type CardProps = PaperProps & {
    color?: ThemeColor;
};

export type CardRootProps = {
    color: string;
};
