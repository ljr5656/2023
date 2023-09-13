export class vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x, y);
  }

  // 向量加法
  add(other: vec2): vec2 {
    return new vec2(this.x + other.x, this.y + other.y);
  }

  // 向量减法
  subtract(other: vec2): vec2 {
    return new vec2(this.x - other.x, this.y - other.y);
  }

  // 标量乘法
  multiply(scalar: number): vec2 {
    return new vec2(this.x * scalar, this.y * scalar);
  }

  // 向量长度（模）计算
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**点乘（内积）计算
   * 功能: 两个向量相同位置分量相乘后的和
   * 用途: 计算夹角, 投影, 判断向量之间的相似性
   */
  dot(other: vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * 叉乘（外积）计算
   * 功能: 在二维空间中, 叉乘是一个标量
   * 用途: 计算面积, 判断向量的相对方向(顺时针或逆时针)
   */
  cross(other: vec2): number {
    return this.x * other.y - this.y * other.x;
  }
}
