import { css } from 'styled-components';

export const SwitchStyles = css(({ theme }) => ({
  '.FormControl': {
    '.Switch': {
      borderRadius: '1rem',
      height: '1.5rem',
      width: '2.5rem',

      '.SwitchThumb': {
        backgroundColor: theme.palette.grey[800],
        boxShadow: 'none',
      },

      '.SwitchTrack': {
        backgroundColor: theme.palette.grey[700],
        padding: '0.25rem',
        boxShadow: 'none',
      },

      '&.Checked': {
        '.SwitchThumb': {
          backgroundColor: theme.palette.grey[700],
        },

        '.SwitchTrack': {
          backgroundColor: theme.palette.accent,
        },
      },
    },
  },
}));
