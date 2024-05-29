import type { CreateTheme } from '@peersyst/react-components';
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '../../common/icons';
import { spacingProxy as spacing } from '../spacing';
import typography from './typography';

const baseTheme: Omit<CreateTheme, 'palette'> = {
  icons: {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
  },
  borderRadiusSm: '4px',
  borderRadiusXl: '0.75rem',
  borderRadius: '8px',
  roundedBorder: '1000px',
  typography,
  fromControl: {
    horizontalPadding: '0.75rem',
    inputHeight: '2.5rem',
  },
  spacing,
};

export default baseTheme;
