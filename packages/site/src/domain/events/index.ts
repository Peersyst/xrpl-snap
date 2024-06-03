import { EventsFactory } from 'common/utils/events';
import { SnapEventEmmiter } from 'domain/snap/events';

export const DomainEvents = EventsFactory({
  snap: SnapEventEmmiter,
});
