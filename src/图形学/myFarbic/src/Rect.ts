import { FabricObject } from './FabricObject';

export class Rect extends FabricObject {
  public type: string = 'rect';
  public rx: number = 0;
  public ry: number = 0;
  constructor(options) {
    super(options);
    this._initRxRy(options);
  }
  _initRxRy(options) {
    this.rx = options.rx || 0;
    this.ry = options.ry || 0;
  }
  protected _render(ctx: CanvasRenderingContext2D) {
    debugger;
    let rx = this.rx || 0,
      ry = this.ry || 0,
      x = 0,
      y = 0,
      w = this.width,
      h = this.height;
    ctx.beginPath();
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + w - rx, y);
    // ctx.bezierCurveTo(x + w, y, x + w, y + ry, x + w, y + ry);
    ctx.lineTo(x + w, y + h - ry);
    // ctx.bezierCurveTo(x + w, y + h, x + w - rx, y + h, x + w - rx, y + h);
    ctx.lineTo(x + rx, y + h);
    // ctx.bezierCurveTo(x, y + h, x, y + h - ry, x, y + h - ry);
    ctx.lineTo(x, y + ry);
    // ctx.bezierCurveTo(x, y, x + rx, y, x + rx, y);
    ctx.closePath();
    if (this.fill) ctx.fill();
    if (this.stroke) ctx.stroke();
  }
}
