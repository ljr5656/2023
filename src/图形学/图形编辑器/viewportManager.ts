import { Editor } from './editor';
import EventEmitter from '@/utils/eventEmitter';
import { IBox } from './type';
import { Utils } from './utils';
interface Events {
  xOrYChange(x: number | undefined, y: number): void;
}
export class ViewportManager {
  private scrollX = 0;
  private scrollY = 0;
  private eventEmitter = new EventEmitter<Events>();
  editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
  }

  getViewport(): IBox {
    return {
      x: this.scrollX,
      y: this.scrollY,
      width: parseFloat(this.editor.graphicsCanvas.style.width),
      height: parseFloat(this.editor.graphicsCanvas.style.height),
    };
  }

  setViewport({ x, y, width, height }: Partial<IBox>) {
    const prevX = this.scrollX;
    const prevY = this.scrollY;
    const dpr = Utils.getDevicePixelRatio();
    if (x !== undefined) {
      this.scrollX = x;
    }
    if (y !== undefined) {
      this.scrollY = y;
    }
    if (width !== undefined) {
      this.editor.graphicsCanvas.width = width * dpr;
      this.editor.graphicsCanvas.style.width = width + 'px';
    }
    if (height !== undefined) {
      this.editor.graphicsCanvas.height = height * dpr;
      this.editor.graphicsCanvas.style.height = height + 'px';
    }

    if (prevX !== x || prevY !== y) {
      this.eventEmitter.emit('xOrYChange', x as number, y as number);
    }
  }
}
