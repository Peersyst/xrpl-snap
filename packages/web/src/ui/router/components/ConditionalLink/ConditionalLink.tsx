import { ConditionalLinkProps } from "./ConditionalLink.types";
import { Link } from "react-router-dom";

const ConditionalLink = ({ condition, children, style, className, ...linkProps }: ConditionalLinkProps): JSX.Element =>
    condition ? (
        <Link css={{ display: "flex" }} style={style} className={className} {...linkProps}>
            {children}
        </Link>
    ) : (
        <span css={{ display: "flex" }} style={style} className={className}>
            {children}
        </span>
    );

export default ConditionalLink;
