# :control_knobs: XYPad.js

XYPad.js is XYPad controller component using Canvas API.

XYPad.jsはCanvasAPIを使った2次元パッドコントローラのコンポーネントです。

## :books: Examples

![rikko](https://user-images.githubusercontent.com/5305599/64018969-df020680-cb68-11e9-8289-e5660f282cb6.gif)


## :rocket: Getting started

```html
<div id="app"></div>
<p id="output"></p>
```

```js
new XYPad({
  // Specifies the selector of the parent element. XYPad creates a Canvas element within parent element.
  // 親要素のセレクターを指定します。XYPadは親要素の中にCanvas要素を作成します。
  el: '#app',

  // (Option)Specifies the color of the current position pointer. The default color is `black `.
  // (省略可能)現在位置を示すポインターの色を指定します。デフォルトは`black`です。
  pointerColor: '#23CBF5',
  
  // (Option)Specifies the size of the Canvas elements to display. The default is 300px x 300px.
  // (省略可能)表示するCanvas要素のサイズを指定します。デフォルトは300x300です。
  width: 300,
  height: 300,

  // (Option)Specifies the maximum and minimum values that XYPad can take in two dimensions. The default is `xRange: {min: -100, max: 100}` `yRange: {min: -100, max: 100}`.
  // (省略可能)XYPadが取りうる2次元上の最大値と最小値を指定します。デフォルトは`xRange: {min: -100, max: 100}` `yRange: {min: -100, max: 100}`です。
  xRange: { min: -100, max: 100 },
  yRange: { min: -100, max: 100 },

  // (Option)Callback for pointer drag event. The argument value is a Pointer class.
  // (省略可能)ポインターのドラッグイベントのコールバックです。引数はPointerクラスです。
  callback: (pointer) => {
    document.querySelector('#output').innerHTML = pointer.toString()

    // current point
    const { x, y } = p.point

    // { x: 50, y: 30 }
    console.log(p.toString())
  })

  // (Option)Callback to start dragging. The argument value is a Pointer class.
  // (省略可能)ドラッグを開始したときのコールバックです。引数はPointerクラスです。
  onDragStart: (pointer) => {
    console.log('drag start:', p.toString())
  }

  // (Option)Callback while dragging. The argument value is a Pointer class.
  // (省略可能)ドラッグ中のコールバックです。引数はPointerクラスです。
  onDragMove: (pointer) => {
    console.log('drag move:', p.toString())
  }

  // (Option)Callback when finished dragging. The argument value is a Pointer class.
  // (省略可能)ドラッグを終了したときのコールバックです。引数はPointerクラスです。
  onDragEnd: (pointer) => {
    console.log('drag end:', p.toString())
  }
})
```

## :book: API

### destroy

```ts
xyPad.destroy()
```
Removes XYPad drag events.

XYPadのドラッグイベントを削除します。

### getPointer

```ts
const p = xyPad.getPointer()
const { x, y } = p.point
```
Gets the value of the current pointer.

現在のポインターの値を取得します。

### movePointerTo

```ts
const newPoint = new Pointer(10, 20)
xyPad.movePointerTo(newPoint)

// or

xyPad.movePointerTo(10, 20)
```
Sets the value of the current pointer.

ポインターの値を設定します。


## :copyright: Copyright and license

Code and documentation copyright 2019 [B.C.Rikko](https://github.com/BcRikko). Code released under the MIT License. Docs released under Creative Commons.


