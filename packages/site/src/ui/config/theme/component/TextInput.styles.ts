import { css } from 'styled-components';

export const TextInputStyles = css(({ theme }) => ({
  '.FormControl': {
    '&&&&': {
      '.TextInput': {
        border: '1px solid',
        padding: `0 ${theme.fromControl.horizontalPadding}`,
        height: theme.fromControl.inputHeight,
        background: 'transparent',
      },
      '&.Focused': {
        '.TextInput': {
          input: {
            caretColor: theme.palette.accent,
            borderColor: theme.palette.accent,
          },
        },
      },
      '&.Disabled': {
        '.TextInput': {
          background: theme.palette.disabled,
          'input::placeholder': {
            color: theme.palette.disabledColor,
          },
        },
      },
    },
  },
}));
