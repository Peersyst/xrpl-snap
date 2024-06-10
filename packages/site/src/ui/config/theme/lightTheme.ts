import { createTheme } from '@peersyst/react-components';

import baseTheme from './baseTheme';
import lightPalette from './palette/lightPalette';

const theme = createTheme({
  ...baseTheme,
  palette: lightPalette,
});

export default theme;
