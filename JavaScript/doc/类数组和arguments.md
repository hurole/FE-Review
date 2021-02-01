# 类数组和arguments

## 类数组

类数组是指有length和若干索引属性的对象。

例如：

```javascript
var likeArray = {
    0:"array like",
    1: 1,
    length: 2
}
```

类数组可以读写元素，获取长度

```javascript
var likeArray = {
    0:"array like",
    1: 1,
    length: 2
}
console.log(likeArray.length); //2
console.log(likeArray.[0]); // "array like"
likeArray[1] = 2;
console.log(likeArray[1]); // 2 
```

遍历类数组

```javascript
for(var i = 0; i<likeArray.length;i++){
      
}
```

类数组使用数组的方法，使用call函数。

例如`push`方法：

```javascript
var likeArray = {
    0:"array like",
    1: 1,
    length: 2
}
Array.prototype.push.call(likeArray,"new");
console.log(likeArray); // {0: "array like", 1: 1, 2: "new", length: 3}
```

类数组转换成数组

```javascript
var likeArray={
    0: "array like", 
    1: 1, 
    2: "new", 
    length: 3
}
Array.prototype.push.call(likeArray,"new")
console.log(likeArray);
// 类数组转换成数组
var array1 = Array.prototype.slice.call(likeArray);
var array2 = Array.from(likeArray);
var array5 = [...likeArray];
var array3 = Array.prototype.concat.apply([],likeArray);
// splice会修改类数组,返回新数组
var array4 = Array.prototype.splice.call(likeArray,0);
console.log(likeArray); // {length:0}
console.log(array1); // ["array like", 2, "new"]
console.log(array2); // ["array like", 2, "new"]
console.log(array3); // ["array like", 2, "new"]
console.log(array4); // ["array like", 2, "new"]
```

## Arguments对象

> Arguments对象存在于函数体中，它里面存放着参数和其他属性。

```javascript
function fn(a,b,c){
    console.log(arguments);
}
fn("a","b","c");
```

其中`length`为参数长度，索引属性对应参数，`callee`指向函数本身。

### arguments与参数绑定

传入的参数会与arguments的值共享，未传入的参数不会与arguments值共享

```javascript
function fn(a, b, c) {
    console.log(a,b,c)
    console.log(arguments);
    a="aa";
    console.log(a,arguments[0]); // aa aa
    // 未传入的参数c
    c= "c"
    console.log(c,arguments[2]); // c undefined
}
fn("a", "b");
```

严格模式下 传入与参数和没有传入的参数，与arguments都不共享。