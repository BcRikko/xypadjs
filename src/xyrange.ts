import { RangePoint, Range } from './range'

interface Parameter {
  x: Range
  y: Range
}

export class XYRange {
  private readonly x: RangePoint
  private readonly y: RangePoint

  constructor({ x, y }: Parameter) {
    this.x = new RangePoint({ min: x.min, max: x.max })
    this.y = new RangePoint({ min: y.min, max: y.max })
  }

  get xRange(): RangePoint {
    return this.x
  }

  get yRange(): RangePoint {
    return this.y
  }

  get xDistance(): number {
    return this.x.distance
  }

  get yDistance(): number {
    return this.y.distance
  }
}
