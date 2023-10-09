import EventEmitter from '@/utils/eventEmitter';
import { Graph } from './graph/graph';
import { Editor } from '../editor';
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

  render(ctx: CanvasRenderingContext2D) {
    const { canvas } = ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    this.children.forEach((element) => {
      element.render(ctx);
    });

    ctx.save();
    this._transform(ctx);
    ctx.restore();
  }

  _transform(ctx: CanvasRenderingContext2D) {
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

  setTranslate(x: number = 0, y: number = 0) {
    this.translateX = x;
    this.translateY = y;
    this.render(this.editor.graphicsCtx);
  }

  setScale(x: number = 1, y: number = 1) {
    this.scaleX = x;
    this.scaleY = y;
    this.render(this.editor.graphicsCtx);
  }
}
