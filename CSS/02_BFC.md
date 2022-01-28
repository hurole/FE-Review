# `BFC`

> `BFC`（Block Formatting Context）块级格式化上下文。
>
> `BFC`是`css2.1`的规范中的概念，它是页面中一块独立的渲染区域，有自己的一套渲染规则。
>
> 既然`BFC`是一块独立区域，那么他内部的所用行为都不会影响到外部。
>
> A block formatting context contains everything inside of the element creating it that is not also inside a descendant element that creates a new block formatting context.
>
> BFC 包含它下面的所有元素，但不包括创建了 BFC 的后代元素。

## 触发`BFC`的条件

- `html`根元素本身就是一个`BFC`

- 浮动元素：`float`的值除了`none`以外

  > 浮动元素，本身就是一个独立的区域。

- 定位元素：`position`值为`absolute`和`fixed`。

  > relative 相对定位，是相对于自身原来的位置进行定位，他原来的位置并不会被其他元素所占据，也就是它本身行为已经影响到了外部。所以不是`BFC`。

- `display`值为`inline-block`,`table-cell`和`flex`,`grid`,`table-caption`。

- `overflow`的值不为`visible`。（_排除 overflow 属性扩散到 viewport 上的情况_）。

  > overflow 属性的规范中提到：
  >
  > - 设置在根元素 html 的 overflow 属性会作用于 viewport 上。
  > - 而作用于 viewport 上的`overflow：visible`会被转换成`auto;`
  > - 当 html 为 visible 时，body 元素设置 overflow 属性时，overflow 会扩散给 viewport 上。
  >
  > 当想通过设置`overflow`属性使 body 成为 BFC 时，会失效，因为 html 的 overflow 属性默认为 visible，也就是满足了 overflow 属性扩散到视窗上的这个情况，所以 BFC 并不会设置成功。
  >
  > 所以可以通过其他方式让 body 成为 BFC。

## `BFC`的作用

### 解决相邻元素的垂直外边距重叠问题。

html：

```html
<body>
  <div class="div">1</div>
  <div class="div">2</div>
</body>
```

css:

```css
.div {
  width: 100px;
  height: 100px;
  margin: 100px;
}
.div:nth-child(1) {
  background-color: cadetblue;
}
.div:nth-child(2) {
  background-color: sandybrown;
}
```

可以看到盒子 1 的下外边距和盒子 2 的上外边距发生了重叠。

解决：

盒子 1 和盒子 2 放在不同的`BFC`中。例如给 div1、div2 都放在 con 中(con 设置 overflow:hidden 形成 BFC)

html:

```html
<div class="con">
  <div class="div1">1</div>
</div>
<div class="con">
  <div class="div2">2</div>
</div>
```

或者只给其中一个盒子放在 BFC 中，总之别放到同一个 BFC 中

```html
<div class="div1">1</div>
<div class="con">
  <div class="div2">2</div>
</div>
```

css:

```css
.div1,
.div2 {
  width: 100px;
  height: 100px;
  margin: 100px;
}

.div1 {
  background-color: cadetblue;
}

.div2 {
  background-color: sandybrown;
}
/* 解决外边距重叠 */
.con {
  overflow: hidden;
}
```

### 解决嵌套元素（父元素于后代元素）的垂直外边距重叠问题。

**产生原因**：父元素 margin-top 和子元素 margin-top 之间没有分隔；即没有 border、padding 或 content。没有给父元素设置 BFC。

html：

```html
<div class="div3">
  <div class="div4">4</div>
</div>
```

css：

```css
.div3 {
  background-color: rgb(109, 41, 41);
  margin-top: 100px;
  height: 200px;
}
.div4 {
  background-color: rgb(48, 6, 102);
  height: 100px;
  width: 100px;
  margin-top: 50px;
}
```

可以看到 div3 由 margin-top: 100px;div4 有 margin-top:50px，结果发生重叠。

解决：通过设置父元素为 BFC，父元素 margin-top 和子元素 margin-top 之间添加分隔。

css：

```css
.div3 {
  background-color: rgb(109, 41, 41);
  margin-top: 100px;
  height: 200px;
  /* 设置bfc */
  overflow: hidden;
  /* 添加分隔 */
  /* border: 1px solid; */
  /* padding-top: 20px; */
}
.div4 {
  background-color: rgb(48, 6, 102);
  height: 100px;
  width: 100px;
  margin-top: 50px;
}
```

### `BFC`高度计算是要算上浮动元素的(不会引起高度塌陷)

正常情况下，普通父盒子中存在脱离文档流的子元素会引起父盒子高度的塌陷，BFC 不存在

```html
<body>
  <div class="div1">
    <div class="div2">2</div>
  </div>
</body>
```

css:

```css
.div1 {
  background-color: cadetblue;
  border: 2px solid #000;
  overflow: hidden;
}
.div2 {
  float: left;
  /* position: fixed; */
  /* position: absolute; */
  width: 100px;
  height: 100px;
  background-color: sandybrown;
}
```

给`div2`设置浮动，或者定位为`fixed`和`absolute`，会导致`div1`高度塌陷。

解决：将`div1`也设置成`BFC`

css:

```css
.div1 {
  background-color: cadetblue;
  border: 2px solid #000;
  overflow: hidden;
}
```

### ~~BFC 可以阻止元素被浮动元素覆盖~~❎

上面这句话不知道是怎么翻译出来的，原本含义：

`BFC` 内部元素的左 margin 始终与其父容器的左边界相接触，即使由浮动元素出现也是如此，除非重新设置创建 BFC 元素。

解释一下上面这句话：

html:

```html
<body>
  <div class="div2">浮动元素里面的文字</div>
  <div class="div1">
    爱上咖啡和拉萨解放路卡垃圾啊涉及立法卡开哈萨克交流电哈可接受的看见爱上打开哈萨克就复活卡双离合案件话费卡积分好可怜
  </div>
</body>
```

css:

```css
.div1 {
  height: 200px;
  background-color: cadetblue;
}
.div2 {
  float: left;
  width: 100px;
  height: 100px;
  background-color: sandybrown;
}
```

首先 html 即为 BFC，div1 和 div2 都是 BFC 里面的元素， div2 浮动元素，但是 div1 的左侧始终与 body 的左侧向接触。如果想要 div1 与 body 的左侧不接触，那么只能通过设置 div1 位 BFC 解决。

css

```css
.div1 {
  height: 200px;
  background-color: cadetblue;
  /*设置BFC 让div1与容器左侧不接触*/
  /*overflow:hidden;*/
  /*float: right;*/
  position: absolute;
  left: 20px;
}
.div2 {
  float: left;
  width: 100px;
  height: 100px;
  background-color: sandybrown;
}
```

上面通过设置 float 属性，overflow 属性和 position 属性都可以使 div1 为 BFC，即实现不与容器左边接触。
