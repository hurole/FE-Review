## ES2015

### 1. let&const

- let用于声明变量，不能重复声明，没有变量提升，块级作用域。
- const用于声明常量，不能重复声明，不可重复赋值，声明时需要赋初值，块级作用域。

### 2. 解构赋值

- 数组解构赋值
- 对象结构赋值

### 3. 模板字符串

- 用反引号表示，可以换行，例如：

  ```js
  let str = `hello world`;
  ```

- 标签`${}`

  ```js
  let str = 'Lisa';
  console.log(`你好${str}`); // 你好Lisa
  ```

### 4. 对象简写

- 如果对象属性简写
- 对象方法简写
- 计算属性

### 5. 箭头函数

- 没有自己的this，this指向箭头函数声明时所在作用域的this。
- 不能作为构造函数
- 不能使用arguments
- 简写：有且只有一个参数时可以省略小括号；只含有一条语句可以省略花括号，箭头后的表达式会作为函数返回值。

### 6. rest参数

剩余参数，用三点运算符处理(必须放在参数列表最后）

```js
function fn(a,...rest){
    console.log(rest)
}
fn(1,2,3,4,5,6); // [2,3,4,5,6]
```

### 7. 扩展运算符

三点运算符，可以扩展数组，类数组等

```js
let a = [1,2,3];
let b = [...a,4,5];
console.log(b); // [1,2,3,4,5]
```

可以将伪数组转换成数组

```js
function foo(){
	let args = [...arguments];
    console.log(args);
}
foo('a','b'); // ["a","b"]
```

### 8. 字符串扩展

- `String.prototype.startsWith`判断字符串是否以某个字符串开头。
- `String.prototype.endsWith`判断字符串是否以某个字符串结尾。
- `String.prototype.includes`判断字符串中是否包含某字符串。

### 9.对象扩展

- `Object.assign`返回对象，接收若干参数，第一个参数为结果对象，剩余参数也为对象，剩余参数最终要与第一个参数合并，属性名相同会覆盖。

- `Object.is`判断两个值是否为同一个值。

  > 可判断`NaN`，即`Object.is(NaN,NaN)`结果返回`true`。
  >
  > 可判断`+0`和`-0`,即`Object.is(+0,-0)`结果返回`false`。

### 10. Reflect

## 11. Proxy

### 12. Promise

### 13. class

### 14. Set

ES6新增的数据结构Set（集合），他类似于数组，但是内部值唯一，集合实现了iterator接口，可以使用for..of遍历和扩展运算符。

方法和属性：

size 返回内部元素个数

add 增加一个元素，返回当前集合

clear 清空集合，返回undefined

delete 删除元素，返回boolean值

has 检测是否包含指定元素，返回boolean值

```js
// 创建Set
let set = new Set(['a',1,{}]);
```

### 15. Map

### 16. Symbol

> Symbol是ES6新增的基础数据类型，用于表示唯一的值，类似于字符串。

创建Symbol可以使用以下两种方式

```js
let a = Symbol('a');
let b = Symbol.for('b');
```

Symbol可用于表示唯一的值

```js
let a = Symbol('a');
let b = Symbol('a');
console.log(a === b); //false
```

Symbol不能和其他数据运算

```js
let a = Symbol('a');
let b = Symbol('a');
// 全都报错
console.log(a+1);
console.log(a+'a');
console.log(a+b);
```

Symbol常用于对象的属性名，不能使用for...in遍历，使用`Reflect.ownKeys`获取key的数组再进行遍历

```js
let key={
    name:Symbol('name'),
    age:Symbol('age')
}
let info = {
    [key.name]:'hurole',
    [key.age]:18
}
console.log(info[key.name],info[key.age]);
let s = Reflect.ownKeys(info);
let d = Object.keys(info);
console.log(s,d);
```

Symbol的内置值

例如`Symbol.iterator`可迭代对象调用for..of时会调用对象的`[Symbol.iterator]`方法。

### 17. for...of

### 18. 迭代器

### 19. 生成器

### 20. ES Module

## ES2016

## ES2017

### Object.getOwnPropertyDescriptors

### String.prototype.padStart

### String.prototype.padEnd

### 在函数的参数列表添加尾逗号

### Async/Await