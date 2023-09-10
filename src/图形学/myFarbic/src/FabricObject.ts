import { Offset, Coords, Corner, IAnimationOption } from './interface';
import { Util } from './Util';
import { EventCenter } from './EventCenter';
export class FabricObject extends EventCenter {
  public type: string = 'object';
  /** 是否处于激活态，也就是是否被选中 */
  public active: boolean = true;
  /** 是否可见 */
  public visible: boolean = true;
  /** 默认水平变换中心 left | right | center */
  public originX: string = 'center';
  /** 默认垂直变换中心 top | bottom | center */
  public originY: string = 'center';
  /** 物体位置 top 值 */
  public top: number = 0;
  /** 物体位置 left 值 */
  public left: number = 0;
  /** 物体原始宽度 */
  public width: number = 0;
  /** 物体原始高度 */
  public height: number = 0;
  /** 物体当前的缩放倍数 x */
  public scaleX: number = 1;
  /** 物体当前的缩放倍数 y */
  public scaleY: number = 1;
  /** 物体当前的旋转角度 */
  public angle: number = 0;
  /** 左右镜像，比如反向拉伸控制点 */
  public flipX: boolean = false;
  /** 上下镜像，比如反向拉伸控制点 */
  public flipY: boolean = false;
  /** 选中态物体和边框之间的距离 */
  public padding: number = 0;
  /** 物体缩放后的宽度 */
  public currentWidth: number = 0;
  /** 物体缩放后的高度 */
  public currentHeight: number = 0;
  /** 激活态边框颜色 */
  public borderColor: string = 'red';
  /** 激活态控制点颜色 */
  public cornerColor: string = 'red';
  /** 物体默认填充颜色 */
  public fill: string = 'rgb(0,0,0)';
  /** 混合模式 globalCompositeOperation */
  // public fillRule: string = 'source-over';
  /** 物体默认描边颜色，默认无 */
  public stroke: string;
  /** 物体默认描边宽度 */
  public strokeWidth: number = 1;
  /** 矩阵变换 */
  // public transformMatrix: number[];
  /** 最小缩放值 */
  // public minScaleLimit: number = 0.01;
  /** 是否有控制点 */
  public hasControls: boolean = true;
  /** 是否有旋转控制点 */
  public hasRotatingPoint: boolean = true;
  /** 旋转控制点偏移量 */
  public rotatingPointOffset: number = 40;
  /** 移动的时候边框透明度 */
  public borderOpacityWhenMoving: number = 0.4;
  /** 物体是否在移动中 */
  public isMoving: boolean = false;
  /** 选中态的边框宽度 */
  public borderWidth: number = 1;
  /** 物体控制点用 stroke 还是 fill */
  public transparentCorners: boolean = false;
  /** 物体控制点大小，单位 px */
  public cornerSize: number = 12;
  /** 通过像素来检测物体而不是通过包围盒 */
  public perPixelTargetFind: boolean = false;
  /** 物体控制点位置，随时变化 */
  public oCoords: Coords;
  /** 物体所在的 canvas 画布 */
  public canvas;
  /** 物体执行变换之前的状态 */
  public originalState;
  /** 物体所属的组 */
  public group;
  /** 物体被拖蓝选区保存的时候需要临时保存下 hasControls 的值 */
  public orignHasControls: boolean = true;
  public stateProperties: string[] = (
    'top left width height scaleX scaleY ' +
    'flipX flipY angle cornerSize fill originX originY ' +
    'stroke strokeWidth ' +
    'borderWidth transformMatrix visible'
  ).split(' ');

  constructor(options) {
    super();
    this.initialize(options);
  }
  private initialize(options) {
    options && this.setOptions(options);
  }
  private setOptions(options) {
    for (let prop in options) {
      this[prop] = options[prop];
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.width === 0 || this.height === 0 || !this.visible) return;

    ctx.save();
    this.transform(ctx);

    if (this.stroke) {
      ctx.lineWidth = this.strokeWidth;
      // ctx.strokeStyle = this.stroke;
      ctx.strokeStyle = 'red';
    }

    if (this.fill) {
      ctx.fillStyle = this.fill;
    }

    this._render(ctx);

    if (this.active) {
      // 绘制激活物体边框
      this.drawBoundingBox(ctx);
      // 绘制激活物体四周的控制点
      this.drawControls(ctx);
    }
    ctx.restore();
  }

  public transform(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.left, this.top);
    ctx.rotate(Util.degreesToRadians(this.angle));
    ctx.scale(this.scaleX, this.scaleY);
  }

  // 由子类复写
  protected _render(ctx: CanvasRenderingContext2D) {}

  private drawBoundingBox(ctx: CanvasRenderingContext2D) {
    let padding = this.padding,
      padding2 = padding * 2,
      strokeWidth = 1;
    ctx.save();

    ctx.globalAlpha = this.isMoving ? 0.5 : 1;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.strokeWidth;

    ctx.scale(1 / this.scaleX, 1 / this.scaleY);

    let w = this.getWidth(),
      h = this.getHeight();

    ctx.strokeRect(
      this.left - padding - strokeWidth / 2,
      this.top - padding - strokeWidth / 2,
      w + padding2 + strokeWidth,
      h + padding2 + strokeWidth,
    );

    if (this.hasRotatingPoint && this.hasControls) {
      let rotateHeight = (-h - strokeWidth - padding * 2) / 2;
      ctx.beginPath();
      ctx.moveTo(0, rotateHeight);
      ctx.lineTo(0, rotateHeight - this.rotatingPointOffset); // rotatingPointOffset 是旋转控制点到边框的距离
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
    return this;
  }

  private drawControls(ctx: CanvasRenderingContext2D) {}

  public getWidth(): number {
    return this.width * this.scaleX;
  }
  public getHeight(): number {
    return this.height * this.scaleY;
  }
}
