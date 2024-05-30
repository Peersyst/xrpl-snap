import { Row, Typography, useConfig } from '@peersyst/react-components';
import clsx from 'clsx';
import styled, { css } from 'styled-components';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';

export interface MainHeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const MainHeaderRoot = styled(Row)(() => ({
  height: '2.5rem',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '2rem',
}));

const HeaderLogo = styled(SnapLogo)(
  () => css`
    position: absolute;
    left: 1.5rem;
    transform: translateY(-0.5rem);
    transition: transform 0.2s ease-in-out;
    z-index: 1;
    &:hover {
      transform: translateY(-1.75rem);
    }
  `,
);

function MainHeader({ className, ...rest }: MainHeaderProps) {
  const projectName = useConfig('projectName');
  return (
    <MainHeaderRoot className={clsx('MainHeader', className)} {...rest}>
      <HeaderLogo />
      <Typography variant="h5" style={{ paddingLeft: '4rem' }}>
        {projectName}
      </Typography>
    </MainHeaderRoot>
  );
}

export default MainHeader;
