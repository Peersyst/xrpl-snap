import { Col, Row } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import styled, { css } from 'styled-components';
import { nebula } from 'ui/assets/images';
import Modal from 'ui/common/components/feedback/Modal/Modal';

export const GiveAwayModalRoot = styled(Modal)(
  () => css`
    padding: 0;
    .ModalContainer {
      row-gap: 0;
    }
  `,
);

export const GiveAwayModalHeader = styled(Row)(({ theme }) =>
  css({
    height: '8.75rem',
    backgroundColor: alpha(theme.palette.primary, 0.08),
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  }),
);

export const GiveAwayModalHeaderBackground = styled(Row)(() =>
  css({
    height: '100%',
    width: '100%',
    backgroundImage: `url(${nebula})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '1.5rem',
    opacity: 0.8,
    position: 'absolute',
  }),
);

export const GiveAwayModalBody = styled(Col)(({ theme }) => ({
  padding: theme.spacing[6],
  rowGap: theme.spacing[6],
}));

export const GiveAwayFooterCard = styled(Col)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary, 0.08),
  borderRadius: 20,
}));

export const GiveAwayFooterCardContent = styled(Row)(({ theme }) => ({
  padding: theme.spacing.all(3, 4),
  justifyContent: 'space-between',
}));
