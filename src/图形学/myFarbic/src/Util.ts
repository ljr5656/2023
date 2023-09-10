import { Point } from './interface';

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

  static makeBoundingBoxFormPotions(points: Point[]) {
    const xPoints = points.map((point) => point.x);
    const yPoints = points.map((point) => point.y);
    const minX = Math.min(...xPoints);
    const maxX = Math.max(...xPoints);
    const minY = Math.min(...yPoints);
    const maxY = Math.min(...yPoints);
    const width = Math.abs(maxX - minX);
    const height = Math.abs(maxY - minY);

    return {
      left: minX,
      top: minY,
      width: width,
      height: height,
    };
  }
}
