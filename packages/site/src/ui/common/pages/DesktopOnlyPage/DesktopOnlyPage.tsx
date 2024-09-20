import { Col, Image, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { nomobile } from 'ui/assets/images';
import Ripple from 'ui/common/components/feedback/Ripple/Ripple';
import { useTranslate } from 'ui/locale';

import { DesktopOnlyPageRoot } from './DesktopOnlyPage.styles';

export interface DesktopOnlyPageProps {
  className?: string;
  style?: React.CSSProperties;
}

function DesktopOnlyPage({ className, ...rest }: DesktopOnlyPageProps) {
  const translate = useTranslate();
  return (
    <DesktopOnlyPageRoot className={clsx('DesktopOnlyPage', className)} {...rest}>
      <Ripple mobile />
      <Col gap="1.5rem" alignItems="center">
        <Image className="SnapLogoNoMobile" src={nomobile} alt="no-mobile" />
        <Col css={{ maxWidth: '70vw' }} gap="0.5rem">
          <Typography variant="h3" textAlign="center">
            {translate('snapOnlyAvailableInDesktop')}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {translate('snapOnlyAvailableInDesktopText')}
          </Typography>
        </Col>
      </Col>
    </DesktopOnlyPageRoot>
  );
}

export default DesktopOnlyPage;
