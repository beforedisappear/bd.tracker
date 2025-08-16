import { useEffect } from 'react';
import { EventBus } from './eventBus';

export function useEvent<Events extends Record<string, unknown>>(
  eventBus: EventBus<Events>,
  event: keyof Events,
  callback: (data: Events[keyof Events]) => void,
) {
  useEffect(() => {
    eventBus.on(event, callback);

    return () => {
      eventBus.off(event, callback);
    };
  }, [event, callback, eventBus]);
}
