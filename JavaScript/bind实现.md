# bind 方法实现

## bind 特性

- bind 是 Function.prototype 上的方法
- bind 执行返回一个函数，返回函数执行时，this 指向 bind 函数的第一个参数。原函数执行后可能有返回值。
- bind 可以接收多个参数，第二个及以后的参数可以传给返回函数作为参数，如果返回函数也有参数，那么会拼接一起全部传入返回函数。
- 返回函数作为构造函数使用 this 指向实例
- bind 的返回函数与原函数具有相同的原型

## 实现

> 声明一个 myBInd 函数来模拟实现 bind 方法。

1. bind 是 Function.prototype 上的方法

   ```javascript
   Function.prototype.myBind = function () {};
   ```

2. bind 执行返回一个函数，返回函数的 this 指向 bind 的第一个参数

   ```javascript
   Function.prototype.myBind = function(context){
       // 原函数
       var self = this;
       // 新函数
       var fBound = function(){
           // 原函数可能有返回值
           retrun self.apply(context);
       }
       return fBound;
   }
   ```

3. bind 可以接收多个参数，第二个及以后的参数可以传给返回函数作为参数，如果返回函数也有参数，那么会拼接一起全部传入返回函数。

   ```javascript
   Function.prototype.myBind = function(context){
       // 原函数
       var self = this;
       // 获取第myBind剩余参数
       var args = Array.prototype.slice.call(arguments, 1);
       // 新函数
       var fBound = function(){
           // fBound函数的参数数组
           var boundArgs = Array.prototype.slice.call(arguments);
           // 原函数可能有返回值
           retrun self.apply(context,args.concat(boundArgs));
       }
       return fBound;
   }
   ```

4. 返回函数作为构造函数使用 this 指向实例

   ```javascript
   Function.prototype.myBind = function (context) {
     // 原函数
     var self = this;
     // 获取myBind剩余参数数组
     var args = Array.prototype.slice.call(arguments, 1);
     // 新函数
     var fBound = function (boundArgs) {
       // fBound函数的参数数组
       var boundArgs = Array.prototype.slice.call(arguments);
       // 原函数可能有返回值
       return self.apply(
         this instanceof fBound ? this : context,
         args.concat(boundArgs)
       );
     };
     fBound.prototype = self.prototype;
     return fBound;
   };
   ```

5. 完整 ES6 （当 bind 方法返回的函数作为构造函数使用，修改实例对象的[\[prototype]]属性）

   ```js
   Function.prototype.myBind = function (context, ...args) {
     if (context === undefined || context === null) {
       context = window;
     }
     var oldFn = this;
     return function fBound() {
       if (this instanceof fBound) {
         Object.setPrototypeOf(this, oldFn.prototype);
         return oldFn.apply(this, args.concat([...arguments]));
       }
       return oldFn.apply(context, args.concat([...arguments]));
     };
   };
   ```
