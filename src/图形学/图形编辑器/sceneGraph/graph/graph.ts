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
  id: number = 0;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  fill: string = '#fff';
  stroke: string = '#000';

  constructor(options: GraphOptions) {
    Utils.setOptions<GraphOptions>(this, options);
  }

  _render(ctx: CanvasRenderingContext2D) {
    throw new Error('not implemented');
  }

  _transform(ctx: CanvasRenderingContext2D) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this._transform(ctx);
    this._render(ctx);
    ctx.restore();
  }
}
