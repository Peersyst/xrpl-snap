import { alpha } from '@peersyst/react-utils';
import { css } from 'styled-components';

export const SelectStyles = css(({ theme }) => ({
  '.FormControl': {
    '.Select': {
      '.SelectDisplay': {
        border: 'none',
        backgroundColor: 'inherit',
        borderRadius: 'inherit',
        padding: `0 ${theme.fromControl.horizontalPadding}`,
        minHeight: theme.fromControl.inputHeight,
        maxHeight: theme.fromControl.inputHeight,

        '.DisplayContent': {
          fontWeight: 400,
          fontSize: '0.875rem',

          '&.Placeholder': {
            color: theme.palette.placeholder,
          },
        },

        '.SelectDropdown': {
          fontSize: '0.5rem',
        },
      },

      '.SelectMenu': {
        backgroundImage: 'none',
        color: theme.palette.invertedContrast,
        boxShadow: 'none',
        backgroundColor: theme.palette.inverted,
        borderRadius: theme.borderRadius,
        border: `1px solid ${theme.palette.grey[200]}`,

        minWidth: '15rem',

        '.SelectItem': {
          fontSize: '0.875rem',
          fontWeight: 400,
          padding: `${theme.spacing[4]}`,
          height: theme.fromControl.inputHeight,
          display: 'flex',
          alignItems: 'center',

          '&:hover': {
            backgroundColor: alpha(theme.palette.accent, 0.25),
          },

          '&.Selected': {
            backgroundColor: theme.palette.accent,
            fontWeight: 600,
          },
        },
      },
    },
    '&.Focused': {
      '.Select': {
        '.SelectDisplay': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    '&.Disabled': {
      '.Select': {
        '.SelectDisplay': {
          '.DisplayContent': {
            '&.Placeholder': {
              color: theme.palette.disabled,
            },
          },
        },
      },
    },
  },
}));
