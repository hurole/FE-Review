# Proxy实现响应式

## Proxy介绍

Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

Proxy是一个构造函数，通过new关键字为指定对象创建代理；`new Proxy(taget,handler)`它可以接收两个参数，第一个参数target是被代理的对象，第二个参数是捕获器（trap）对象。

> 捕获器就是用于捕获代理对象的行为。例如set，get等行为，当设置set和get捕获器时，对代理对象进行属性获取和设置时就会触发捕获器方法，代码如下：

```js
var obj = {
    name: "Jack",
    hobbies: [
        "唱",
        "跳",
        "rap"
    ]
}
// 创建obj对象的代理
var proxyObj = new Proxy(obj, {
    // 定义get捕获器
    get: function (target, key, receiver) {
        console.log(`获取代理对象的${key}属性`);
        return target[key]
    },
    // 定义set捕获器
    set: function (target, key, value, receiver) {
        console.log(`设置代理对象的${key}属性`);
        obj[key] = value;
        return true;
    }
})
// 获取属性name，此时会触发get捕获器
proxyObj.name;
// 设置代理对象的name属性，此时触发set捕获器
proxyObj.name = "Nick";
```

**注意**：如果没有定义某个捕捉器，那么就会保留源对象的默认行为 。例如下面代码中未定义set捕获器，但是仍然可以执行属性设置操作：

```js
var obj = {
    name: "Jack",
    hobbies: [
        "唱",
        "跳",
        "rap"
    ]
}
// 创建obj对象的代理
var proxyObj = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log(`获取代理对象的${key}属性`);
        return target[key]
    }
})
// 获取属性name，此时会触发get捕获器
proxyObj.name;
// 设置代理对象的name属性，此时触发set捕获器
proxyObj.name = "Nick";
```

捕获器及其作用如下：

| 捕获器                                               | 作用                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `handler.get(target, property, receiver)`            | 用于拦截对象读取属性操作                                     |
| `handler.set(target, property, value, receiver)`     | 用于拦截对象属性设置操作                                     |
| `handler.deleteProperty(target, property)`           | 用于拦截对象属性的delete操作                                 |
| `handler.constructor(target, args)`                  | 拦截new操作符（代理的原对象必须有[[constructor]]内部方法），即原对象是可以适应new关键字的 |
| `handler.apply(target,thisArg,argumentsList)`        | 用于拦截函数的调用，代理的原对象为函数                       |
| `handler.has(target,key)`                            | 用于拦截in操作符行为                                         |
| `handler.ownKeys(target)`                            | 方法用于拦截 [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) |
| `handler.getPrototypeOf(target)`                     | 当读取代理对象的原型时，该方法就会被调用                     |
| `handler.setPrototypeOf(target,prototype)`           | 拦截对代理对象使用`Object.setPrototypeOf()`方法              |
| `handler.isExtensible(target)`                       | 拦截对代理对象使用的`Object.isExtensible()`方法              |
| `handler.preventExtensions(target)`                  | 拦截对代理对象的`Object.preventExtensions()`方法             |
| `handler.defineProperty(target,property,descriptor)` | 拦截对代理对象的`Object.defineProperty()`方法                |
| `handler.getOwnPropertyDescriptor(target,property)`  | 拦截对代理对象的`Object.getOwnPropertyDescriptor()`方法      |

## Reflect介绍

 Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与代理的捕获器方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。 

举个例子使用Reflect的get、set方法获取属性和设置属性：

```js
// set方法为对象添加一个属性，或者修改已存在的属性
var obj = {
    name: 'hurole'
}
var result = Reflect.set(obj,'ff',111); 
console.log(result); // set方法返回值为true，代表操作成功
console.log(obj); // {name:"hurole",ff:111}

// get方法获取对象的属性
var res = Reflect.get(obj,'name');
console.log(res); // hurole 
```

