import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './src/xypad.ts',
  output: {
    file: './dist/xypad.js',
    format: 'umd',
    name: 'XYPad'
  },
  plugins: [
    typescript({
      target: 'es5'
    }),
    uglify()
  ]
}
