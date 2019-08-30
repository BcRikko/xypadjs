export class Pointer {
  private x: number
  private y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  get point() {
    return {
      x: this.x,
      y: this.y
    }
  }

  moveTo(x: number, y: number): void
  moveTo(pointer: Pointer): void
  moveTo(x: number | Pointer, y?: number): void {
    if (this.isPointer(x)) {
      const { x: dx, y: dy } = x.point
      this.x = dx
      this.y = dy
      return
    }

    this.x = x
    this.y = y
  }

  equals(x: number, y: number): boolean
  equals(pointer: Pointer): boolean
  equals(x: number | Pointer, y?: number): boolean {
    if (this.isPointer(x)) {
      const { x: dx, y: dy } = x.point
      return this.x === dx && this.y === dy
    }

    return this.x === x && this.y === y
  }

  add(x: number, y: number): Pointer
  add(pointer: Pointer): Pointer
  add(x: number | Pointer, y?: number) {
    if (this.isPointer(x)) {
      const { x: dx, y: dy } = x.point
      return new Pointer(this.x + dx, this.y + dy)
    }

    return new Pointer(this.x + x, this.y + y)
  }

  sub(x: number, y: number): Pointer
  sub(pointer: Pointer): Pointer
  sub(x: number | Pointer, y?: number) {
    if (this.isPointer(x)) {
      const { x: dx, y: dy } = x.point
      return new Pointer(this.x - dx, this.y - dy)
    }

    return new Pointer(this.x - x, this.y - y)
  }

  toString(): string {
    return `{ x: ${this.point.x.toFixed(2)}, y: ${this.point.y.toFixed(2)} }`
  }

  private isPointer(val: unknown): val is Pointer {
    return val instanceof Pointer
  }
}
