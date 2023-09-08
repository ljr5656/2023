const PiBy180 = Math.PI / 180;

export class Util {
  static addClass(el: HTMLElement, className: string | string[]) {
    if (typeof className === 'string') {
      el.classList.add(className);
    } else {
      className.forEach((item) => {
        el.classList.add(item);
      });
    }
  }

  // 角度转弧度
  static degreesToRadians(degrees: number): number {
    return degrees * PiBy180;
  }
  // 弧度转角度
  static radiansToDegrees(radians: number): number {
    return radians / PiBy180;
  }
}
