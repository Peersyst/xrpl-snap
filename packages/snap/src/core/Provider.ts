import { InternalError } from '@metamask/snaps-sdk';
import type { Request as XrplRequest, Transaction } from 'xrpl';
import type { RequestResponseMap } from 'xrpl/src/models/methods';

export type XrplResponse<Request extends XrplRequest> = RequestResponseMap<Request>;

export class Provider {
  constructor(public node: string) {}

  public async autofill(transaction: Transaction): Promise<Transaction> {
    const [accountDataResponse, feeResponse] = await Promise.all([
      this.request({
        command: 'account_info',
        account: transaction.Account,
      }),
      this.request({
        command: 'fee',
      }),
    ]);

    // eslint-disable-next-line require-atomic-updates
    transaction.Fee = feeResponse.result.drops.open_ledger_fee;
    // eslint-disable-next-line require-atomic-updates
    transaction.Sequence = accountDataResponse.result.account_data.Sequence;
    return transaction;
  }

  public async request<Request extends XrplRequest>(req: Request): Promise<XrplResponse<Request>> {
    const res = await fetch(this.node, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        method: req.command,
        params: [req],
      }),
    });
    const resJson: XrplResponse<Request> & { result: { error: string } } = await res.json();
    if (resJson.result.error) {
      throw new InternalError(`Error calling ${req.command} - ${resJson.result.error}`);
    }
    return resJson;
  }

  public async changeNode(node: string): Promise<void> {
    this.node = node;
  }
}
