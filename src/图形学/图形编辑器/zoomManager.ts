import { Editor } from './editor';
import EventEmitter from '@/utils/eventEmitter';
import { Utils } from './utils';

interface Events {
  zoomChange(zoom: number, prevZoom: number): void;
}

export class ZoomManager {
  private _zoom = 1;
  private _eventEmitter = new EventEmitter<Events>();
  editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
  }

  private getCanvasCenter() {
    const { width, height } = this.editor.viewportManager.getViewport();
    return {
      x: width / 2,
      y: height / 2,
    };
  }

  getZoom() {
    return this._zoom;
  }

  setZoom(zoom: number) {
    const prevZoom = this._zoom;
    const zoomMax = this.editor.setting.get('zoomMax');
    if (zoom > zoomMax) {
      zoom = zoomMax;
    }

    const zoomMin = this.editor.setting.get('zoomMin');
    if (zoom < zoomMin) {
      zoom = zoomMin;
    }
    this._zoom = zoom;
    Promise.resolve().then(() => {
      // 异步通知
      this._eventEmitter.emit('zoomChange', zoom, prevZoom);
    });
  }

  zoomIn(cx?: number, cy?: number) {
    const zoomStep = this.editor.setting.get('zoomStep');
    const prevZoom = this._zoom;
    const zoom = Math.min(
      Utils.remainDecimals(prevZoom * (1 + zoomStep)),
      this.editor.setting.get('zoomMax'),
    );

    this.setZoom(zoom);
    this.adjustScroll(cx, cy, prevZoom);
  }

  zoomOut() {}

  reset() {
    this.setZoom(1);
  }

  adjustScroll(
    cx: number | undefined,
    cy: number | undefined,
    prevZoom: number,
  ) {
    const { _zoom, editor } = this;
    const { viewportManager } = editor;
    const { x: scrollX, y: scrollY } = viewportManager.getViewport();

    let _cx: number;
    let _cy: number;

    if (cx === undefined || cy === undefined) {
      const center = this.getCanvasCenter();
      _cx = center.x;
      _cy = center.y;
    } else {
      _cx = cx;
      _cy = cy;
    }

    const { x: sceneX, y: sceneY } = Utils.viewportCoordsToSceneUtil(
      _cx,
      _cy,
      prevZoom,
      scrollX,
      scrollY,
    );
    const newScrollX = sceneX - _cx / _zoom;
    const newScrollY = sceneY - _cy / _zoom;

    viewportManager.setViewport({
      x: newScrollX,
      y: newScrollY,
    });
  }

  on(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ) {
    this._eventEmitter.on(eventName, handler);
  }
  off(
    eventName: 'zoomChange',
    handler: (zoom: number, prevZoom: number) => void,
  ) {
    this._eventEmitter.off(eventName, handler);
  }
}
