# DOM事件

## 事件流

DOM事件流按照顺序分为捕获阶段，目标阶段，冒泡阶段。

DOM事件从目标元素触发，先从根元素进行捕获直到目标元素；再从目标元素进行事件冒泡，直到根元素。

```html
<div>
    <ul>
        <li>事件在这触发</li>
    </ul>
</div>
```

给这三个元素，每个都添加2个事件监听器，一个在捕获阶段触发，一个在冒泡阶段触发。如下：

```js
let ul = document.querySelector('ul');
let div = document.querySelector('div');
let li = document.querySelector('li');

ul.addEventListener('click', function (e) {
    console.log("ul event propagatiopn");
}, false)
ul.addEventListener('click', function (e) {
    console.log("ul event capture");
}, true)

div.addEventListener('click', function (e) {
    console.log("div event propagatiopn");
}, false)
div.addEventListener('click', function (e) {
    console.log("div event capture");
}, true)

li.addEventListener('click', function (e) {
    console.log("li event propagatiopn");
}, false)
li.addEventListener('click', function (e) {
    console.log("li event capture");
}, true)
```

点击`li`时可以根据打印，获得事件的触发顺序。结果是：先捕获再冒泡。

在事件监听函数中可以调用事件参数`e`的stopPropagation方法阻止事件冒泡。

## 事件代理

当多个子元素触发相同事件，那么就可以将事件监听器注册到他们共同的父元素上，当子元素触发事件由于事件冒泡可以在父元素上监听到事件，通过父元素的事件监听器的参数，又可以找到事件触发的元素。

下面代码给`ul`注册点击事件，当点击`li`时可以打印出`li`内的文本

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    let ul = document.querySelector('ul');
    ul.addEventListener('click', function (event) {
        let target = event.target;
        console.log(target.innerHTML);
    })
</script>
```

实现事件代理函数`eventProxy`，点击最后一个元素才执行`handler`函数

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    let ul = document.querySelector('ul');
let lastLi = document.querySelector('li:last-child');
function eventProxy(element,type,fn,child){
    element.addEventListener(type,function(e){
        let target = e.target;
        if(target===child){
            fn.call(target,e)
        }
    })
}
let handler = function(){
    console.log("最后一个li被点击了");
}
eventProxy(ul,'click',handler,lastLi);
```

