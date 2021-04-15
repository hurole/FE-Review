# apply实现

> apply和call类似，只是传递参数的方式不同，apply以数组的形式传参。

## ES3实现

```js
Function.prototype.myApply = function (context, arr) {
    if (context === undefined || context === null) {
        context = window;
    }
    var args = [];
    for (var i = 0; i < arr.length; i++) {
        args.push("arr[" + i + "]");
    }
    context.fn = this;
    var res = eval("context.fn(" + args + ")");
    delete context.fn;
    return res;
}
```

## ES6实现

```JS
Function.prototype.myApply = function (context, arr) {
    if (context === undefined || context === null) {
        context = window;
    }
    context.fn = this;
    var res = context.fn(...arr);
    delete context.fn;
    return res;
}
```



