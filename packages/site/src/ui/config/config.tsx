import { createConfig } from '@peersyst/react-components';
import lightTheme from './theme/lightTheme';
import components from './components/components';
import { config as commonConfig } from '../../common/config';

const config = createConfig({
  projectName: commonConfig.projectName,
  themes: {
    default: lightTheme,
  },
  components: components,
});

export default config;
