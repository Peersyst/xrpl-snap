import { Token } from 'common/models/token';
import { DefaultTokenIcon, XRPLogoIcon } from 'ui/common/icons';

const TOKEN_LOGO_MAPPING: Record<string, typeof DefaultTokenIcon> = {
  "XRP": XRPLogoIcon,
}

export const useGetTokenIcon = () => {
  return (token: Token) => {
    const Logo = TOKEN_LOGO_MAPPING[token.currency] ?? DefaultTokenIcon
    return <Logo fontSize={40} />
  };
};
