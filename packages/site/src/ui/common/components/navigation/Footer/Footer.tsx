import { Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import styled from 'styled-components';
import PeersystLogo from '../../display/PeersystLogo/PeersystLogo';
import { useTranslate } from 'ui/locale';

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const FooterRoot = styled(Row)(() => ({
  height: '3.625rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
}));

function Footer({ className, children, ...rest }: FooterProps) {
  const translate = useTranslate();
  return (
    <FooterRoot className={clsx('Footer', className)} {...rest}>
      <Typography light variant="body1">
        {translate('footerText')}
      </Typography>
      <PeersystLogo />
    </FooterRoot>
  );
}

export default Footer;
