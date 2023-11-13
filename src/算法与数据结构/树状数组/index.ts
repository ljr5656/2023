class NumArray {
  arr: number[] = [];
  constructor(nums: number[]) {
    const n = nums.length + 1;
    const arr = new Array(n).fill(0);
    const sums = new Array(n).fill(0);

    for (let i = 1; i < sums.length; i++) {
      sums[i] = nums[i - 1] + sums[i - 1];
      this.arr[i] = sums[i] - sums[i - this.lowBit(i)];
    }
  }

  update(index: number, val: number): void {
    const d = val - this.sumRange(index, index);

    index += 1;
    while (index < this.arr.length) {
      this.arr[index] += d;
      index = index + this.lowBit(index);
    }
  }

  sumRange(left: number, right: number): number {
    (left += 1), (right += 1);
    return this.sum(right) - this.sum(left - 1);
  }

  lowBit(i: number) {
    return i & -i;
  }

  sum(r: number) {
    let ans = 0;

    while (r > 0) {
      ans += this.arr[r];
      r = r - this.lowBit(r);
    }

    return ans;
  }
}
