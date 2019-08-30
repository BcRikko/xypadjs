export interface Range {
  min: number
  max: number
}

export class RangePoint {
  private readonly min: number
  private readonly max: number

  constructor({ min, max }: Range) {
    this.min = min
    this.max = max
  }

  get range(): Range {
    return {
      min: this.min,
      max: this.max
    }
  }

  get distance(): number {
    return this.max - this.min
  }

  isInRange(val: number): boolean {
    return this.min <= val && val <= this.max
  }
}
