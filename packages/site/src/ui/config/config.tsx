import { createConfig } from '@peersyst/react-components';

import { config as commonConfig } from '../../common/config';
import components from './components/components';
import lightTheme from './theme/lightTheme';
import validators from './validators/validators';

const config = createConfig({
  projectName: commonConfig.projectName,
  themes: {
    default: lightTheme,
  },
  validators,
  components,
});

export default config;
