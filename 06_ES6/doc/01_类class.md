## 1.创建一个类

#### 1.1 class关键字实现

```javascript
class Father{
    name = "father";
}
var f = new Father();
console.log(f);{name:"father"}
```

#### 1.2 构造函数实现

```javascript
function Father(){
    this.name = "father";
}
var f = new Father();
console.log(f); // {name:"father"}
```

