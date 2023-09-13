export class Util {
  static createElement<T extends HTMLElement>(type: string = 'div'): T {
    const el = document.createElement(type) as T;
    return el;
  }

  static createCanvasElement(): HTMLCanvasElement {
    return Util.createElement<HTMLCanvasElement>('canvas');
  }
  static addClassname(el: HTMLElement, classname: string | string[]) {
    if (typeof classname === 'string') classname = [classname];
    el.classList.add(...classname);
  }

  static setStyle(el: HTMLElement, props: { [key: string]: string | number }) {
    Object.entries(props).forEach(([key, value]) => {
      el.style[key] = value;
    });
  }

  static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
