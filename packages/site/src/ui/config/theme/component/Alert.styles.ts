import { alpha } from '@peersyst/react-utils';
import { css } from 'styled-components';

export const AlertStyles = css(({ theme }) => ({
  '.Alert.Alert.Alert': {
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
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
      color: theme.palette.text,
      backgroundColor: alpha(theme.palette.status.warning, 0.4),
    },
    '&.Error': {
      color: theme.palette.error,
      backgroundColor: alpha(theme.palette.status.error, 0.08),
    },
  },
}));
