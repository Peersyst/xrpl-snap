import { Col, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';
import BasePage from 'ui/common/components/layout/BasePage/BasePage';
import { useTranslate } from 'ui/locale';

export interface LoadingPageProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function LoadingPage({ className, children, ...rest }: LoadingPageProps) {
  const translate = useTranslate();
  return (
    <BasePage>
      <Col
        flex={1}
        justifyContent="center"
        alignItems="center"
        className={clsx('LoadingPage', className)}
        {...rest}
      >
        <SnapLogo width={200} height={200} />
        <Typography variant="h6" fontWeight={400}>
          {translate('loading')}
        </Typography>
      </Col>
    </BasePage>
  );
}

export default LoadingPage;
