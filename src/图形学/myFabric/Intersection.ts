import { Point } from './Point';

export enum IntersectionStatus {
  Intersection = 'intersrcetion', // 相交
  NoIntersection = 'noIntersrcetion', // 不相交
  Coincident = 'coincident', // 共线
  Parallel = 'parallel', // 平行
}

export class Intersection {
  public status: IntersectionStatus;
  public points: Point[];
  constructor(status) {
    this.init(status);
  }
  init(status) {
    this.status = status;
    this.points = [];
  }
  appendPoint(point: Point) {
    this.points.push(point);
  }
  appendPoints(points: Point[]) {
    this.points = this.points.concat(points);
  }

  static intersectLineLine(a1: Point, a2: Point, b1: Point, b2: Point) {
    let result: Intersection,
      a1a2 = a2.subtract(a1),
      b1b2 = b2.subtract(b1),
      a1b1 = b1.subtract(a1),
      ua_t = b1b2.cross(a1b1),
      ub_t = a1a2.cross(a1b1),
      u_b = a1a2.cross(b1b2);

    if (u_b === 0) {
      return new Intersection(IntersectionStatus.NoIntersection);
    }
  }
  static intersectLinePolygon(a1: Point, a2: Point, ps: Point[]) {}
  static intersectPolygonPolygon(ps1: Point[], ps2: Point[]) {}
  // static intersectPolygonRectangle() {}
}
