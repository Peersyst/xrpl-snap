import { spacing } from './spacing';
import type { SpaceDirectionParams, SpaceParams, ThemeSpacing, ThemeSpacingKeys } from './spacing.types';

const spacingHandler: ProxyHandler<ThemeSpacing> = {
  get(target, prop, receiver) {
    const index = Number(prop);
    if (!Number.isNaN(index)) {
      return target[index as ThemeSpacingKeys];
    } else if (prop === 'all') {
      return (...indexes: SpaceParams) => {
        return indexes.map((index) => target[index]).join(' ');
      };
    } else if (prop === 'horizontal') {
      return (...indexes: SpaceDirectionParams) => {
        return indexes.map((index) => `0 ${target[index]}`).join(' ');
      };
    } else if (prop === 'vertical') {
      return (...indexes: SpaceDirectionParams) => {
        return indexes.map((index) => `${target[index]} 0`).join(' ');
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

export const spacingProxy = new Proxy<ThemeSpacing>(spacing as unknown as ThemeSpacing, spacingHandler);
