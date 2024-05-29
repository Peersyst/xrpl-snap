import prodConfig from './config.prod.json';
import devConfig from './config.dev.json';
import stagingConfig from './config.staging.json';
import testConfig from './config.test.json';
import baseConfig from './config.base.json';
import { Config } from './config.types';

const envConfigs: Record<string, Config> = {
  test: { ...baseConfig, ...testConfig },
  development: { ...baseConfig, ...devConfig },
  production: { ...baseConfig, ...prodConfig },
  staging: { ...baseConfig, ...stagingConfig },
};

const envKey = process.env.REACT_APP_CONFIG_ENV || process.env.NODE_ENV!;

if (!(envKey in envConfigs))
  throw new Error(`${envKey} is not a valid env config`);

const config = envConfigs[envKey] as Config;

export default config;
