import type { Json } from '@metamask/snaps-sdk';

import type { HandlerParams } from './HandlerFactory';

export type IHandler<Params extends HandlerParams> = {
  handle(origin: string, params: Params): Promise<Json>;
};
