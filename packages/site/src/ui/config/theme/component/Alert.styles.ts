import { alpha } from '@peersyst/react-utils';
import { css } from 'styled-components';

export const AlertStyles = css(({ theme }) => ({
  '.Alert': {
    padding: '1.5rem',
    '&.Info': {
      color: theme.palette.text,
      backgroundColor: alpha(theme.palette.primary, 0.08),
      '.Icon': {
        color: theme.palette.primary,
      },
    },
    '&.Success': {
      backgroundColor: alpha(theme.palette.status.success, 0.08),
    },
    '&.Warning': {
      backgroundColor: alpha(theme.palette.status.warning, 0.08),
    },
    '&.Error': {
      backgroundColor: alpha(theme.palette.status.error, 0.08),
    },
  },
}));
