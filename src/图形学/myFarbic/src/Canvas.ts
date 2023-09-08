import { FabricObject } from './FabricObject';
import { Util } from './Util';
import { Offset } from './interface';

export class Canvas {
  public width: number;
  public height: number;
  public visible: boolean = true;
  public angle: number = 0;

  public left: number = 0;
  public top: number = 0;
  public scaleX: number = 1;
  public scaleY: number = 1;

  public wrapperEl: HTMLElement;
  public lowerCanvasEl: HTMLCanvasElement;
  public upperCanvasEl: HTMLCanvasElement;
  public cacheCanvasEl: HTMLCanvasElement;

  public contextTop: CanvasRenderingContext2D;
  public contextContainer: CanvasRenderingContext2D;
  public contextCache: CanvasRenderingContext2D;

  private _offset: Offset;
  private _objects: FabricObject[] = [];

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
  private _initInteractive() {}
  private _createCacheCanvas() {}

  add(...args): Canvas {
    this._objects.push(...args);
    this.renderAll();
    return this;
  }

  renderAll(): Canvas {
    const ctx = this.contextContainer;
    this.clearContext(ctx);
    this._objects.forEach((object) => {
      object.render(ctx);
    });
    return this;
  }

  clearContext(ctx: CanvasRenderingContext2D | undefined): Canvas {
    ctx && ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return this;
  }
}
