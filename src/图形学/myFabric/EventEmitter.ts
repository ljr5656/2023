export enum EventType {
  MOUSE_CLICK = 'mouse:click',
  MOUSE_MOVE = 'mouse:move',
  MOUSE_UP = 'mouse:up',
  MOUSE_DOWN = 'mouse:down',
}

export type EventHandler = (...args: any[]) => void;

export class EventEmitter {
  private _events: { [key in EventType]?: EventHandler[] } = {};

  // 订阅
  on(event: EventType, handler: EventHandler): void {
    if (this._events[event] === undefined) {
      this._events[event] = [];
    }
    this._events[event]!.push(handler);
  }

  // 取消
  off(event: EventType, handler: EventHandler): void {
    const eventHandlers = this._events[event];
    if (eventHandlers) {
      this._events[event] = eventHandlers.filter((h) => h !== handler);
    }
  }

  // 发布
  emit(event: EventType, ...args: any[]): void {
    const eventHandlers = this._events[event];
    if (eventHandlers) {
      eventHandlers.forEach((handler) => {
        handler(...args);
      });
    }
  }

  once(event: EventType, handler: EventHandler): void {
    const onceHandler: EventHandler = (...args: any[]) => {
      // 调用原始的处理程序
      handler(...args);
      // 取消订阅
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }
}
