import EventEmitter from '@/utils/eventEmitter';
import { Graph } from './graph/graph';
import { Editor } from '../editor';
import { Utils } from '../utils';
interface SceneGraphEvents {
  render(): void;
}
export class SceneGraph {
  public editor: Editor;
  public children: Graph[] = [];
  private eventEmitter = new EventEmitter<SceneGraphEvents>();

  translateX: number = 0;
  translateY: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  addElements(elements: Graph[], idx?: number) {
    if (idx === undefined) {
      this.children.push(...elements);
    } else {
      this.children.splice(idx, 0, ...elements);
    }
  }

  getElementById(id: number) {
    return this.children.find((item) => item.id === id);
  }
  removeElements(elements: Graph[]) {
    if (elements.length > 1) {
      elements.forEach((element) => {
        this.removeElements([element]);
      });
    } else {
      const element = elements[0];
      const idx = this.children.indexOf(element);
      if (idx !== -1) {
        this.children.splice(idx, 1);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D = this.editor.graphicsCtx) {
    const { editor } = this;
    const { viewportManager, zoomManager, setting } = editor;
    const viewport = viewportManager.getViewport();
    const zoom = zoomManager.getZoom();
    const { canvas } = ctx;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景色
    ctx.save();
    ctx.fillStyle = setting.get('canvasBgColor');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // 场景坐标转换为视口坐标
    const dpr = Utils.getDevicePixelRatio();
    const dx = -viewport.x;
    const dy = -viewport.y;
    console.log('render zoom', zoom);
    ctx.scale(dpr * zoom, dpr * zoom);
    ctx.translate(dx, dy);

    // this.children.forEach((element) => {
    //   element.render(ctx);
    // });

    ctx.save();
    ctx.strokeStyle = '#000';
    ctx.strokeRect(100, 100, 200, 200);
    ctx.restore();

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.restore();

    // ctx.save();
    // this._transform(ctx);
    // ctx.restore();
  }

  _transform(ctx: CanvasRenderingContext2D = this.editor.graphicsCtx) {
    const { translateX, translateY, scaleX, scaleY } = this;
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.scale(scaleX, scaleY);
    ctx.restore();
  }

  on(eventName: 'render', handler: () => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'render', handler: () => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
