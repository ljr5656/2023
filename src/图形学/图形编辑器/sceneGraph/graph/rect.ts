import { Graph, GraphOptions } from './graph';

export interface RectOptions extends GraphOptions {
  rx: number;
  ry: number;
}
export class Rect extends Graph {
  rx: number = 0;
  ry: number = 0;
  constructor(options: RectOptions) {
    super(options);
  }

  override _render(ctx: CanvasRenderingContext2D): void {
    const { x, y, width: w, height: h } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.moveTo(x + w, y);
    ctx.moveTo(x + w, y + h);
    ctx.moveTo(x, y + h);
    ctx.moveTo(x, y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }
}
