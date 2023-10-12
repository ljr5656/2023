import EventEmitter from '@/utils/eventEmitter';

interface Events {
  update(attrs: SettingValue): void;
}
export class Setting {
  private _eventEmitter = new EventEmitter<Events>();
  private _value = {
    canvasBgColor: '#f4f4f4',

    selectionStroke: '#0f8eff',
    selectionFill: '#0f8eff33',

    //#region text
    defaultFontSize: 12,
    //#endregion

    //#region zoom
    zoomStep: 0.2, // 缩放比例步长
    zoomMax: 256,
    zoomMin: 0.02,
    //#endregion
  };

  set<K extends keyof Setting['_value']>(key: K, value: Setting['_value'][K]) {
    this._value[key] = value;
    this._eventEmitter.emit('update', this.getAttrs());
  }
  get<K extends keyof Setting['_value']>(key: K) {
    return this._value[key];
  }

  getAttrs() {
    return { ...this._value };
  }

  on(eventName: 'update', handler: (value: Setting['_value']) => void) {
    this._eventEmitter.on(eventName, handler);
  }
  off(eventName: 'update', handler: (value: Setting['_value']) => void) {
    this._eventEmitter.off(eventName, handler);
  }
}

export type SettingValue = Setting['_value'];
