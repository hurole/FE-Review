# 实例事件相关

实例包括Vue实例和组件实例

## $emit

触发当前实例上的自定义事件，可以传递参数。

```js
vm.$emit('myEvent',{
    name:'emit',
    time:"2020-03-11",
    msg:"myEvent事件传递的参数"
})
```

## $on

监听当前实例上的自定义事件，接受两个参数，第一个参数为事件名，第二个参数为事件触发时的回调。回调函数可以接受到事件触发时传递的参数。

```js
vm.$on('myEvent',function(param){
    console.log("监听到了myEvent事件");
    console.log("传递来的参数：",param);
})
```

## $once

监听自定义事件，只触发一次，然后就监听器就被销毁

```js
vm.$once('myEvent',function(){
    console.log("多次触发myEvent事件，只能打印一次");
})
```

## $off

 移除自定义事件监听器 

```js
// 移除一个自定义事件监听器
vm.$off('myEvent',function(){
    console.log("移除一个事件监听器");
})
// 移除多个
vm.$off(['myEvent','myEvent1','myEvent2'],function(){
    console.log("移除多个事件监听器");
})
```
