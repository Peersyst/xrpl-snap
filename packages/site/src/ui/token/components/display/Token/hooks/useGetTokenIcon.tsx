import { Image } from '@peersyst/react-components';
import { Token } from 'common/models/token';
import { token_default_logo } from 'ui/assets/images';
import { XRPLogoIcon } from 'ui/common/icons';

const TOKEN_LOGO_MAPPING: Record<string, typeof XRPLogoIcon> = {
  XRP: XRPLogoIcon,
};

const DefaultToken = () => (
  <Image
    alt="images"
    css={{
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      filter: 'invert(100%)',
    }}
    src={token_default_logo}
  />
);

export const useGetTokenIcon = (token: Token) => {
  const Logo = TOKEN_LOGO_MAPPING[token.currency] ?? DefaultToken;
  return <Logo fontSize={'2.5rem'} />;
};
