import { alpha } from '@peersyst/react-utils';
import { css } from 'styled-components';

export const AlertStyles = css(({ theme }) => ({
  '.Alert': {
    padding: '1.5rem',
    '&.Info': {
      color: theme.palette.status.info,
      backgroundColor: alpha(theme.palette.status.info, 0.4),
    },
    '&.Success': {
      color: theme.palette.status.success,
      backgroundColor: alpha(theme.palette.status.success, 0.4),
    },
    '&.Warning': {
      backgroundColor: theme.palette.orange,
      color: theme.palette.orange,
    },
    '&.Error': {
      backgroundColor: theme.palette.magenta[90],
      color: theme.palette.error,
    },
  },
}));
