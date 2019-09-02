import { RangePoint } from "../src/range";

describe('RangePoint', () => {
  test('distance', () => {
    const r1 = new RangePoint({ min: -100, max: 100 })
    expect(r1.distance).toBe(200)

    const r2 = new RangePoint({ min: 100, max: 200 })
    expect(r2.distance).toBe(100)
  })

  test('isInRange', () => {
    const r = new RangePoint({ min: -100, max: 100 })

    expect(r.isInRange(-100)).toBeTruthy()
    expect(r.isInRange(-101)).toBeFalsy()
    expect(r.isInRange(100)).toBeTruthy()
    expect(r.isInRange(101)).toBeFalsy()
  })
})
