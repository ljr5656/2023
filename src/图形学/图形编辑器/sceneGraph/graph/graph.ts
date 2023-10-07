import { Utils } from '../../utils';

export enum GraphType {
  graph = 'graph',
  rect = 'rect',
}

export interface GraphOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
}
export class Graph {
  type: GraphType = GraphType.graph;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string = '#fff';
  stroke: string = '#000';

  constructor(options: GraphOptions) {
    Utils.setOptions<GraphOptions>(this, options);
  }

  _render(ctx: CanvasRenderingContext2D) {}

  _transform(ctx: CanvasRenderingContext2D) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this._transform(ctx);
    this._render(ctx);
    ctx.restore();
  }
}
