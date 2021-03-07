# call实现

>`Function.prototype.call`是函数原型上的方法，它是ES3的标准。call方法会直接调用前面的函数，第一个参数是this，剩下参数是作为原函数的参数传入。如果第一个参数为undefined或null，那么this默认为全局对象，浏览器中为window。

## ES3实现

```js
Function.prototype.myCall = function (context) {
    if (context === undefined || context === null) {
        context = window;
    }
    
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    context.fn = this;
    // args 为数组字符串拼接会自动转换掉用toString()
    var res = eval("context.fn(" + args + ")");
    delete context.fn;
    return res;
}
```

## ES6实现

```js
Function.prototype.myCall = function (context, ...args) {
    if (context === undefined || context === null) {
        context = window;
    }
    context.fn = this;
    var res = context.fn(...args);
    delete context.fn;
    return res;
}
```

