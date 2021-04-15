# new 关键字实现

## new的特性

- 首先他返回一个实例对象
- 返回对象的`__proto__`指向构造函数的`prototype`
- 构造函数可以接收参数且会被执行，this指向实例对象
- 如果构造函数中有返回值且为对象，那么返回值为该对象

## 实现

> `new`是关键字，无法创建，所以使用函数模拟。

返回一个新对象

```javascript
function objFactory(){
    var newObj = new Object();
    return newObj;
}
```

返回对象的`__proto__`指向构造函数的`prototype`

```javascript
function objFactory(){
    // 第一个参数为构造函数
    var myconstructor = Array.prototype.shift.call(arguments);
    var newObj = new Object();
    newObj.__proto__ = myconstructor.prototype;
    return newObj;
}
```

构造函数接收参数，构造函数会被执行，this指向新对象。

```javascript
function objFactory(){
    // 第一个参数为构造函数
    var myconstructor = Array.prototype.shift.call(arguments);
    var newObj = new Object();
    myconstructor.apply(newObj,arguments);
    newObj.__proto__ = myconstructor.prototype;
    return newObj;
}
```

如果构造函数有返回值且为对象，返回该对象。

```javascript
function objFactory(){
    // 第一个参数为构造函数,后续参数传入构造函数
    var myconstructor = Array.prototype.shift.call(arguments);
    var newObj = new Object();
    var res = myconstructor.apply(newObj,arguments);
    newObj.__proto__ = myconstructor.prototype;
    // res为构造函数返回值，如果typeof 为object 并且不为null 返回res，否则返回newObj
    return typeof res === 'object'? res||newObj:newObj;
}
```

