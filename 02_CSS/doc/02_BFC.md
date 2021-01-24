# `BFC`

> `BFC`（Block Formatting Context）块级格式化上下文。
>
> `BFC`是`css2.1`的规范中的概念，它是页面中一块独立的渲染区域，有自己的一套渲染规则，它决定了其子元素如何定位，和其他元素的关系及相互作用。
>
> 翻译成人话就是：`BFC`是一个独立的区域，它有自己的渲染规则，包括两部分：它的子元素渲染规则，和它和同级元素的渲染规则，也就是`BFC`和`BFC`之间相互作用会产生什么效果，`BFC`和非`BFC`之间相互作用会产生什么效果。
>
> 既然`BFC`是一块独立区域，那么他内部的所用行为都不会影响到外部。

## 触发`BFC`的条件

- `body`根元素本身就是一个`BFC`

- 浮动元素：`float`的值除了`none`以外

  > 浮动元素，本身就是一个独立的区域。

- 定位元素：`position`值为`absolute`和`fixed`。

  > relative相对定位，是相对于自身原来的位置进行定位，他原来的位置并不会被其他元素所占据，也就是它本身行为已经影响到了外部。所以不是`BFC`。

- `display`值为`inline-block`,`table-cell`和`flex`。

- `overflow`除了值为`visiable`，也就是默认值。

  > 设置overflow本意就是将内部元素限制在当前区域。

## `BFC`内部特性

### 同一个`BFC`下的外边距会发生重叠。

html：

```html
<body>
    <div class="div">1</div>
	<div class="div">2</div>
</body>
```

css:

```css
.div{
    width: 100px;
    height: 100px;
    margin: 100px;
}
.div:nth-child(1){
    background-color: cadetblue;
}
.div:nth-child(2){
    background-color: sandybrown;
}
```

`body`本身就是`BFC`，可以看到body下面盒子1的下边距和盒子2的上边距发生了重叠。

解决：

盒子1和盒子2变成`BFC`。例如

html:

```html
<div class="con">
    <div class="div1">1</div>
</div>
<div class="con">
    <div class="div2">2</div>
</div>
```

css:

```css
.div1,.div2 {
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

### `BFC`内部可以包含浮动元素

```html
<body>
    <div class="div1">
        <div class="div2">
            2
        </div>
    </div>
</body>
```

css:

```css
.div1{
    background-color: cadetblue;
    border: 2px solid #000;
    over
}
.div2{
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
.div1{
    background-color: cadetblue;
    border: 2px solid #000;
    overflow: hidden;
}
```

###  `BFC` 可以阻止元素被浮动元素覆盖 

html:

```html
<div class="div2">
    浮动元素里面的文字
</div>
<div class="div1">
    爱上咖啡和拉萨解放路卡垃圾啊涉及立法卡开哈萨克交流电哈可接受的看见爱上打开哈萨克就复活卡双离合案件话费卡积分好可怜
</div>
```

css:

```css
.div1{
    width: 400px;
    height: 200px;
    background-color: cadetblue;
}
.div2{
    float: left;
    width: 100px;
    height: 100px;
    background-color: sandybrown;
}
```

div1和div2是并列的两个元素，但是div2脱离文档流，并且覆盖了在了div1上面。

解决办法将div1设置成BFC