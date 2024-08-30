import { Col } from '@peersyst/react-components';
import styled, { css } from 'styled-components';

export const DesktopOnlyPageRoot = styled(Col)(
  ({ theme }) => css`
    display: flex;
    flex: 1;
    overflow: hidden;
    height: 100%;
    align-items: center;
    position: relative;
    width: 100%;
    justify-content: center;
    .SnapLogoNoMobile {
      width: 85vw;
    }
    .RippleCircle {
      z-index: -1;
      background-color: ${theme.palette.status.error};
    }
  `,
);
