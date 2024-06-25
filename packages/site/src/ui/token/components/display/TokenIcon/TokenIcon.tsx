import { Image } from '@peersyst/react-components';
import { Token } from 'common/models';
import { token_default_logo } from 'ui/assets/images';
import { XRPLogoIcon } from 'ui/common/icons';
import useGetTokenInfo from 'ui/token/query/useGetTokenInfo';

export interface TokenIconProps {
  className?: string;
  style?: React.CSSProperties;
  token: Token;
  loading?: boolean;
  size: string;
}

function TokenIcon({ token, size, loading, style }: TokenIconProps) {
  const { data: { icon } = {} } = useGetTokenInfo(token, { enabled: !loading || token.currency === 'XRP' });
  const css = {
    width: size,
    height: size,
  };
  if (token.currency === 'XRP') {
    return <XRPLogoIcon css={css} style={style} />;
  }

  return (
    <Image
      alt="token-image"
      style={style}
      css={{
        ...css,
        borderRadius: '50%',
        filter: icon ? 'none' : 'invert(100%)',
      }}
      // eslint-disable-next-line no-unneeded-ternary
      src={icon ? icon : token_default_logo}
    />
  );
}

export default TokenIcon;
