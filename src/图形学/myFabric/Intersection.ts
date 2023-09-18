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
      if (ua_t === 0 || ub_t === 0) {
        result = new Intersection(IntersectionStatus.Coincident);
      } else {
        result = new Intersection(IntersectionStatus.Parallel);
      }
    } else {
      let ua = ua_t / u_b,
        ub = ub_t / u_b;
      if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        result = new Intersection('Intersection');
        result.points.push(
          new Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)),
        );
      } else {
        result = new Intersection('No Intersection');
      }
    }

    return result;
  }
  static intersectLinePolygon(a1: Point, a2: Point, points: Point[]) {
    let result = new Intersection('No Intersection'),
      length = points.length;
    for (let i = 0; i < length; i++) {
      let b1 = points[i],
        b2 = points[i + 1],
        inter = Intersection.intersectLineLine(a1, a2, b1, b2);
      result.appendPoints(inter.points);
    }
    if (result.points.length > 0) {
      result.status = IntersectionStatus.Intersection;
    }

    return result;
  }
  static intersectPolygonPolygon(points1: Point[], points2: Point[]) {
    let result = new Intersection('No Intersection'),
      length = points1.length;
    for (let i = 0; i < length; i++) {
      let a1 = points1[i],
        a2 = points1[i + 1],
        inter = Intersection.intersectLinePolygon(a1, a2, points2);
      result.appendPoints(inter.points);
    }
    if (result.points.length > 0) {
      result.status = IntersectionStatus.Intersection;
    }

    return result;
  }
  // static intersectPolygonRectangle() {}
}
