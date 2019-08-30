# :control_knobs: XYPad.js

:warning: under development - 開発途中 :warnig:

XYPad.js is XYPad controller component using Canvas API.

XYPad.jsはCanvasAPIを使った2次元パッドコントローラのコンポーネントです。

![xypad](https://user-images.githubusercontent.com/5305599/63904838-49be1f80-ca4d-11e9-99f1-e7a147132d1a.gif)


## :rocket: Getting started

```html
<div id="#app"></div>
<p id="output"></p>
```

```js
new XYPad({
  el: '#app',
  pointerColor: '#23CBF5',
  width: 300,
  height: 300,
  xRange: { min: -100, max: 100 },
  yRange: { min: -100, max: 100 },
  callback: (pointer) => {
    document.querySelector('#output').innerHtml = pointer.toString()
  })
})
```


## :books: Parameters

### el

Specifies the selector of the parent element. XYPad creates a Canvas element within parent element.

親要素のセレクターを指定します。XYPadは親要素の中にCanvas要素を作成します。

### pointerColor (option)

Specifies the color of the current position pointer. The default color is `black `.

現在位置を示すポインターの色を指定します。デフォルトは`black`です。

### width, height (option)

Specifies the size of the Canvas elements to display. The default is 300px x 300px.

表示するCanvas要素のサイズを指定します。デフォルトは300x300です。

### xRange, yRange (option)

Specifies the maximum and minimum values that XYPad can take in two dimensions. The default is `xRange: {min: -100, max: 100}` `yRange: {min: -100, max: 100}`.

XYPadが取りうる2次元上の最大値と最小値を指定します。デフォルトは`xRange: {min: -100, max: 100}` `yRange: {min: -100, max: 100}`です。

### callback (option)

Callback for pointer drag event. The argument value is a Pointer class.

ポインターのドラッグイベントのコールバックです。引数はPointerクラスです。

```ts
callback (p: Pointer) {
  // current point
  const { x, y } = p.point

  // { x: 50, y: 30 }
  console.log(p.toString())
}
```

## :book: API

### destroy (under development)

Removes XYPad drag events.

XYPadのドラッグイベントを削除します。

### getPoint (under development)

Gets the value of the current pointer.

現在のポインターの値を取得します。



## :copyright: Copyright and license

Code and documentation copyright 2019 [B.C.Rikko](https://github.com/BcRikko). Code released under the MIT License. Docs released under Creative Commons.


