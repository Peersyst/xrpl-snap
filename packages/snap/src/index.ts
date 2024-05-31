import type { Json, OnRpcRequestHandler } from '@metamask/snaps-sdk';

import { Context } from './core/Context';
import { HandlerFactory } from './handler/HandlerFactory';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}): Promise<Json> => {
  const handlers = HandlerFactory(await Context.init());
  // eslint-disable-next-line no-prototype-builtins
  if (!handlers.hasOwnProperty(request.method)) {
    throw new Error(`handler method ${request.method} not found`);
  }
  return handlers[request.method].handle(origin, request.params as any) as any;
};
