import { ClassPropsToOptions } from './type';
import { Util } from './Util';

type TCanvasoProps = 'width' | 'height';
type ICanvasOptions = ClassPropsToOptions<Canvas, TCanvasoProps>;

export class Canvas {
  public container: HTMLElement;
  public width: number;
  public height: number;

  protected backgroundLayer: HTMLCanvasElement; // 背景层 (暂时不需要)
  protected objectLayer: HTMLCanvasElement; // 对象层(下层)
  protected selectionLayer: HTMLCanvasElement; // 选择层(上层)

  protected blCtx: CanvasRenderingContext2D; // 背景层ctx (暂时不需要)
  protected olCtx: CanvasRenderingContext2D; // 对象层ctx
  protected slCtx: CanvasRenderingContext2D; // 选择层ctx

  constructor(container: HTMLElement, options: ICanvasOptions) {
    this.container = container;
    const { width, height } = options;
    this.width = width || 1000;
    this.height = height || 1000;
    this._createObjectLayer();
    this._createSectionLayer();
  }
  private _createObjectLayer() {
    this.objectLayer = Util.createCanvasElement();
    this.objectLayer.classList.add('object-layer');
    this._applyCanvasStyle(this.objectLayer);
    this.container.appendChild(this.objectLayer);
    this.olCtx = this.objectLayer.getContext('2d') as CanvasRenderingContext2D;
  }

  private _createSectionLayer() {
    this.selectionLayer = Util.createCanvasElement();
    this.selectionLayer.classList.add('selection-layer');
    this._applyCanvasStyle(this.selectionLayer);
    this.container.appendChild(this.selectionLayer);
    this.slCtx = this.selectionLayer.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
  }

  private _applyCanvasStyle(el: HTMLCanvasElement) {
    el.width = this.width;
    el.height = this.height;
    Util.setStyle(el, {
      position: 'absolute',
      width: this.width + 'px',
      height: this.height + 'px',
      left: 0,
      top: 0,
      userSelect: 'none',
    });
  }
}
