import { Editor } from './editor';

export class ActionManager {
  editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
  }

  viewportTranslate(dx: number, dy: number) {
    this.editor.viewportManager.translate(dx, dy);
    this.editor.sceneGraph.render();
  }

  viewportZoomOut(dx?: number, dy?: number) {
    this.editor.zoomManager.zoomOut(dx, dy);
    this.editor.sceneGraph.render();
  }

  viewportZoomIn(dx?: number, dy?: number) {
    this.editor.zoomManager.zoomIn(dx, dy);
    this.editor.sceneGraph.render();
  }

  viewportZoomReset() {
    this.editor.zoomManager.reset();
    this.editor.sceneGraph.render();
  }
}
