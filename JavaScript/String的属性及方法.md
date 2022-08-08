# 字符串上的方法

## 原型上的方法

### 1. slice

`String.prototype.slice(start[,end])`截取从索引start开始到end（不包含）结束的字符串

参数：

可以接收两个参数start，end ，第二个参数非必选，参数可以为负数，例如-1代表倒数第一个，-2代表倒数第二个，以此类推。

```js
var str = "hurole112233";
// 第一个参数省略默认为0
console.log(str.slice()); // hurole112233
// 第二个参数省略 默认为字符串长度
console.log(str.slice(0)); // hurole112233
console.log(str.slice(0,str.length));// hurole112233
// 截取起始索引到结束索引之前的字符串，不包含结束索引上的字符
console.log(str.slice(2,6)); // role
// 参数小于0
console.log(str.slice(-11,3)); // 'ur'
console.log(str.slice(-5,-1)); // '1223'
// 参数大于字符串长度
console.log(str.slice(5,99)); // 'e112233'
// start>end 返回空字符
console.log(str.slice(99,0)); // ''
console.log(str.slice(6,2)); // ''
```

### 2. substring

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

### 3. substr

`String.prototype.substr(start[,length])`从指定位置截取指定长度的字符串。参数：接收两个参数，start为起始位置的索引，可以为负值，默认值0；length为要截取字符串的长度，非必选，如果省略会截取到字符串最后。返回值：截取后的字符串

注意：`substr`方法不是JavaScript核心语言的一部分，尽量避免使用。可用`substring`方法代替。

```js
var str = "123pppiii456";
console.log(str.substr()); // 123pppiii456
console.log(str.substr(0)); // 123pppiii456
console.log(str.substr(1,5)); // 23ppp
console.log(str.substr(-5)); // ii456
```

| 方法                    | 选择方式……                                | 负值参数            |
| :---------------------- | :---------------------------------------- | :------------------ |
| `slice(start, end)`     | 从 `start` 到 `end`（不含 `end`）         | 允许                |
| `substring(start, end)` | 从 `start` 到 `end`（不含 `end`）         | 负值被视为 `0`      |
| `substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串 | 允许 `start` 为负数 |

### 4. match

用于查找字符串中与条件相匹配的字符

参数：string|regexp

主要有两种情况，全局匹配和非全局匹配。

非全局匹配返回数组，由匹配项和捕获组元素组成，

还有其他附加属性：

- index匹配项所在的索引
- input原字符
- groups命名捕获组，正则中没有为捕获组命名返回undefined，存在命名返回对象，属性为捕获组名与其对应的捕获项。

```js
let str = '2012-11-01';
// yyyy-MM-dd
let res = str.match(/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d\d)/);
//结果：['2012-11-01', '2012', '11', '01', index: 0, input: '2012-11-01', groups: {year: '2012', month: '11', day: '01'}]
```

全局匹配，即正则表达式含有修饰符g，那么返回只返回所有的匹配项，此时没有附加属性和捕获项

```js
let str = '2012-11-01你好2013-1-12';
// yyyy-MM-dd
let res = str.match(/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d\d)/g);
// 结果['2012-11-01','2013-1-12']
```

### 5. replace

用于查找并替换字符串，不该变字符串本身，返回替换后的新字符串

参数：

两个参数，第一个参数为匹配条件 string|RegExp，用于查找被替换的字符串

第二个参数string|function，用于替换原字符串

**当第二个参数是字符串时有如下特殊字符：**

| 变量名      | 代表的值                                                     |
| :---------- | :----------------------------------------------------------- |
| `$$`        | 插入一个 "$"。                                               |
| `$&`        | 插入匹配的子串。                                             |
| `$``        | 插入当前匹配的子串左边的内容。                               |
| `$'`        | 插入当前匹配的子串右边的内容。                               |
| `$*n*`      | 假如第一个参数是 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从 1 开始。如果不存在第 n 个分组，那么将会把匹配到到内容替换为字面量。比如不存在第 3 个分组，就会用“$3”替换匹配到的内容。 |
| `*$<Name>*` | 这里*`Name`* 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。 |

特殊字符`$$`：两个连续的`$`会被当成特殊字符处理变成一个`$`

```js
let str = 'nihao_123_wohao';
console.log(str.replace('123', '$')); //nihao_$_wohao
console.log(str.replace('123', '$$')); //nihao_$_wohao
console.log(str.replace('123', '$$$')); //nihao_$$_wohao
console.log(str.replace('123', '$$$$')); //nihao_$$_wohao
```

特殊字符`$&`

```js
let str = 'nihao_123_wohao';
console.log(str.replace('123', '$&,$&')); // nihao_123,123_wohao
```

特殊字符$`

```js
let str = 'nihao_123_wohao';
console.log(str.replace('123', '$`')); //nihao_nihao__wohao
```

特殊字符`$'`

```js
let str = 'nihao_123_wohao';
console.log(str.replace('123', '$\'')); //nihao__wohao_wohao
```

特殊字符`$n`

```js
let str = 'nihao wohao';
console.log(str.replace(/(\w+)\s(\w+)/g, '$1,$2')); //nihao,wohao
```

特殊字符`$<name>` name是分组名

```js
let str = 'nihao wohao';
// 正则中的第一个分组命名w1,第二个分组命名w2，后续特殊字符使用分组名
console.log(str.replace(/(?<w1>\w+)\s(?<w2>\w+)/g, '$<w1>,$<w2>')); //nihao,wohao
```

**当第二个参数是替换函数（replacement）：**

函数参数如下

| 变量名            | 代表的值                                                     |
| :---------------- | :----------------------------------------------------------- |
| `match`           | 匹配的子串。（对应于上述的$&。）                             |
| `p1,p2, ...`      | 假如 replace() 方法的第一个参数是一个[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 对象，则代表第 n 个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
| `offset`          | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将会是 1） |
| `string`          | 被匹配的原字符串。                                           |
| NamedCaptureGroup | 命名捕获组匹配的对象                                         |

