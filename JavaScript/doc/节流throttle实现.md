# 防抖实现

防抖：频繁触发的事件，指定时间内只执行一次。

## 利用时间戳实现

> 思路：当时间触发时，将当前时间戳减去上一次成功执行函数的时间戳，如果大于设定的时间区间，则执行函数并替换掉上一次函数执行时的时间戳，否则不执行。

```js
function throttle(fn, wait) {
    var time = 0;
    return function () {
        var current = +new Date();
        if (current - time > wait) {
            fn.apply(this, arguments);
            time = current;
        }
    }
}
```

## 利用定时器

> 思路：事件触发时，只有当timer为null，才能执行函数并将计时器保存到变量timer中，指定时间后重新将timer赋值为空；timer不为null时，说明定时器未执行完。

```js
 function throttle(fn, wait) {
     var timer = null;
     return function () {
         if (timer === null) {
             fn.apply(this, arguments);
             timer = setTimeout(function () {
                 timer = null;
             }, wait)
         }
     }
 }
```

## 延迟执行

上面两个例子都是指定时间内多次触发事件后先执行一次函数，下面为执行时间内多次触发事件，后执行一函数。

```js
function throttle(fn, wait) {
    var timer = null;
    return function () {
        var that = this;
        var args = arguments;
        if (timer === null) {
            timer = setTimeout(function () {
                fn.apply(that, args);
                timer = null;
            }, wait)
        }
    }
}
```

