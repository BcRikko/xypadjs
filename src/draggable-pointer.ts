import { Pointer } from "./pointer"

interface Parameter {
  element: HTMLCanvasElement
  pointer?: Pointer
  onStartDrag?: DragEvent,
  onDragging?: DragEvent,
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
    onStartDrag = () => { },
    onDragging = () => { },
    onFinishDrag = () => { }
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

  private initialize() {
    this.element.addEventListener('mousedown', ev => {
      this.isDragging = true
      this.startDrag(ev)
      this.onStartDrag(this.currentPoint)
    })

    document.addEventListener('mousemove', ev => {
      if (!this.isDragging) { return }
      this.drag(ev)
      this.onDragging(this.currentPoint)
    })

    document.addEventListener('mouseup', ev => {
      if (!this.isDragging) { return }
      this.isDragging = false
      this.finishDrag(ev)
      this.onFinishDrag(this.currentPoint)
    })
  }

  private startDrag(ev: MouseEvent) {
    this.currentPoint.moveTo(ev.offsetX, ev.offsetY)
    this.canvasPoint.moveTo(ev.offsetX, ev.offsetY)
    this.startPoint.moveTo(ev.pageX, ev.pageY)
  }

  private drag(ev: MouseEvent) {
    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)
  }

  private finishDrag(ev: MouseEvent) {
    const pagePoint = new Pointer(ev.pageX, ev.pageY)
    this.currentPoint = this.forceInElement(pagePoint.sub(this.startPoint).add(this.canvasPoint), this.element)
  }

  private forceInElement(pointer: Pointer, { width: w, height: h }: HTMLCanvasElement): Pointer {
    const { x: px, y: py } = pointer.point
    let x = px
    let y = py
    if (x < 0) { x = 0 }
    if (w < x) { x = w }
    if (y < 0) { y = 0 }
    if (h < y) { y = h }

    return new Pointer(x, y)
  }
}
