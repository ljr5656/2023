type EventCb = (...args: any[]) => void;

class EventEmitter {
  private _listenersCount = {};
  private _events = {};
  private _paused: boolean = false;
  private _globalMaxListeners: number = Infinity;

  constructor() {}

  // 订阅
  public on(
    namespace: string,
    type: string,
    cb: EventCb,
    maxListeners: number = Infinity,
  ) {
    const fullEventType = this._getFullEventType(namespace, type);
    if (!this._events[fullEventType] || !this._listenersCount[fullEventType]) {
      this._events[fullEventType] = [];
      this._listenersCount[fullEventType] = 0;
    }
    if (
      this._listenersCount[fullEventType] <
      Math.min(maxListeners, this._globalMaxListeners)
    ) {
      this._events[fullEventType].push(cb);
      this._listenersCount[fullEventType]++;
    } else {
      console.warn(
        `Max listeners (${maxListeners}) reached for event type '${fullEventType}'.`,
      );
    }
  }

  // 取消
  public off(namespace: string, type: string, cb: EventCb) {
    const fullEventType = this._getFullEventType(namespace, type);
    if (this._events[fullEventType]) {
      this._events[fullEventType] = this._events[fullEventType].filter(
        (fn) => cb !== fn,
      );
    } else {
      console.warn(`Event type '${fullEventType}' does not exist.`);
    }
  }

  // 发布 (支持异步事件)
  public async emit(namespace: string, type: string, ...args: any[]) {
    const fullEventType = this._getFullEventType(namespace, type);
    if (!this._paused && this._events[fullEventType]) {
      for (const cb of this._events[fullEventType]) {
        await cb(...args);
      }
    }
  }

  // 订阅一次
  public once(namespace: string, type: string, cb: EventCb) {
    const onceHandler = (...args: any[]) => {
      cb(...args);
      this.off(namespace, type, onceHandler);
    };
    this.on(namespace, type, onceHandler);
  }

  public remove(namespace, type: string) {
    const fullEventType = this._getFullEventType(namespace, type);
    delete this._events[fullEventType];
  }

  public removeAll() {
    this._events = {};
  }

  public pause() {
    this._paused = true;
  }

  public publicresume() {
    this._paused = false;
  }

  private _getFullEventType(namespace: string, type: string): string {
    return `${namespace}:${type}`;
  }

  public getListenerCount(namespace: string, type: string): number {
    const fullEventType = this._getFullEventType(namespace, type);
    return this._listenersCount[fullEventType] || 0;
  }

  public getListeners(namespace: string, type: string): EventCb[] {
    const fullEventType = this._getFullEventType(namespace, type);
    return this._events[fullEventType] || [];
  }

  public setGlobalMaxListeners(maxListeners: number) {
    this._globalMaxListeners = maxListeners;
  }
}
