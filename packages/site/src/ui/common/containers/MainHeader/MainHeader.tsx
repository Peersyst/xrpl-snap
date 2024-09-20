import { Row, Typography, useConfig } from '@peersyst/react-components';
import clsx from 'clsx';
import styled, { css } from 'styled-components';
import SnapLogo from 'ui/common/components/display/SnapLogo/SnapLogo';
import NetworkSelect from 'ui/network/containers/NetworkSelect/NetworkSelect';

import BurguerDropdown from '../BurguerDropdown/BurguerDropdown';

export type MainHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

// @ts-ignore
const MainHeaderRoot = styled(Row)(() => ({
  height: '2.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  paddingRight: '1.5rem',
}));

const HeaderLogo = styled(SnapLogo)(
  () => css`
    position: absolute;
    left: 1.5rem;
    transform: translateY(0.65rem);
    z-index: 1;
    animation: moveDown 0.3s ease-in-out forwards;

    &:hover {
      animation: moveUp 0.3s ease-in-out forwards;
    }

    @keyframes moveDown {
      0% {
        transform: translateY(-1rem);
      }
      100% {
        transform: translateY(0.65rem);
      }
    }

    @keyframes moveUp {
      0% {
        transform: translateY(0.65rem);
      }
      100% {
        transform: translateY(-1rem);
      }
    }
  `,
);

function MainHeader({ className, ...rest }: MainHeaderProps) {
  const projectName = useConfig('projectName');
  return (
    <MainHeaderRoot className={clsx('MainHeader', className)} {...rest}>
      <HeaderLogo />
      <Row flex={1} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" style={{ paddingLeft: '7rem' }}>
          {projectName}
        </Typography>
        <Row justifyContent="space-between" alignItems="center">
          <NetworkSelect
            css={{
              '.SelectMenu': { transform: 'translateX(-5.5rem) !important' },
            }}
          />
          <BurguerDropdown />
        </Row>
      </Row>
    </MainHeaderRoot>
  );
}

export default MainHeader;
