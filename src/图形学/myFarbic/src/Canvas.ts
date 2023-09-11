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
    this._initInteractive(el, options);
    this._createCacheCanvas();
    this._initEvent();
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
  private _initInteractive(el: HTMLCanvasElement, options) {
    this.upperCanvasEl = el;
    Util.addClass(el, 'upper-canvas');
    this.contextContainer = el.getContext('2d') as CanvasRenderingContext2D;

    for (let prop in options) {
      this[prop] = options[prop];
    }

    this.width = +this.upperCanvasEl.width;
    this.height = +this.upperCanvasEl.height;
    this.upperCanvasEl.style.width = this.width + 'px';
    this.upperCanvasEl.style.height = this.height + 'px';
  }
  private _createCacheCanvas() {}

  private _initEvent() {
    Util.addListener(
      this.upperCanvasEl,
      'mousemove',
      this._onMouseMove.bind(this),
    );
    Util.addListener(this.upperCanvasEl, 'mouseup', this._onMouseUp.bind(this));
    Util.addListener(
      this.upperCanvasEl,
      'mousedown',
      this._onMouseDown.bind(this),
    );
  }

  private _onMouseMove(e: MouseEvent) {
    e.preventDefault();
    const target = this.findTarget(e);
    if (target) {
      this.upperCanvasEl.style.cursor = 'pointer';
    } else {
      this.upperCanvasEl.style.cursor = 'auto';
    }
  }

  private _onMouseDown() {}

  private _onMouseUp() {}

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

  findTarget(e: MouseEvent): FabricObject | undefined {
    let target;
    for (let i = this._objects.length - 1; i >= 0; i--) {
      const object = this._objects[i];
      if (object && this.containsPoint(e, object)) {
        target = object;
        break;
      }
    }
    return target;
  }

  containsPoint(e: MouseEvent, object: FabricObject): boolean {
    const { clientX, clientY } = e;
    const { left, top, width, height } = object;
    if (
      clientX - this.upperCanvasEl.offsetLeft >= left &&
      clientX - this.upperCanvasEl.offsetLeft <= left + width &&
      clientY - this.upperCanvasEl.offsetHeight >= top &&
      clientY - this.upperCanvasEl.offsetHeight <= top + height
    ) {
      return true;
    }
    return false;
  }
}
