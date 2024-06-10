import { ExternalLinkProps } from "./ExternalLink.types";
import { ExternalLinkRoot } from "./ExternalLink.styles";

function ExternalLink({ to, children = "", ...typographyProps }: ExternalLinkProps): JSX.Element {
    return (
        <ExternalLinkRoot as={"a" as any} href={to} target="_blank" rel="noopener noreferrer" {...typographyProps}>
            {children}
        </ExternalLinkRoot>
    );
}

export default ExternalLink;
