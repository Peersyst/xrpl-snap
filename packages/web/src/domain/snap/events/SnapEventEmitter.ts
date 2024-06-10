import { EventEmitter } from "common/utils/events";

type SpanEvents = {
    onSpanInitialized: () => void;
    onSnapDisconnected: () => void;
};

export const SnapEventEmmiter = new EventEmitter<SpanEvents>();
