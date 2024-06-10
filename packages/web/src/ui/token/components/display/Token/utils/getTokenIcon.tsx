import { Image } from "@peersyst/react-components";
import { Token } from "common/models/token";
import { token_default_logo } from "ui/assets/images";
import { XRPLogoIcon } from "ui/common/icons";

const TOKEN_LOGO_MAPPING: Record<string, typeof XRPLogoIcon> = {
    XRP: XRPLogoIcon,
};

const DefaultToken = ({ className, ...props }: any) => (
    <Image
        alt="images"
        className={className}
        css={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            filter: "invert(100%)",
        }}
        src={token_default_logo}
        {...props}
    />
);

export const getTokenIcon = () => {
    function getTokenIcon(token: Token) {
        const Logo = TOKEN_LOGO_MAPPING[token.currency] ?? DefaultToken;
        return Logo;
    }
    return getTokenIcon;
};
