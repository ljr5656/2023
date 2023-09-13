import { EventEmitter } from '../EventEmitter';
import { Util } from '../Util';
import { ClassPropsToOptions, EFabrictObjecType } from '../type';
import { Rect } from './Rect';

type IFabricObjectOptions = ClassPropsToOptions<
  FabricObject,
  keyof FabricObject
>;

export class FabricObject extends EventEmitter {
  public type: string = EFabrictObjecType.FabricObject;
  public visible: boolean = true;
  public active: boolean = false;
  public moving: boolean = false;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public scaleX: number = 1;
  public scaleY: number = 1;
  public angle: number = 0;
  public fill: string = '#fff';
  public stroke: string = '#000';
  public strokeWidth: number = 1;
  public padding: number = 20;

  public boundingBoxStroke: string = 'blue';
  public boundingBoxStrokeWidth: number = 1;

  //#region
  //#endregion

  constructor(options: IFabricObjectOptions) {
    super();
    this.initialize(options);
  }
  initialize(options) {
    options && this.setOptions(options);
  }
  setOptions(options) {
    for (let prop in options) {
      this[prop] = options[prop];
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.width === 0 || this.height === 0 || !this.visible) return;

    ctx.save();

    this.transform(ctx);

    if (this.stroke) {
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.stroke;
    }

    if (this.fill) {
      ctx.fillStyle = this.fill;
    }

    this._render(ctx);

    if (this.active) {
      this.drawBoundingBox(ctx);
      this.drawControls(ctx);
    }

    ctx.restore();
  }

  // 由子类复写
  protected _render(ctx: CanvasRenderingContext2D) {}

  // 平移 -> 旋转 -> 缩放
  transform(ctx: CanvasRenderingContext2D) {
    const { x, y, scaleX, scaleY, angle } = this;
    ctx.translate(x, y);
    ctx.rotate(Util.degreesToRadians(angle));
    ctx.scale(scaleX, scaleY);
  }

  drawBoundingBox(ctx: CanvasRenderingContext2D) {
    let { padding: p, boundingBoxStroke, boundingBoxStrokeWidth } = this;
    ctx.save();
    const w = this.getWidth();
    const h = this.getHeight();
    ctx.globalAlpha = this.moving ? 0.5 : 1; // 物体变换的时候使其透明度减半，提升用户体验
    ctx.strokeStyle = boundingBoxStroke;
    ctx.lineWidth = boundingBoxStrokeWidth;
    ctx.scale(1 / this.scaleX, 1 / this.scaleY); // 抵消transform的scale
    ctx.strokeRect(-p / 2, -p / 2, w + p, h + p);
    ctx.restore();
  }
  drawControls(ctx: CanvasRenderingContext2D) {
    let { padding: p, boundingBoxStroke, boundingBoxStrokeWidth } = this;
    ctx.save();
    ctx.scale(1 / this.scaleX, 1 / this.scaleY); // 抵消transform的scale

    ctx.strokeStyle = boundingBoxStroke;
    ctx.lineWidth = boundingBoxStrokeWidth;
    ctx.fillStyle = boundingBoxStroke;

    const w = this.getWidth();
    const h = this.getHeight();
    const w2 = w / 2;
    const h2 = h / 2;
    const len = 10;
    const len2 = len / 2;
    const p2 = p / 2;
    const p4 = p / 4;

    let _x, _y;
    _x = -p2 - len2;
    _y = -p2 - len2;
    ctx.fillRect(_x, _y, len, len); // 左上

    _x = w + len2;
    _y = -p2 - len2;
    ctx.fillRect(_x, _y, len, len); // 右上

    _x = w + len2;
    _y = h + len2;
    ctx.fillRect(_x, _y, len, len); // 右下

    _x = -p2 - len2;
    _y = h + len2;
    ctx.fillRect(_x, _y, len, len); // 左下

    _x = -p2 - len2;
    _y = h2 - p4;
    ctx.fillRect(_x, _y, len, len); // 左中

    _x = w2 - p4;
    _y = -p2 - len2;
    ctx.fillRect(_x, _y, len, len); // 上中

    _x = w + len2;
    _y = h2 - p4;
    ctx.fillRect(_x, _y, len, len); // 右中

    _x = w2 - p4;
    _y = h + len2;
    ctx.fillRect(_x, _y, len, len); // 下中

    _x = w2 - p4;
    _y = -p2 - len2 - 20;
    ctx.strokeRect(_x, _y, len, len); // 旋转点

    ctx.restore();
  }

  getWidth(): number {
    return this.width * this.scaleX;
  }

  getHeight(): number {
    return this.height * this.scaleY;
  }
}
