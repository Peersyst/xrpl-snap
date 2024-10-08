import 'styled-components';
import type { Theme } from '@peersyst/react-components';
import type { CSSProp } from 'styled-components';

import type { ThemeSpacing, ThemeSpacing } from '../spacing';

import 'styled-components/cssprop';

// Custom components theme
declare module '@peersyst/react-components' {
  export interface ThemePalette {
    accent: string;
    white: string;
    black: string;
    disabledColor: string;
    purple: {
      '30': string;
      '50': string;
      '70': string;
      '90': string;
    };
    blue: string;
    green: string;
    magenta: {
      '90': string;
    };
    orange: string;
    grey: {
      '100': string;
      '150': string;
      '200': string;
      '300': string;
      '400': string;
      '500': string;
      '600': string;
      '700': string;
      '800': string;
      '900': string;
    };
    error: string;
    placeholder: string;
    light: string;
    appBackground: string;
    inverted: string;
    invertedContrast: string;
    lemon: string;
  }

  export interface CreateThemeTypography {}

  export interface TypographyVariantsOverrides {
    subtitle1: false;
    subtitle2: false;
  }

  export interface Theme {
    fromControl: {
      horizontalPadding: string;
      inputHeight: string;
    };
    borderRadiusSm: string;
    borderRadiusXl: string;
    spacing: ThemeSpacing;
    roundedBorder: string;
  }

  export interface CreateTheme {
    fromControl: {
      horizontalPadding: string;
      inputHeight: string;
    };
    borderRadiusSm: string;
    borderRadiusXl: string;
    spacing: ThemeSpacing;
    roundedBorder: string;
  }
}

// Type styled components theme with our components theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Use css prop in components
declare module 'react' {
  export interface Attributes {
    css?: CSSProp<Theme>;
  }
}
