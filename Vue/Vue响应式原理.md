# Vue响应原理

## Object.defineProperty

`Object.defineProperty`是ES5的一个方法，用于定义对象的属性，第一个参数是对象，第二个参数是对象的属性名，第三个参数是属性描述符对象，属性描述符对象包括：

- value 属性值
- writable 可写入
- enumerable 可枚举
- configurable 可配置
- set 属性的setter
- get 属性的getter

当对象属性赋值时会触发setter方法，此时将视图同步更新即可。

```js
let data = {
    name: 'hurole',
    age: 11
}
function updateView(){
    console.log("更新视图");
}
function reactive(target,key,value){
    Object.defineProperty(target,key,{
        get:function(){
            return value;
        },
        set:function(v){
            value = v;
            updateView();
        }
    })
}
function observe(target){
    for(let key in target){
        reactive(target,key,target[key]);
    }
}
// 调用observe函数 实现数据监听
observe(data);
// 更改数据 更新视图
data.age = "12"; // 打印 更新视图
```

为了监听到数组的变化，Vue会重写那些可以改变原数组的七个方法，包括：push、pop、shift、unshift、reverse、splice、sort
