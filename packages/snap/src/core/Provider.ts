import { InternalError, InvalidParamsError } from '@metamask/snaps-sdk';
import { type Request as XrplRequest, type SubmittableTransaction, ValidationError } from 'xrpl';
import type { RequestResponseMap } from 'xrpl/src/models/methods';

import { RPCClient } from './rpc-client/RpcClient';

export type XrplResponse<Request extends XrplRequest> = RequestResponseMap<Request>;

export class Provider {
  readonly rpcClient: RPCClient;

  constructor(public node: string) {
    this.rpcClient = new RPCClient(node);
  }

  public async autofill(transaction: SubmittableTransaction): Promise<SubmittableTransaction> {
    try {
      return await this.rpcClient.autofill(transaction);
    } catch (error) {
      if (error instanceof InternalError) {
        throw error;
      } else if (error instanceof ValidationError) {
        throw new InvalidParamsError(error.message);
      }
      throw new InternalError('Failed to autofill transaction');
    }
  }

  public async request<Request extends XrplRequest>(req: Request): Promise<XrplResponse<Request>> {
    try {
      return await this.rpcClient.request(req);
    } catch (error: unknown) {
      let message = `Error calling ${req.command}`;
      if (error instanceof Error) {
        message = error.message;
      }
      throw new InternalError(message);
    }
  }

  public async changeNode(node: string): Promise<void> {
    this.node = node;
  }
}
