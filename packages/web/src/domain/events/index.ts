import { EventsFactory } from "common/utils/events";
import { NetworkEventEmmiter } from "domain/network/events";
import { SnapEventEmmiter } from "domain/snap/events";
import { TransactionEventEmmiter } from "domain/transaction/events";

export const DomainEvents = EventsFactory({
    snap: SnapEventEmmiter,
    transaction: TransactionEventEmmiter,
    network: NetworkEventEmmiter,
});
