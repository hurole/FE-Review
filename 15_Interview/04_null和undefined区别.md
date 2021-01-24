### JavaScript中null和undefined的区别？

- `null`表示没有对象，表示此处不该有值。

例如：原型链的终点。

- `undefined`表示此处应该有值但是未定义。

例如：

1.声明变量但是未赋值。

2.函数调用时应该传入的参数未传入。

3.对象的属性没有赋值。

4.函数没有返回值默认返回`undefined`。

- `null`转换成数值类型为0，`undefined`转换成数值类型为`NaN`

```javascript
Number(null); // 0
Number(undefined); // NaN
```

