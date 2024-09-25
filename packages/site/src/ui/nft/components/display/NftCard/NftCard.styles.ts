import { Image } from '@peersyst/react-components';
import styled from 'styled-components';

export const NftCardImage = styled(Image)(({ theme }) => ({
  width: theme.spacing[16],
  minWidth: theme.spacing[16],
  height: theme.spacing[16],
  borderRadius: theme.borderRadius,
}));

export const NftCardImageDefault = styled.div(({ theme }) => ({
  width: theme.spacing[16],
  height: theme.spacing[16],
  borderRadius: theme.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));
