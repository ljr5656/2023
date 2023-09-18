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

  static intersectLineLine(
    a1: Point,
    a2: Point,
    b1: Point,
    b2: Point,
  ): Intersection {
    let result: Intersection = new Intersection(
      IntersectionStatus.NoIntersection,
    );
    const vectorAB = new Point(a2.x - a1.x, a2.y - a1.y);
    const vectorAC = new Point(b1.x - a1.x, b1.y - a1.y);
    const vectorAD = new Point(b2.x - a1.x, b2.y - a1.y);
    const vectorCD = new Point(b2.x - b1.x, b2.y - b1.y);
    const vectorCA = new Point(a1.x - b1.x, a1.y - b1.y);
    const vectorCB = new Point(a2.x - b1.x, a2.y - b1.y);

    const cross1 = vectorAB.cross(vectorAC);
    const cross2 = vectorAB.cross(vectorAD);
    const cross3 = vectorCD.cross(vectorCA);
    const cross4 = vectorCD.cross(vectorCB);

    if (cross1 * cross2 < 0 && cross3 * cross4 < 0) {
      const t = cross3 / (cross3 - cross4);

      const intersectionX = b1.x + vectorCD.x * t;
      const intersectionY = b1.y + vectorCD.y * t;
      const intersectionPoint = new Point(intersectionX, intersectionY);
      result = new Intersection(IntersectionStatus.Intersection);
      result.appendPoint(intersectionPoint);
    }

    return result;
  }
  static intersectLinePolygon(a1: Point, a2: Point, points: Point[]) {
    let result = new Intersection('No Intersection'),
      length = points.length;
    for (let i = 0; i < length; i++) {
      let b1 = points[i],
        b2 = points[i + 1];
      if (!b2) {
        b2 = points[0];
      }
      let inter = Intersection.intersectLineLine(a1, a2, b1, b2);
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
        a2 = points1[i + 1];
      if (!a2) {
        a2 = points1[0];
      }
      let inter = Intersection.intersectLinePolygon(a1, a2, points2);
      result.appendPoints(inter.points);
    }
    if (result.points.length > 0) {
      result.status = IntersectionStatus.Intersection;
    }

    return result;
  }

  // static intersectPolygonRectangle() {}
}
