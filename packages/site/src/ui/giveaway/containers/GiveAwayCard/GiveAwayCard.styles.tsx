import { Image, Row } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import styled from 'styled-components';

export const GiveAwayCardRoot = styled(Row)(({ theme }) => ({
  background: alpha(theme.palette.primary, 0.08),
  paddingRight: theme.spacing[3],
  height: '4rem',
  borderRadius: '12px',
  width: '100%',
  overflow: 'hidden',
}));

export const GiveAwayCardContentWrapper = styled(Row)(({ theme }) => ({
  padding: `${theme.spacing[3]} 0`,
  alignItems: 'center',
  flex: 1,
  justifyContent: 'space-between',
}));

export const GiveAwayCardPresentWrapper = styled.div({
  width: '5.75rem',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

// eslint-disable-next-line no-empty-pattern
export const GiveAwayCardBackgroundImage = styled(Image)(({}) => ({
  position: 'absolute',
  top: '-3rem',
  left: 0,
  height: '11rem',
  opacity: 0.9,
  zIndex: -1,
}));
