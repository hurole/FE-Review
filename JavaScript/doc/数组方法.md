# 数组方法

## 原型上的方法

### `Array.prototype.slice`

`slice(start,end)`方法的作用是从数组中截取片段，返回一个新数组，不改变原数组。该方法接受两个参数，`start`是起始位置，值为数组索，`end`是结束位置，值也为数组索引值，但返回数组不包括该索引对应的元素；只有一个参数，截取从当前索引到数组结尾；两个参数都省略，拷贝原数组返回，这里是浅拷贝。

```javascript
var a = [1,2,3,4];
var b = a.slice(1,2);
var c = a.slice(2);
console.log(a) // [1,2,3,4]
console.log(b) // [2]
console.log(c) // [3,4]
```

`slice`方法的参数可以为负数

```javascript
var a = [1,2,3,4];
var b = a.slice(-1);
var c = a.slice(-2,-1);
var d = a.slice(-2,-3);
console.log(a); // [1,2,3,4]
console.log(b); // [4]
console.log(c); // [3]
console.log(d); // []
```

## 构造函数上的方法