import { Pointer } from './pointer'

interface Parameter {
  element: HTMLCanvasElement
  pointer?: Pointer
  onDragStart?: DragEvent
  onDragMove?: DragEvent
  onDragEnd?: DragEvent
}

export type DragEvent = (pointer: Pointer) => void

export class DraggablePointer {
  private readonly element: Parameter['element']
  private readonly onDragStart: Parameter['onDragStart']
  private readonly onDragMove: Parameter['onDragMove']
  private readonly onDragEnd: Parameter['onDragEnd']
  private currentPoint: Parameter['pointer']
  private canvasPoint = new Pointer()
  private startPoint = new Pointer()
  private isDragging = false

  constructor({
    element,
    pointer = new Pointer(),
    onDragStart: onDragStart = (): void => {},
    onDragMove: onDragMove = (): void => {},
    onDragEnd: onDragEnd = (): void => {}
  }: Parameter) {
    this.element = element
    this.onDragStart = onDragStart
    this.onDragMove = onDragMove
    this.onDragEnd = onDragEnd
    this.currentPoint = pointer

    this.initialize()
  }

  get point(): Pointer {
    return this.currentPoint
  }

  set point(pointer: Pointer) {
    this.currentPoint = pointer
  }

  private initialize(): void {
    this.element.addEventListener('mousedown', this.dragStart.bind(this))
    document.addEventListener('mousemove', this.dragMove.bind(this))
    document.addEventListener('mouseup', this.dragEnd.bind(this))
  }

  public destroy(): void {
    this.element.removeEventListener('mousedown', this.dragStart.bind(this))
    document.removeEventListener('mousemove', this.dragMove.bind(this))
    document.removeEventListener('mouseup', this.dragEnd.bind(this))
  }

  private dragStart(ev: MouseEvent): void {
    this.isDragging = true

    this.currentPoint.moveTo(ev.offsetX, ev.offsetY)
    this.canvasPoint.moveTo(ev.offsetX, ev.offsetY)
    this.startPoint.moveTo(ev.pageX, ev.pageY)

    this.onDragStart(this.currentPoint)
  }

  private dragMove(ev: MouseEvent): void {
    if (!this.isDragging) {
      return
    }

    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)

    this.onDragMove(this.currentPoint)
  }

  private dragEnd(ev: MouseEvent): void {
    if (!this.isDragging) {
      return
    }
    this.isDragging = false

    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)

    this.onDragEnd(this.currentPoint)
  }

  private forceInElement(pointer: Pointer, { width: w, height: h }: HTMLCanvasElement): Pointer {
    const { x: px, y: py } = pointer.point
    let x = px
    let y = py
    if (x < 0) {
      x = 0
    }
    if (w < x) {
      x = w
    }
    if (y < 0) {
      y = 0
    }
    if (h < y) {
      y = h
    }

    return new Pointer(x, y)
  }
}
