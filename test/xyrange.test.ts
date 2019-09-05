import { XYRange } from '../src/xyrange'
import { Range } from '../src/range'

describe('XYRange', () => {
  const xRange: Range = { min: -100, max: 100 }
  const yRange: Range = { min: -100, max: 100 }
  const xyRange = new XYRange({
    x: xRange,
    y: yRange
  })

  test('xRange', () => {
    expect(xyRange.xRange).toEqual(xRange)
  })

  test('xRange', () => {
    expect(xyRange.xRange).toEqual(yRange)
  })

  test('xDistance', () => {
    expect(xyRange.xDistance).toBe(200)
  })

  test('xDistance', () => {
    expect(xyRange.yDistance).toBe(200)
  })
})
