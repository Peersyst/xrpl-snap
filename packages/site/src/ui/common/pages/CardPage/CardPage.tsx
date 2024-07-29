import { Row } from '@peersyst/react-components';
import clsx from 'clsx';
import MainCard from 'ui/common/components/surface/MainCard/MainCard';
import SideBar from 'ui/common/containers/SideBar/SideBar';

import Footer from '../../components/navigation/Footer/Footer';
import MainHeader from '../../containers/MainHeader/MainHeader';
import { CardPageRoot, CardPageContentWrapper } from './CardPage.styles';

export type CardPageProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

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
