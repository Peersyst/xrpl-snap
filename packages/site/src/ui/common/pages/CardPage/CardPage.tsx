import { Col, Row } from '@peersyst/react-components';
import clsx from 'clsx';
import styled from 'styled-components';
import MainCard from 'ui/common/components/surface/MainCard/MainCard';
import SideBar from 'ui/common/containers/SideBar/SideBar';

import BasePage from '../../components/layout/BasePage/BasePage';
import Footer from '../../components/navigation/Footer/Footer';
import MainHeader from '../../containers/MainHeader/MainHeader';

export type CardPageProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const CardPageContentWrapper = styled(Col)(() => ({
  maxWidth: 'min(58rem, 90vw)',
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
        <MainCard style={{ zIndex: 2 }}>
          <Row flex={1}>
            <SideBar />
            {children}
          </Row>
        </MainCard>
        <Footer />
      </CardPageContentWrapper>
    </CardPageRoot>
  );
}

export default CardPage;
