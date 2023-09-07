import { FabricObject } from './FabricObject';
import { Util } from './Util';
import { Offset } from './interface';

export class Canvas {
  public width: number;
  public height: number;

  public wrapperEl: HTMLElement;
  public lowerCanvasEl: HTMLCanvasElement;
  public upperCanvasEl: HTMLCanvasElement;
  public cacheCanvasEl: HTMLCanvasElement;

  public contextTop: CanvasRenderingContext2D;
  public contextContainer: CanvasRenderingContext2D;
  public contextCache: CanvasRenderingContext2D;

  private _offset: Offset;
  private _objects: FabricObject[];

  constructor(el: HTMLCanvasElement, options) {
    this._initStatic(el, options);
    this._initInteractive();
    this._createCacheCanvas();
  }

  private _initStatic(el: HTMLCanvasElement, options) {
    this.lowerCanvasEl = el;
    Util.addClass(el, 'lower-canvas');
    this.contextContainer = el.getContext('2d') as CanvasRenderingContext2D;

    for (let prop in options) {
      this[prop] = options[prop];
    }

    this.width = +this.lowerCanvasEl.width;
    this.height = +this.lowerCanvasEl.height;
    this.lowerCanvasEl.style.width = this.width + 'px';
    this.lowerCanvasEl.style.height = this.height + 'px';
  }
}
