import { createConfig } from '@peersyst/react-components';
import theme from './theme/theme';
import components from './components/components';
import { config as commonConfig } from '../../common/config';

const config = createConfig({
  projectName: commonConfig.projectName,
  themes: {
    default: theme,
  },
  components: components,
});

export default config;
