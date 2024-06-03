import { EventEmitter } from 'common/utils/events';

type SpanEvents = {
  onSpanInitialized: () => void;
};

export const SnapEventEmmiter = new EventEmitter<SpanEvents>();
