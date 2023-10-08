export default class EventEmitter<T extends Record<string | symbol, any>> {
  private _eventMap: Record<keyof T, Array<(...args: any[]) => void>> =
    {} as any;
  constructor() {}

  on<K extends keyof T>(eventName: K, listener: T[K]) {
    if (!this._eventMap[eventName]) {
      this._eventMap[eventName] = [];
    }
    this._eventMap[eventName].push(listener);
    return this;
  }

  off<K extends keyof T>(eventName: K, listener: T[K]) {
    if (this._eventMap[eventName]) {
      this._eventMap[eventName] = this._eventMap[eventName].filter(
        (item) => item !== listener,
      );
    }
    return this;
  }

  emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>) {
    const listeners = this._eventMap[eventName];
    if (!listeners || listeners.length === 0) return false;
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  once() {}
}
