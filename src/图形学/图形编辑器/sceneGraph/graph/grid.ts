import { Graph, GraphOptions } from './graph';

export interface GridOptions extends GraphOptions {
  gridSize: number;
}
export class Grid extends Graph {
  gridSize: number;
  constructor(options: GridOptions) {
    super(options);
    this.gridSize = options.gridSize ?? 50;
  }

  override _render(ctx: CanvasRenderingContext2D): void {
    const { width: w, height: h, gridSize } = this;
    ctx.beginPath();

    ctx.strokeStyle = 'blacK';
    ctx.lineWidth = 1;

    for (let i = 0; i < w; i += gridSize) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
    }
    for (let i = 0; i < h; i += gridSize) {
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
