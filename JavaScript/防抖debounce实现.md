# 防抖

> 防抖就是事件触发后等待指定时间后执行，但是当这段时间内再次触发事件则重新等待指定时间后执行。

## 防抖（包含事件和this处理）

```js
function debounce(fn,wait){
    var timer;
    return function(){
        var that = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(that,arguments);
        },wait);
    }
}
```

## 防抖立即执行

> 当事件触发后立即执行，但是指定时间内再次触发将不会执行。

```js
function immediateDebounce(fn,wait){
    var timer= null;
    return function(){
        if(timer===null){
            fn.apply(this,arguments);
        }else{
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            timer=null;
        },wait);
    }
}
```

## 取消防抖

```js
function immediateDebounce(fn,wait){
    var timer= null;
    function debouncedFn(){
        if(timer===null){
            fn.apply(this,arguments);
        }else{
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            timer=null;
        },wait);
    }
    debouncedFn.cancel=function(){
        clearTimeout(timer);
        timer=null;
    }
    return debouncedFn;
}
```

