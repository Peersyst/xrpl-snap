import { EventEmitter } from "common/utils/events";

type TransactionEvents = {
    onTransactionSigned: () => void;
};

export const TransactionEventEmmiter = new EventEmitter<TransactionEvents>();
