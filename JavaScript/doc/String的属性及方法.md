# 字符串上的方法

## 原型上的方法

### 1. substring

`String.prototype.substring(start[,end])`截取从起始索引到结束索引的字符串。

参数：

接受两个参数，start为起始索引，默认值0；end为结束索引，截取后的字符串不包含该索引上的字符，非必填，默认值字符串长度。

- 如果参数值小于0或者为NaN，取0；如果参数值大于字符串长度，取字符串长度。
- 如果start大于end，将两个参数调换位置。

返回值：截取后的字符串

```js
var str = "hurole112233";
// 第一个参数省略默认为0
console.log(str.substring()); // hurole112233
// 第二个参数省略 默认为字符串长度
console.log(str.substring(0)); // hurole112233
console.log(str.substring(0,str.length));// hurole112233
// 截取起始索引到结束索引之前的字符串，不包含结束索引上的字符
console.log(str.substring(2,6)); // role
// 参数小于0
console.log(str.substring(-5,2)); // hu
console.log(str.substring(-5,-1)); // ''
// 参数大于字符串长度
console.log(str.substring(5,99)); // e112233
// start>end
console.log(str.substring(99,0)); // hurole112233
console.log(str.substring(6,2)); // role
```

### 2. substr

`String.prototype.substr(start[,length])`从指定位置截取指定长度的字符串。参数：接收两个参数，start为起始位置的索引，可以为负值，默认值0；length为要截取字符串的长度，非必选，如果省略会截取到字符串最后。返回值：截取后的字符串

注意：`substr`方法不是JavaScript核心语言的一部分，尽量避免使用。可用`substring`方法代替。

```js
var str = "123pppiii456";
console.log(str.substr()); // 123pppiii456
console.log(str.substr(0)); // 123pppiii456
console.log(str.substr(1,5)); // 23ppp
console.log(str.substr(-5)); // ii456
```



