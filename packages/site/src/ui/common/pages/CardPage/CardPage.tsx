import clsx from 'clsx';
import BasePage from '../../components/layout/BasePage/BasePage';
import MainHeader from '../../containers/MainHeader/MainHeader';
import Footer from '../../components/navigation/Footer/Footer';
import MainCard from 'ui/common/components/surface/MainCard/MainCard';
import styled from 'styled-components';
import { Col } from '@peersyst/react-components';

export interface CardPageProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CardPageContentWrapper = styled(Col)(({ theme }) => ({
  maxWidth: 'min(56.25rem, 90vw)',
  width: '100%',
  justifyContent: 'center',
  paddingTop: '3rem',
}));

const CardPageRoot = styled(BasePage)(() => ({
  alignItems: 'center',
}));

function CardPage({ className, children, ...rest }: CardPageProps) {
  return (
    <CardPageRoot className={clsx('CardPage', className)} {...rest}>
      <CardPageContentWrapper>
        <MainHeader />
        <MainCard style={{ zIndex: 2 }}>{children}</MainCard>
        <Footer />
      </CardPageContentWrapper>
    </CardPageRoot>
  );
}

export default CardPage;
