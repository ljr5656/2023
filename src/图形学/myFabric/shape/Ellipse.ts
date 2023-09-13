import { EFabrictObjecType } from '../type';
import { FabricObject } from './FabricObject';

export class Ellipse extends FabricObject {
  public type = EFabrictObjecType.Ellipse;
  public rx: number = 0;
  public ry: number = 0;

  constructor(options) {
    super(options);
    this.rx = this.width / 2;
    this.ry = this.height / 2;
  }

  _render(ctx: CanvasRenderingContext2D) {
    const { rx, ry, width: w, height: h } = this;

    ctx.beginPath();

    ctx.ellipse(rx, ry, rx, ry, 0, 0, 2 * Math.PI);

    // 使用贝塞尔曲线绘制椭圆 (效果不理想)
    // const kappa = 0.5522848;
    // const ox = rx * kappa; // 控制点偏移量
    // ctx.moveTo(0, ry); // 左端点
    // ctx.bezierCurveTo(0, ry - ox, rx - ox, 0, rx, 0); // to上端点
    // ctx.bezierCurveTo(rx + ox, 0, w, ry - ox, w, ry); // to右端点
    // ctx.bezierCurveTo(w, ry + ox, rx + ox, h, rx, h); // to下端点
    // ctx.bezierCurveTo(rx - ox, h, 0, ry + ox, 0, ry); // to左端点

    // ctx.lineTo(rx, 0);
    // ctx.lineTo(w, ry);
    // ctx.lineTo(rx, h);
    // ctx.lineTo(0, ry);

    ctx.closePath();

    if (this.fill) ctx.fill();
    if (this.stroke) ctx.stroke();
  }
}
