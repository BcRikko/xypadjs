import { XYPad } from "./src/xypad"

const output = document.querySelector('#output')

new XYPad({
  el: '#app',
  pointerColor: '#23CBF5',
  callback(p) {
    output.innerHTML = p.toString()
  }
})
