import EventEmitter from '@/utils/eventEmitter';
import { Graph } from './graph/graph';
interface SceneGraphEvents {
  render(): void;
}
export class SceneGraph {
  public children: Graph[] = [];
  private eventEmitter = new EventEmitter<SceneGraphEvents>();
  constructor() {}

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

  render() {}

  on(eventName: 'render', handler: () => void) {
    this.eventEmitter.on(eventName, handler);
  }
  off(eventName: 'render', handler: () => void) {
    this.eventEmitter.off(eventName, handler);
  }
}
