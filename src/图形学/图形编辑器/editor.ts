import { SceneGraph } from './sceneGraph/sceneGraph';

export class Editor {
  public container: HTMLElement;
  public graphicsCanvas!: HTMLCanvasElement;
  public eventCanvas!: HTMLCanvasElement;
  public graphicsCtx!: CanvasRenderingContext2D;
  public eventCtx!: CanvasRenderingContext2D;

  public sceneGraph: SceneGraph;

  constructor(container: HTMLElement) {
    this.container = container;
    this._createGraphicsCanvas();
    this._createEventCanvas();

    this.sceneGraph = new SceneGraph(this);
  }

  private _createGraphicsCanvas() {
    this.graphicsCanvas = document.createElement('canvas');
    this.graphicsCtx = this.graphicsCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.graphicsCanvas.width = this.container.offsetWidth;
    this.graphicsCanvas.height = this.container.offsetHeight;
    this.container.appendChild(this.graphicsCanvas);
  }

  private _createEventCanvas() {
    this.eventCanvas = document.createElement('canvas');
    this.eventCtx = this.eventCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.eventCanvas.width = this.container.offsetWidth;
    this.eventCanvas.height = this.container.offsetHeight;
    this.eventCanvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
    `;
    this.container.appendChild(this.eventCanvas);
  }

  render() {
    this.sceneGraph.render(this.graphicsCtx);
  }
}
