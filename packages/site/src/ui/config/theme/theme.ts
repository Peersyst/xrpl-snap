import { createTheme, ThemePalette } from '@peersyst/react-components';
import typography from './typography';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons';
import { spacingProxy as spacing } from '../spacing';

const grey: ThemePalette['grey'] = {
  '100': '#F5F5F7',
  '200': '#E0E0E1',
  '400': '#A2A2A4',
  '500': '#7F7F80',
  '600': '#454549',
  '700': '#343437',
  '800': '#232325',
  '900': '#1A1A1A',
};

const blue: ThemePalette['blue'] = {
  '30': '#80CCFF',
  '40': '#4BB7FF',
  '90': '#002E4C',
};

const green: ThemePalette['green'] = {
  '30': '#5BEB9D',
  '40': '#84F0B6',
  '100': '#0A2E1B',
};

const magenta: ThemePalette['magenta'] = {
  '90': '#4C0026',
};

const orange: ThemePalette['orange'] = {
  '20': '#FFCCB2',
  '30': '#FFAA80',
  '90': '#4C1A00',
  '100': '#4D1B00',
};

const purple: ThemePalette['purple'] = {
  '30': '#B480FF',
  '40': '#9A52FF',
  '50': '#7919FF',
  '70': '#4A00B2',
  '80': '#350080',
  '90': '#20004C',
};

const error: ThemePalette['error'] = {
  100: '#FFE6EB',
  200: '#F04275',
};

const theme = createTheme({
  icons: {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
  },
  borderRadiusSm: '4px',
  borderRadius: '8px',
  palette: {
    mode: 'dark',
    primary: purple[50],
    accent: purple[30],
    white: '#FFFFFF',
    background: '#111112',
    black: '#000000',
    text: '#FFFFFF',
    placeholder: grey[400],
    disabled: grey[500],
    purple,
    grey,
    blue,
    green,
    magenta,
    orange,
    error,
    status: {
      info: blue[40],
      success: green[40],
      warning: orange[20],
      error: error[200],
    },
  },
  typography: typography,
  fromControl: {
    horizontalPadding: '0.75rem',
    inputHeight: '2.5rem',
  },
  spacing,
});

export default theme;
