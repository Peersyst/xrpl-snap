import type { Request as XrplRequest, Transaction } from 'xrpl';
import type { RequestResponseMap } from 'xrpl/src/models/methods';

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
    if (accountDataResponse.result.error) {
      if (accountDataResponse.result.error) {
        throw new Error(accountDataResponse.result.error);
      }
    }

    // eslint-disable-next-line require-atomic-updates
    transaction.Fee = feeResponse.result.drops.open_ledger_fee;
    // eslint-disable-next-line require-atomic-updates
    transaction.Sequence = accountDataResponse.result.account_data.Sequence;
    return transaction;
  }

  public async request<Request extends XrplRequest>(
    req: Request,
  ): Promise<RequestResponseMap<Request> & { result: { error: string } }> {
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
    const resJson: RequestResponseMap<Request> & { result: { error: string } } =
      await res.json();
    if (resJson.result.error) {
      throw new Error(`Error calling ${req.command} - ${resJson.result.error}`);
    }
    return resJson;
  }

  public async changeNode(node: string): Promise<void> {
    this.node = node;
  }
}
