export class Editor {
  public container: HTMLElement;
  public graphicsCanvas: HTMLCanvasElement;
  public eventCanvas: HTMLCanvasElement;
  public graphicsCtx: CanvasRenderingContext2D;
  public eventCtx: CanvasRenderingContext2D;

  constructor(container: HTMLElement) {
    this.container = container;
    this._createGraphicsCanvas();
    this._createEventCanvas();
  }

  private _createGraphicsCanvas() {
    this.graphicsCanvas = document.createElement('canvas');
    this.graphicsCtx = this.graphicsCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.graphicsCanvas.width = this.container.clientWidth;
    this.graphicsCanvas.height = this.container.clientHeight;
    this.container.appendChild(this.graphicsCanvas);
  }

  private _createEventCanvas() {
    this.eventCanvas = document.createElement('canvas');
    this.eventCtx = this.eventCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.eventCanvas.width = this.container.clientWidth;
    this.eventCanvas.height = this.container.clientHeight;
    this.container.appendChild(this.eventCanvas);
  }
}
