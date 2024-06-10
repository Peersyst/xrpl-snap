import baseConfig from './config.base.json';
import devConfig from './config.dev.json';
import previewConfig from './config.preview.json';
import prodConfig from './config.prod.json';
import stagingConfig from './config.staging.json';
import type { Config } from './config.types';

const envConfigs: Record<string, Config> = {
  test: { ...baseConfig, ...devConfig },
  development: { ...baseConfig, ...devConfig },
  preview: { ...baseConfig, ...previewConfig },
  production: { ...baseConfig, ...prodConfig },
  staging: { ...baseConfig, ...stagingConfig },
};

const envKey = process.env.REACT_APP_CONFIG_ENV || process.env.NODE_ENV || 'development';

if (!(envKey in envConfigs)) {
  throw new Error(`${envKey} is not a valid env config`);
}

const config = envConfigs[envKey];

export default config;
