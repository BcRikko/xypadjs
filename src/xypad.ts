import { Pointer } from './pointer'
import { DraggablePointer, DragEvent } from './draggable-pointer'
import { Range } from './range'
import { XYRange } from './xyrange'

interface Parameter {
  el: string
  pointerColor?: string
  width?: number
  height?: number
  xRange?: Range
  yRange?: Range
  onDragStart?: DragEvent
  onDragMove?: DragEvent
  onDragEnd?: DragEvent
  callback?: (pointer: Pointer) => void
}

export default class XYPad {
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D
  private readonly callback: Parameter['callback']
  private readonly pointerColor: Parameter['pointerColor']
  private readonly xyRange: XYRange
  private readonly onDragStart: Parameter['onDragStart']
  private readonly onDragMove: Parameter['onDragMove']
  private readonly onDragEnd: Parameter['onDragEnd']
  private draggablePointer: DraggablePointer
  private pointRadius = 4
  private readonly pointZoomRate = 2

  constructor({
    el,
    pointerColor = 'black',
    width = 300,
    height = 300,
    xRange = { min: -100, max: 100 },
    yRange = { min: -100, max: 100 },
    onDragStart = () => {},
    onDragMove = () => {},
    onDragEnd = () => {},
    callback = () => {}
  }: Parameter) {
    const parent = document.querySelector(el)
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('xypad')
    this.canvas.style.cursor = 'pointer'

    this.canvas.width = width
    this.canvas.height = height
    parent.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')

    this.pointerColor = pointerColor

    this.xyRange = new XYRange({
      x: xRange,
      y: yRange
    })

    this.onDragStart = onDragStart
    this.onDragMove = onDragMove
    this.onDragEnd = onDragEnd
    this.callback = callback
    this.draggablePointer = new DraggablePointer({
      element: this.canvas,
      pointer: new Pointer(width / 2, height / 2),
      onDragStart: p => {
        this.pointRadius *= this.pointZoomRate
        this.render(p)
        this.onDragStart(p)
        this.callback(this.calcPoint(p))
      },
      onDragMove: p => {
        this.render(p)
        this.onDragMove(p)
        this.callback(this.calcPoint(p))
      },
      onDragEnd: p => {
        this.pointRadius /= this.pointZoomRate
        this.render(p)
        this.onDragEnd(p)
        this.callback(this.calcPoint(p))
      }
    })

    this.render(this.draggablePointer.point)
  }

  private render(pointer: Pointer): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.save()

    this.context.fillStyle = this.pointerColor
    this.context.beginPath()
    const p = pointer.sub(this.pointRadius / (this.pointZoomRate * 2), this.pointRadius / (this.pointZoomRate * 2))
    this.context.arc(p.point.x, p.point.y, this.pointRadius, 0, 2 * Math.PI)
    this.context.fill()
    this.context.restore()
  }

  private calcPoint(pointer: Pointer): Pointer {
    const x = (this.xyRange.xDistance / this.canvas.width) * pointer.point.x - this.xyRange.xDistance / 2
    const y = (this.xyRange.yDistance / this.canvas.width) * pointer.point.y - this.xyRange.yDistance / 2

    return new Pointer(x, y)
  }

  public movePointerTo(pointer: Pointer): void
  public movePointerTo(x: number, y: number): void
  public movePointerTo(x: number | Pointer, y?: number): void {
    if (x instanceof Pointer) {
      this.draggablePointer.point = x
      return
    }

    this.draggablePointer.point = new Pointer(x, y)
  }

  public destroy(): void {
    this.draggablePointer.destroy()
  }

  public getPointer(): Pointer {
    return this.draggablePointer.point
  }
}
