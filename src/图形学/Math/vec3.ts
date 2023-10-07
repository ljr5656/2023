export class Vec3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static zero(): Vec3 {
    return new Vec3(0, 0, 0);
  }

  static unitX(): Vec3 {
    return new Vec3(1, 0, 0);
  }

  static unitY(): Vec3 {
    return new Vec3(0, 1, 0);
  }

  static unitZ(): Vec3 {
    return new Vec3(0, 0, 1);
  }

  // 向量大小(模)
  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // 加法
  public add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  // 减法
  public subtract(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  // 标量乘法
  public multiplyScalar(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }
  // 标量除法
  public divideScalar(scalar: number): Vec3 {
    if (scalar !== 0) {
      return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    } else {
      throw new Error('Division by zero');
    }
  }

  // 点积
  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  // 叉积
  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  // 归一化
  public normalize(): Vec3 {
    const length = this.length();
    if (length !== 0) {
      return this.divideScalar(length);
    } else {
      throw new Error('Normalization of a zero-length vector');
    }
  }

  public toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  // 向量角度（弧度）
  public angleTo(other: Vec3): number {
    const dotProduct = this.dot(other);
    const magnitudeProduct = this.length() * other.length();
    return Math.acos(dotProduct / magnitudeProduct);
  }

  // 向量拷贝
  public copy(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  // TODO: 旋转
  public rotate(axis: Vec3, angle: number): Vec3 {
    return new Vec3(0, 0, 0);
  }

  // TODO: 反射
  public reflect(normal: Vec3): Vec3 {
    return new Vec3(0, 0, 0);
  }

  // TODO: 向量插值 LERP
  public lerp(target: Vec3, alpha: number): Vec3 {
    return new Vec3(0, 0, 0);
  }

  // 向量投影
  public projectOnto(other: Vec3): Vec3 {
    const dotProduct = this.dot(other);
    const magnitudeSquared = other.length() ** 2;

    if (magnitudeSquared === 0) {
      throw new Error('Projection onto a zero-length vector is undefined.');
    }

    const scale = dotProduct / magnitudeSquared;
    return other.multiplyScalar(scale);
  }
}
