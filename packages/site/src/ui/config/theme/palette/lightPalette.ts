import type { ThemePalette } from '@peersyst/react-components';
import basePalette from './basePalette';
import { alpha } from '@peersyst/react-utils';

const grey = {
  '100': '#FFFFFF',
  '150': '#DDDDE6',
  '200': '#E9ECF0',
  '300': '#F0F2F5',
  '400': '#7F7F87',
  '500': '#5A5A60',
  '600': '#232325',
  '700': '#1D1D1E',
  '800': '#191919',
  '900': '#161616',
};

const lightPalette: ThemePalette = {
  ...basePalette,
  disabledColor: grey[100],
  mode: 'light',
  grey,
  background: grey[100],
  text: grey[600],
  light: grey[400],
  placeholder: grey[400],
  disabled: grey[150],
  appBackground: grey[300],
  backdrop: alpha(grey[600], 0.12),
  inverted: grey[600],
  invertedContrast: grey[100],
};

export default lightPalette;
