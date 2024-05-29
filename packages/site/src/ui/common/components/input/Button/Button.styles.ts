import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';
import { Button, ButtonSize, ButtonVariant } from '@peersyst/react-components';

import { lighten } from '@peersyst/react-utils';
import { ButtonProps } from './Button.types';

const smSize = css(
  () => css`
    height: 1.5rem;
    padding: 0 0.25rem;
  `,
);

const mdSize = css(
  () => css`
    height: 2rem;
    padding: 0 0.375rem;
  `,
);

const lgSize = css(
  () => css`
    height: 2.5rem;
    padding: 0 1.5rem;
  `,
);

const buttonSizes: Record<
  ButtonSize,
  FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
  sm: smSize,
  md: mdSize,
  lg: lgSize,
};

const primaryStyles = css(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.grey[100],
  ['&:hover']: {
    backgroundColor: theme.palette.purple[70],
  },
  ['&:active']: {
    backgroundColor: theme.palette.purple[90],
  },
  ['&:disabled']: {
    backgroundColor: theme.palette.disabled,
    opacity: 0.4,
  },
}));

const secondaryStyles = css(({ theme }) => ({
  color: theme.palette.primary,
  border: '1px solid currentColor',
  backgroundColor: 'transparent',
  ['&:hover']: {
    backgroundColor: theme.palette.purple[80],
  },
  ['&:active']: {
    backgroundColor: theme.palette.purple[90],
  },
  ['&:disabled']: {
    opacity: 0.4,
    borderColor: theme.palette.disabled,
    color: theme.palette.disabledColor,
  },
}));

const textStyles = css(({ theme }) => ({
  color: theme.palette.accent,
  backgroundColor: 'transparent',
  ['&:hover']: {
    color: lighten(theme.palette.purple[30], 0.2),
  },
  ['&:active']: {
    color: lighten(theme.palette.purple[30], 0.4),
  },
  ['&:disabled']: {
    opacity: 0.4,
  },
}));

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  text: textStyles,
};

export const ButtonRoot = styled(Button)<ButtonProps>(
  ({ size = 'lg', variant = 'primary', theme }) => {
    return css`
      font-size: 0.875rem;
      ${buttonSizes[size]};
      border-radius: ${theme.roundedBorder};
      border: 0;
      font-weight: 600;
      text-transform: none;

      &.Loading {
        opacity: 1;
      }
      ${variantStyles[variant!]};
    `;
  },
);
