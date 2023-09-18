import { Point } from './Point';
import { FabricObject } from './shape/FabricObject';
import { Group } from './shape/Group';
import { ClassPropsToOptions } from './type';
import { Util } from './Util';

type TCanvasoProps = 'width' | 'height';
type ICanvasOptions = ClassPropsToOptions<Canvas, TCanvasoProps>;

export class Canvas {
  public container: HTMLElement;
  public options: ICanvasOptions;
  public width: number;
  public height: number;
  public maxZ: number = 0;

  protected backgroundLayer: HTMLCanvasElement; // 背景层 (暂时不需要)
  protected objectLayer: HTMLCanvasElement; // 对象层(下层)
  protected selectionLayer: HTMLCanvasElement; // 选择层(上层)

  protected blCtx: CanvasRenderingContext2D; // 背景层ctx (暂时不需要)
  protected olCtx: CanvasRenderingContext2D; // 对象层ctx
  protected slCtx: CanvasRenderingContext2D; // 选择层ctx

  private _objects: FabricObject[] = [];

  currentTarget: FabricObject | undefined;
  _isMousedown: boolean = false;
  _mousedownPoint: Point | undefined;
  _mouseupPoint: Point | undefined;

  _selectionFGroup: Group | undefined; // 框选框

  constructor(container: HTMLElement, options: ICanvasOptions) {
    this.container = container;
    const { width, height } = options;
    this.width = width || 1000;
    this.height = height || 1000;
    this._createObjectLayer();
    this._createSectionLayer();
    this._initEvents();
  }
  private _createObjectLayer() {
    this.objectLayer = Util.createCanvasElement();
    this.objectLayer.classList.add('object-layer');
    this._applyCanvasStyle(this.objectLayer);
    this.container.appendChild(this.objectLayer);
    this.olCtx = this.objectLayer.getContext('2d') as CanvasRenderingContext2D;
  }

  private _createSectionLayer() {
    this.selectionLayer = Util.createCanvasElement();
    this.selectionLayer.classList.add('selection-layer');
    this._applyCanvasStyle(this.selectionLayer);
    this.container.appendChild(this.selectionLayer);
    this.slCtx = this.selectionLayer.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
  }

  private _applyCanvasStyle(el: HTMLCanvasElement) {
    el.width = this.width;
    el.height = this.height;
    Util.setStyle(el, {
      position: 'absolute',
      width: this.width + 'px',
      height: this.height + 'px',
      left: 0,
      top: 0,
      userSelect: 'none',
    });
  }

  public add(...args): Canvas {
    this._objects.push(...args);
    this.renderAll();
    return this;
  }

  public renderAll() {
    this.renderObjectLayer();
    this.renderSelectionLayer();
  }
  renderObjectLayer() {
    const ctx = this.olCtx;
    this.clearContext(ctx);
    this._objects.forEach((object) => {
      object.render(ctx);
      if (object.active) {
        object.drawBoundingBox(ctx);
        object.drawControls(ctx);
      }
    });
    this.currentTarget?.drawBoundingBox(ctx);
    this.currentTarget?.drawControls(ctx);
  }

  renderSelectionLayer() {
    const ctx = this.slCtx;
    this.clearContext(ctx);
    this._selectionFGroup?.render(ctx);
  }

  _initEvents() {
    Util.addListener(
      this.selectionLayer,
      'mousemove',
      this._onMouseMove.bind(this),
    );

    Util.addListener(
      this.selectionLayer,
      'mousedown',
      this._onMousedown.bind(this),
    );

    Util.addListener(
      this.selectionLayer,
      'mouseup',
      this._onMouseup.bind(this),
    );
  }

  _onMouseMove(e: MouseEvent) {
    const { style } = this.selectionLayer;
    const target = this.findTarget(e);
    if (target) {
      style.cursor = 'move';
    } else {
      style.cursor = 'default';
    }
    if (this._isMousedown) {
      const { x, y } = this._mousedownPoint!;
      const { clientX, clientY } = e;

      if (this._selectionFGroup === undefined) {
        this._selectionFGroup = new Group([], {
          x,
          y,
          width: clientX - x,
          height: clientY - y,
        });
        this.add(this._selectionFGroup);
      } else {
        this._selectionFGroup.x = x;
        this._selectionFGroup.y = y;
        this._selectionFGroup.width = clientX - x;
        this._selectionFGroup.height = clientX - y;
      }
    }
    this.renderSelectionLayer();
  }
  _onMousedown(e: MouseEvent) {
    this._isMousedown = true;
    this._mousedownPoint = new Point(e.clientX, e.clientY);
    const target = this.findTarget(e);
    if (target && target !== this.currentTarget) {
      this.currentTarget?.trigerActive(false);
      this.currentTarget = target;
      this.currentTarget.trigerActive(true);
    } else {
      this.currentTarget?.trigerActive(false);
      this.currentTarget = undefined;
    }

    this.renderAll();
  }
  _onMouseup(e: MouseEvent) {
    this._isMousedown = false;
    this._mouseupPoint = new Point(e.clientX, e.clientY);
    this.renderAll();

    this._mousedownPoint = undefined;
    this._mouseupPoint = undefined;
  }

  findTarget(e: MouseEvent): FabricObject | undefined {
    const { clientX: x, clientY: y } = e;
    let target: FabricObject | undefined;
    const a1 = new Point(x, y);
    const a2 = new Point(x + 1000, y);
    for (let i = this._objects.length - 1; i >= 0; i--) {
      const object = this._objects[i];
      if (object && this.isPointInShape(a1, a2, object)) {
        target = object;
        break;
      }
    }
    return target;
  }

  isPointInShape(a1, a2, object: FabricObject): boolean {
    let result: boolean = false;
    let xpoints = object._findCrossPoints(a1, a2);
    if (xpoints % 2 !== 0) {
      result = true;
    }
    return result;
  }

  clearContext(ctx: CanvasRenderingContext2D): Canvas {
    ctx && ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }
}
