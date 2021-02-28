### 问：实现一个类似indexOf和includes方法。

- 第一种方式，使用substr方法辅助实现。

```js
function myIndexOf(str, target) {
    var strLength = str.length;
    var targetLength = target.length;
    if (targetLength > strLength) {
        return -1;
    }
    for (var i = 0; i <= strLength - targetLength; i++) {
        if (str.substr(i, targetLength) === target) {
            return i;
        }
    }
    return -1;
}
// 测试
var str = "ahjkfhaksjhhello";
console.log(myIndexOf(str, "hello")); // 11
console.log(myIndexOf(str, "sss")); //-1
```

- 第二种方法，正则表达式

```js
function myIndexOf(str, target) {
    var reg = new RegExp(target);
    var res = reg.exec(str);
    console.log(res);
    if (res === null) {
        return -1;
    } else {
        return res.index;
    }
}
// 测试
var str = "ahjkfhaksjhhello";
console.log(myIndexOf(str, "hello")); // 11
console.log(myIndexOf(str, "sss")); // -1
```

