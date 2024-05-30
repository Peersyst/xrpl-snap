import { Row } from '@peersyst/react-components';
import clsx from 'clsx';
import styled from 'styled-components';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';

export interface MainHeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const MainHeaderRoot = styled(Row)(() => ({
  height: '2.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '1.5rem',
}));

function MainHeader({ className, ...rest }: MainHeaderProps) {
  return (
    <MainHeaderRoot className={clsx('MainHeader', className)} {...rest}>
      <SnapLogo />
    </MainHeaderRoot>
  );
}

export default MainHeader;
