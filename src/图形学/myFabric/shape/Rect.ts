import { EFabrictObjecType } from '../type';
import { FabricObject } from './FabricObject';

export class Rect extends FabricObject {
  public type = EFabrictObjecType.Rect;
  public rx: number = 0;
  public ry: number = 0;
  constructor(options) {
    super(options);
    this.rx = options.rx || 0;
    this.ry = options.ry || 0;
  }
  _render(ctx: CanvasRenderingContext2D) {
    const { width: w, height: h, rx, ry } = this;

    ctx.beginPath();

    ctx.moveTo(rx, 0);
    ctx.lineTo(w - rx, 0);
    ctx.bezierCurveTo(w, 0, w, ry, w, ry);
    ctx.lineTo(w, h - ry);
    ctx.bezierCurveTo(w, h, w - rx, h, w - rx, h);
    ctx.lineTo(rx, h);
    ctx.bezierCurveTo(0, h, 0, h - ry, 0, h - ry);
    ctx.lineTo(0, ry);
    ctx.bezierCurveTo(0, 0, rx, 0, rx, 0);

    ctx.closePath();

    if (this.fill) ctx.fill();
    if (this.stroke) ctx.stroke();
  }
}
