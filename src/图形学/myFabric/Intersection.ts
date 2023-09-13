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

  static intersectLineLine(a1: Point, a2: Point, b1: Point, b2: Point) {}
  static intersectLinePolygon(a1: Point, a2: Point, ps: Point[]) {}
  static intersectPolygonPolygon(ps1: Point[], ps2: Point[]) {}
  // static intersectPolygonRectangle() {}
}
