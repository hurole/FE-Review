## ES2015(ES6)

### 1. let&const

- let 用于声明变量，不能重复声明，没有变量提升，块级作用域。
- const 用于声明常量，不能重复声明，不可重复赋值，声明时需要赋初值，块级作用域。
- 都存在暂时性死区，即块级作用域中声明了变量，但是不能在声明语句之前访问变量，会报错，代码款的声明语句之前为暂时性死区。

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
  let str = "Lisa";
  console.log(`你好${str}`); // 你好Lisa
  ```

### 4. 对象简写

- 如果对象属性简写

```javascript
const prop1 = l;
const obj = {
  prop1,
  prop2: 2,
};
```

- 对象方法简写
- 计算属性

### 5. 箭头函数

- 没有自己的 this，this 指向箭头函数声明时所在作用域的 this。
- 不能作为构造函数
- 不能使用 arguments
- 简写：有且只有一个参数时可以省略小括号；只含有一条语句可以省略花括号，箭头后的表达式会作为函数返回值。

### 6. rest 参数

剩余参数，用三点运算符处理(必须放在参数列表最后）

```js
function fn(a, ...rest) {
  console.log(rest);
}
fn(1, 2, 3, 4, 5, 6); // [2,3,4,5,6]
```

### 7. 扩展运算符

三点运算符，可以扩展数组，类数组等

```js
let a = [1, 2, 3];
let b = [...a, 4, 5];
console.log(b); // [1,2,3,4,5]
```

可以将伪数组转换成数组

```js
function foo() {
  let args = [...arguments];
  console.log(args);
}
foo("a", "b"); // ["a","b"]
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

ES6 新增的数据结构 Set（集合），他类似于数组，但是内部值唯一，集合实现了 iterator 接口，可以使用 for..of 遍历和扩展运算符。

方法和属性：

size 属性返回内部元素个数

add 方法增加一个元素，返回当前集合

clear 方法清空集合，返回 undefined

delete 方法删除元素，返回 boolean 值

has 方法检测是否包含指定元素，返回 boolean 值

values 方法返回迭代器

keys 方法返回迭代器

```js
// 创建Set
let set = new Set(["a", 1, {}]);
```

### 15. Map

Map 时 ES6 新增的数据结构，用于存储键值对，类似于对象，但是 Map 的键可以是任何类型，Map 内部实现了 iterator 接口，可以 for...of 遍历，可以使用扩展运算符。添加元素时键相同后面会覆盖前面，例如：NaN，+0 和-0

方法和属性：

size 属性返回键值对的个数；

set 方法添加键值对，

get 方法传入键返回值

delete 方法删除指定的键值对，传入键，返回 boolean

clear 方法清空内部所有键值对

has 方法判断是否包键对应的值，返回 boolean

entries 方法按照插入顺序返回可迭代对象，可迭代对象的元素为 [key,value]

keys 方法按照插入顺序返回 key 组成的可迭代对象

values 方法按照插入顺序返回 value 组成的可迭代对象

### 16. Symbol

> Symbol 是 ES6 新增的基础数据类型，用于表示唯一的值，类似于字符串。

创建 Symbol 可以使用以下两种方式

```js
let a = Symbol("a");
let b = Symbol.for("b");
```

Symbol 可用于表示唯一的值

```js
let a = Symbol("a");
let b = Symbol("a");
console.log(a === b); //false
```

Symbol 不能和其他数据运算

```js
let a = Symbol("a");
let b = Symbol("a");
// 全都报错
console.log(a + 1);
console.log(a + "a");
console.log(a + b);
```

Symbol 常用于对象的属性名，不能使用 for...in 遍历，使用`Reflect.ownKeys`获取 key 的数组再进行遍历

```js
let key = {
  name: Symbol("name"),
  age: Symbol("age"),
};
let info = {
  [key.name]: "hurole",
  [key.age]: 18,
};
console.log(info[key.name], info[key.age]);
let s = Reflect.ownKeys(info);
let d = Object.keys(info);
console.log(s, d);
```

Symbol 的内置值

例如`Symbol.iterator`可迭代对象调用 for..of 时会调用对象的`[Symbol.iterator]`方法。

### 17. for...of

### 18. 迭代器

### 19. 生成器

### 20. ES Module

## ES2016

### 1. Array.prototype.includes(value[,fromIndex])

用于判断数组中是否包含某个值，第一个参数是目标元素，第二个元素可选为数组中从 fromIndex 开始查找目标元素，可以为负值。相较于 indeOf 方法 includes 可以判断 NaN

```js
let list = [1, "s", false, NaN, []];
// 原来使用indexOf
console.log(list.indexOf(1) > -1); // true
console.log(list.indexOf("s") > -1); // true
console.log(list.indexOf(NaN) > -1); // false
// 现在使用includes
console.log(list.includes(1)); // true
console.log(list.includes("s")); //
console.log(list.includes(NaN)); // true
// 从数组索引为1的位置向后开始查找目标元素1判断是否在数组中
console.log(list.includes(1, 1)); // false
// 从数组索引为array.lenth+(-4)的位置向后开始查找目标元素1判断是否在数组中
console.log(list.includes(1, -4)); // false
```

### 2. Exponentiation Operator 求幂运算符

```javascript
// Math.pow方法进行指数运算
Math.pow(2,2); // 4
// 新增算数运算符 ** 进行指数运算
let result= 2**2； // 4
```

## ES2017

### 1. Object.values(object)

用于获取指定对象的 value 数组

```javascript
let obj = { a: 1, b: 2, c: 3 };
Object.values(obj); // [1,2,3]
```

### 2. Object.entries(object)

用于获取指定对象的[key,value]组成的二维数组

```javascript
let obj = { a: 1, b: 2, c: 3 };
Object.entries(obj); // [['a',1],['b',2],['c',3]]
```

### 3. Object.getOwnPropertyDescriptors(object)

用于获取指定对象的所有自身属性描述符(可能为数据属性描述符和读取属性描述符)

```javascript
let obj = {
  a: 1,
  b: 2,
  get c() {
    return 3;
  },
};
Object.getOwnPropertyDescriptors(obj);
/* 
{
  a:{value:1,configurable:true,writable:true,enumerable:true},
  b:{value:2,configurable:true,writable:true,enumerable:true},
  c:{set:undefined,get:f,configurable:true,enumerable:true}
}
*/
```

### 4. String.prototype.padStart(length[,char])

从字符串的左侧填充字符 char，达到长度 length，第二个参数不填写，默认填空白符达到指定长度，返回填充后的字符串

```javascript
let str = "11";
str.padStart(4, "0"); // '0011'
str.padStart(4); // '  11'
```

### 5. String.prototype.padEnd(length[,char])

向字符串的右侧填充字符 char，达到长度 length，第二个参数不填写，默认填空白符达到指定长度，返回填充后的字符串

```javascript
let str = "11";
str.padEnd(4, "0"); // '1100'
str.padEnd(4); // '11  '
```

### 6. 在函数的参数列表添加尾逗号

```js
function foo(a, b, c) {
  return a + b + c;
}
foo(1, 2, 3); // 不报错
```

### 7. Async/Await 异步函数

使用同步写法执行异步函数，异步函数与普通函数的声明和执行类似，声明前面添加 async 关键字，调用都是通过函数名+括弧来调用。async 函数返回一个 promise，await 必须在 async 函数中。

```js
async function foo() {
  let s = await 1;
  console.log(s);
  return 1;
}
foo(); // Promise<1>
```

async 函数返回一个 promise，如果 return 一个值等同于

```js
async function foo() {
  return 1;
}
// ==
async function foo1() {
  return Promise.resolve(1);
}
```

## ES2018

### 1. 对象 Spread/Rest`...`

### 2. Promise.finally

## ES2020

### 1.可选链式操作符

`?.`可选链式操作符，用于解决读取对象属性时对象属性不存在而导致的报错。举个例子：

```js
let obj = {
  a: {
    b: {
      c: 2,
    },
  },
};
let s1 = obj.a.b.c; //2
let s2 = obj.a.c.b; //Uncaught TypeError: Cannot read properties of undefined (reading 'b')
let s3 = obj?.a?.c?.b; //undefined
```

上面 s1 是读取属性，并且属性都存在的情况。

s2 是读取了一个不存在的属性 c，所以 c 为 undefined，然后又读取 c 上面的 b 属性，所以报类型错，提示我们不能读取`undefined`的属性，常见的场景就是接口返回数据，但是数据中不存在某个字段，但是前端读取了，导致报错应用崩溃。使用可选链式操作符就可以避免报错应用崩溃。

s3 读取 obj 上的 a 属性，a 属性存在，继续读取 a 上的 c 属性，c 属性不存在直接返回 undefined，不会进而读取 c 上的 b 属性避免了报错。

2.动态 import 语法

## ES2021

### 1. 逻辑赋值操作符

| 操作符 | 作用                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| \|\|=  | 将操作符前后变量进行逻辑或运算，结果赋值给操作符前变量                                                      |
| &&=    | 将操作符前后变量进行逻辑与运算，结果赋值给操作符前变量                                                      |
| ??=    | 对操作符前变量进行判断，如果为 undefined 或者 null 就将操作符后的变量赋值给操作符前的变量，否则不执行赋值。 |

```js
let a = 0;
b = 1;
let a1 = true;
b1 = "哈哈";
let a2 = 0;
b2 = "";
// ||=
console.log((a ||= b)); //1
console.log((a1 ||= b1)); //true
console.log((a2 ||= b2)); //0
```

```js
let a = 0;
b = 1;
let a1 = true;
b1 = "哈哈";
let a2 = 0;
b2 = "";
// &&=
console.log((a &&= b)); //0
console.log((a1 &&= b1)); //哈哈
console.log((a2 &&= b2)); //0
```

```js
let a = 0;
b = 1;
let a1 = undefined;
b1 = "哈哈";
let a2 = null;
b2 = "1";
// ??=
console.log((a ??= b)); //0
console.log((a1 ??= b1)); //哈哈
console.log((a2 ??= b2)); //1
```

### 2.数字分隔符

Number 类型支持带有分隔符的字面量。

**十进制**：

```js
let x = 1_024_221;
let y = 1024221;
console.log(x === y); // true
```

**二进制**

```js
let x = 0b11_0100_1010;
let y = 0b1101001010;
console.log(x === y); // true
```

十六进制

```js
let x = 0xff_10_a4;
let y = 0xff10a4;
console.log(x === y); // true
```
