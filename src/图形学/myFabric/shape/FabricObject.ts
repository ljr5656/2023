import { Util } from '../Util';
import { ClassPropsToOptions, EFabrictObjecType } from '../type';

type IFabricObjectOptions = ClassPropsToOptions<
  FabricObject,
  keyof FabricObject
>;

export class FabricObject {
  public type: string = EFabrictObjecType.FabricObject;
  public visible: boolean = true;
  public active: boolean = false;
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

  constructor(options: IFabricObjectOptions) {
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
}
