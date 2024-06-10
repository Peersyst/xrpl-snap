import { LinkProps } from "react-router-dom";

export interface ConditionalLinkProps extends LinkProps {
    condition: boolean;
}
