import { Pointer } from '../src/pointer'

describe('Pointer', () => {
  describe('moveTo', () => {
    test('moveTo(x,y)', () => {
      const p = new Pointer(0, 0)
      p.moveTo(10, 20)

      expect(p.point).toEqual({ x: 10, y: 20 })
    })

    test('moveTo(pointer)', () => {
      const p = new Pointer(0, 0)
      const newPoint = new Pointer(10, 20)
      p.moveTo(newPoint)

      expect(p.point).toEqual({ x: 10, y: 20 })
    })
  })

  describe('equals', () => {
    test('equals(x,y)', () => {
      const p = new Pointer(10, 20)

      expect(p.equals(20, 10)).toBeFalsy()
      expect(p.equals(10, 20)).toBeTruthy()
    })

    test('equals(pointer)', () => {
      const p = new Pointer(10, 20)

      const q1 = new Pointer(20, 10)
      expect(p.equals(q1)).toBeFalsy()

      const q2 = new Pointer(10, 20)
      expect(p.equals(q2)).toBeTruthy()
    })
  })

  describe('add', () => {
    test('add(x,y)', () => {
      const p = new Pointer(10, 20)

      const q1 = p.add(10, 20)
      expect(q1.point).toEqual({ x: 20, y: 40 })

      const q2 = p.add(-20, -10)
      expect(q2.point).toEqual({ x: -10, y: 10 })
    })

    test('add(pointer)', () => {
      const p = new Pointer(10, 20)
      const newPoint = new Pointer(10, 20)

      const q = p.add(newPoint)
      expect(q.point).toEqual({ x: 20, y: 40 })
    })
  })

  describe('sub', () => {
    test('sub(x,y)', () => {
      const p = new Pointer(10, 20)

      const q1 = p.sub(20, 10)
      expect(q1.point).toEqual({ x: -10, y: 10 })

      const q2 = p.sub(-20, -10)
      expect(q2.point).toEqual({ x: 30, y: 30 })
    })

    test('sub(pointer)', () => {
      const p = new Pointer(10, 20)
      const newPoint = new Pointer(10, 20)

      const q = p.add(newPoint)
      expect(q.point).toEqual({ x: 20, y: 40 })
    })
  })

  describe('toString', () => {
    test('toString', () => {
      const p = new Pointer(10, 20)

      expect(p.toString()).toBe('{ x: 10.00, y: 20.00 }')
    })
  })
})
