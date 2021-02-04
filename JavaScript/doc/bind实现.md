# bind方法实现

## bind特性

- bind是Function.prototype上的方法
- bind执行返回一个函数，返回函数执行时，this指向bind函数的第一个参数。原函数执行后可能有返回值。
- bind可以接收多个参数，第二个及以后的参数可以传给返回函数作为参数，如果返回函数也有参数，那么会拼接一起全部传入返回函数。
- 返回函数作为构造函数使用this指向实例
- bind的返回函数与原函数具有相同的原型

## 实现

> 声明一个myBInd函数来模拟实现bind方法。

1. bind是Function.prototype上的方法

   ```javascript
   Function.prototype.myBind = function(){
       
   }
   ```

2. bind执行返回一个函数，返回函数的this指向bind的第一个参数

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
   
3. bind可以接收多个参数，第二个及以后的参数可以传给返回函数作为参数，如果返回函数也有参数，那么会拼接一起全部传入返回函数。

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

4. 返回函数作为构造函数使用this指向实例

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
           return self.apply(this instanceof fBound ? this : context, args.concat(boundArgs));
       };
       return fBound;
   };
   ```

   