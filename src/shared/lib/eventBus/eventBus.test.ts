import { EventBus } from './eventBus';

interface Events extends Record<string, unknown> {
  event1: string;
  event2: number;
}

describe('EventBus', () => {
  let eventBus: EventBus<Events>;

  beforeEach(() => {
    eventBus = new EventBus<Events>();
  });

  it('должен вызывать подписчика при emit', () => {
    const callback = jest.fn();

    eventBus.on('event1', callback);
    eventBus.emit('event1', 'payload');

    expect(callback).toHaveBeenCalledWith('payload');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать всех подписчиков для события', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.on('event2', callback1);
    eventBus.on('event2', callback2);
    eventBus.emit('event2', 42);

    expect(callback1).toHaveBeenCalledWith(42);
    expect(callback2).toHaveBeenCalledWith(42);
  });

  it('не должен вызывать отписанные обработчики', () => {
    const callback = jest.fn();

    eventBus.on('event1', callback);
    eventBus.off('event1', callback);
    eventBus.emit('event1', 'payload');

    expect(callback).not.toHaveBeenCalled();
  });

  it('должен корректно удалять только один обработчик', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.on('event1', callback1);
    eventBus.on('event1', callback2);

    eventBus.off('event1', callback1);
    eventBus.emit('event1', 'payload');

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith('payload');
  });

  it('не должен падать, если off вызывается для события без слушателей', () => {
    const callback = jest.fn();

    expect(() => {
      eventBus.off('event2', callback);
    }).not.toThrow();
  });

  it('не должен падать при emit события без подписчиков', () => {
    expect(() => {
      eventBus.emit('event1', 'payload');
    }).not.toThrow();
  });

  it('должен корректно работать с разными типами событий', () => {
    const stringCallback = jest.fn();
    const numberCallback = jest.fn();

    eventBus.on('event1', stringCallback);
    eventBus.on('event2', numberCallback);

    eventBus.emit('event1', 'test string');
    eventBus.emit('event2', 123);

    expect(stringCallback).toHaveBeenCalledWith('test string');
    expect(numberCallback).toHaveBeenCalledWith(123);
  });
});
