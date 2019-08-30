import { XYPad } from "./src/xypad"

const rikko = document.querySelector('.bcrikko') as HTMLElement
const output = document.querySelector('#output')
new XYPad({
  el: '#app',
  pointerColor: '#23CBF5',
  xRange: { min: -80, max: 80 },
  yRange: { min: -80, max: 80 },
  callback(p) {
    output.innerHTML = p.toString()

    const { x, y } = p.point
    rikko.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`
  }
})
