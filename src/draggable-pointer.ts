import { Pointer } from './pointer'

interface Parameter {
  element: HTMLCanvasElement
  pointer?: Pointer
  onStartDrag?: DragEvent
  onDragging?: DragEvent
  onFinishDrag?: DragEvent
}

type DragEvent = (pointer: Pointer) => void

export class DraggablePointer {
  private readonly element: Parameter['element']
  private readonly onStartDrag: Parameter['onStartDrag']
  private readonly onDragging: Parameter['onDragging']
  private readonly onFinishDrag: Parameter['onFinishDrag']
  private currentPoint: Parameter['pointer']
  private canvasPoint = new Pointer()
  private startPoint = new Pointer()
  private isDragging = false

  constructor({
    element,
    pointer = new Pointer(),
    onStartDrag = () => {},
    onDragging = () => {},
    onFinishDrag = () => {}
  }: Parameter) {
    this.element = element
    this.onStartDrag = onStartDrag
    this.onDragging = onDragging
    this.onFinishDrag = onFinishDrag
    this.currentPoint = pointer

    this.initialize()
  }

  get point(): Pointer {
    return this.currentPoint
  }

  set point(pointer: Pointer) {
    this.currentPoint = pointer
  }

  private initialize() {
    this.element.addEventListener('mousedown', this.startDrag.bind(this))
    document.addEventListener('mousemove', this.drag.bind(this))
    document.addEventListener('mouseup', this.finishDrag.bind(this))
  }

  public destroy() {
    this.element.removeEventListener('mousedown', this.startDrag.bind(this))
    document.removeEventListener('mousemove', this.drag.bind(this))
    document.removeEventListener('mouseup', this.finishDrag.bind(this))
  }

  private startDrag(ev: MouseEvent) {
    this.isDragging = true

    this.currentPoint.moveTo(ev.offsetX, ev.offsetY)
    this.canvasPoint.moveTo(ev.offsetX, ev.offsetY)
    this.startPoint.moveTo(ev.pageX, ev.pageY)

    this.onStartDrag(this.currentPoint)
  }

  private drag(ev: MouseEvent) {
    if (!this.isDragging) {
      return
    }

    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)

    this.onDragging(this.currentPoint)
  }

  private finishDrag(ev: MouseEvent) {
    if (!this.isDragging) {
      return
    }
    this.isDragging = false

    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)

    this.onFinishDrag(this.currentPoint)
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
