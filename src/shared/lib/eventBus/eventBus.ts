type EventCallback<T> = (payload: T) => void;

export class EventBus<Events extends Record<string, unknown>> {
  private listeners: Map<
    keyof Events,
    Array<EventCallback<Events[keyof Events]>>
  > = new Map();

  on<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    (this.listeners.get(event) as EventCallback<Events[K]>[]).push(callback);
  }

  off<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>) {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    const filteredListeners = eventListeners.filter(cb => cb !== callback);
    if (filteredListeners.length > 0) {
      this.listeners.set(event, filteredListeners);
    } else {
      this.listeners.delete(event);
    }
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }
}
