import { Col } from '@peersyst/react-components';
import styled from 'styled-components';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';

import { TokenSelectDropdownElementProps } from './TokenSelectDropdownElement';

export const TokenSelectDropdownElementRoot = styled(Col)<TokenSelectDropdownElementProps>(({ open }) => ({
  marginTop: open ? '-1rem' : '0',
  paddingBottom: open ? '0' : '1rem',
}));

export const TokenSelectDropdownElementIcon = styled(ChipIconButton)<TokenSelectDropdownElementProps>(({ open, theme }) => ({
  '&.ChipIconButton.ChipIconButton.ChipIconButton': {
    backgroundColor: open ? theme.palette.primary : 'transparent',
    borderColor: theme.palette.primary,
    color: open ? theme.palette.white : theme.palette.primary,
    transition: 'all 0.2s',
    transform: open ? 'rotate(180deg)' : 'rotate(0)',
  },
}));
