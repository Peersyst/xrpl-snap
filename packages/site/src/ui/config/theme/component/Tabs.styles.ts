import { css } from 'styled-components';

export const TabsStyles = css(({ theme }) => ({
  '.Tabs': {
    rowGap: 0,

    '.TabsTab': {
      fontWeight: 500,
      fontSize: '0.875rem',
      color: theme.palette.light,

      '&.Active': {
        fontWeight: 600,
        color: theme.palette.grey[600],
      },
    },

    '.TabIndicator': {
      background: theme.palette.accent,
    },

    '.TabGroup': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
}));
