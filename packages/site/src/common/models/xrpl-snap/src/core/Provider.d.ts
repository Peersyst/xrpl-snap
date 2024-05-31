import type { Request as XrplRequest, Transaction } from 'xrpl';
import type { RequestResponseMap } from 'xrpl/src/models/methods';
export declare type XrplResponse<Request extends XrplRequest> = RequestResponseMap<Request>;
export declare class Provider {
    node: string;
    constructor(node: string);
    autofill(transaction: Transaction): Promise<Transaction>;
    request<Request extends XrplRequest>(req: Request): Promise<XrplResponse<Request>>;
    changeNode(node: string): Promise<void>;
}
