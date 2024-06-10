import { TypographyProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export type ExternalLinkProps = Omit<TypographyProps, "children" | "onClick" | "color" | "variant"> & {
    to?: string;
    children: ReactNode;
};
