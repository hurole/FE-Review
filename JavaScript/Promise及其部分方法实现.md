## Promise 实现

首先 Promise 是一个构造函数，实例化时要传入一个执行函数，并且该执行函数直接运行。执行函数接收两个参数依次称为 resolve 和 reject，参数类型为函数。Promise 内部有三个状态：分别为 pedding，fulfilled 和 rejected，初始状态为 pedding，当执行 resolve 参数时状态由 pedding 变为 fulfilled，且再不可更改，同理执行 reject 状态变为 rejected，且不可更改。

```js
class MyPromise {
  // promise内部状态
  status = "pedding";
  // 执行函数中调用resolve时传入的参数
  value = undefined;
  // 执行函数中调用reject时传入的函数
  reason = undefined;
  // 执行then方法时 Resolved回调的集合
  onResolvedArray = [];
  // 执行then方法时 Rejected回调的集合
  onRejectedArray = [];
  // 构造函数 参数为执行函数
  constructor(executor) {
    try {
      // 实例化Promise时直接调用执行函数 传入resole，reject函数
      excutor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // resolve函数执行后，变更promise内部状态为fulfilled 并且执行then方法收集的onResolved回调函数
  resolve = (value) => {
    if (this.status === "pedding") {
      // 将参数保存 以备then方法的参数使用
      this.value = value;
      // 执行then方法收集的onResolved回调函数集合
      this.onResolvedArray.forEach((item) => {
        item(value);
      });
      // 变更promise状态
      this.status = "fulfilled";
    }
  };
  // reject函数执行后。变更promise内部状态为rejected 并且执行then方法收集的onRejected回调函数
  reject = (reason) => {
    if (this.status === "pedding") {
      this.reason = reason;
      this.onRejectedArray.forEach((item) => {
        item(reason);
      });
      this.status = "rejected";
    }
  };

  then(onResolved, onRejected) {
    // then方法返回一个promise
    let p = new MyPromise((resolve, reject) => {
      // 当调用then方法时 promise状态已经为fulfilled那么直接调用onResolved回调函数
      if (this.status === "fulfilled") {
        // 保证p这个promise初始化成功后再执行微任务
        queueMicrotask(() => {
          try {
            // 获取onResolved回调函数（then方法的第一个参数）的返回值
            let result = onResolved(this.value);
            // 如果返回值为promise
            if (result instanceof MyPromise) {
              // 防止重复引用promise
              if (p === result) {
                throw new TypeError(
                  "Chaining cycle detected for promise #<Promise>"
                );
              }
              // result的状态变化时 p的状态也变化
              result.then(resolve, reject);
            } else {
              //返回值不为promise,将返回值作为resolve的参数，链式调用then方法这个result直接作为onResolve的参数传入
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === "rejected") {
        queueMicrotask(() => {
          try {
            let result = onRejected(this.reason);
            if (result instanceof MyPromise) {
              if (p === result) {
                throw new TypeError(
                  "Chaining cycle detected for promise #<Promise>"
                );
              }
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else {
        // 调用then方法时 promise状态仍然为 pedding 也就是此时resolve和reject都未执行
        // 此时不能执行回调 要将他们保存起来
        this.onResolvedArray.push(() => {
          //这里同上面 需要对回调的返回值进行判断。以备then方法链式调用
          queueMicrotask(() => {
            try {
              let result = onResolved(this.value);
              if (result instanceof MyPromise) {
                if (result === p) {
                  throw new TypeError(
                    "Chaining cycle detected for promise #<Promise>"
                  );
                }
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedArray.push(() => {
          try {
            queueMicrotask(() => {
              let result = onRejected(this.reason);
              if (result instanceof MyPromise) {
                if (result === p) {
                  throw new TypeError(
                    "Chaining cycle detected for promise #<Promise>"
                  );
                }
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return p;
  }
  catch(onRejected) {
    // return是为了让catch函数执行后返回promise
    return this.then(null, onRejected);
  }
}
```

## `Promise.resolve`和`Promise.reject`实现

```js
Promise.myResolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};
Promise.myReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
// 测试
// let p= Promise.myReject('失败');
let p = Promise.myResolve("成功");
p.then(
  (res) => {
    console.log(res);
  },
  (e) => {
    console.log(e);
  }
);
```

## `Promise.all`实现

`Promise.all`接收一个可迭代对象作为参数，返回一个 Promise 对象。如果参数为 Promise 组成的数组，那么返回的 promise 的 resolve 为所有 promse 的结果形成的数组。入参为空的可迭代对象，那么 resolve 结果为空数组。

```js
Promise.myAll = function (iterator) {
  return new Promise((resolve, reject) => {
    // 存储结果 最终传入resolve函数
    let result = [];
    // 结果函数索引
    let i = 0;
    // 迭代器中已经被处理的元素数量，如果等于迭代器的长度 那么就可以将result传入resolve函数并执行resolve
    let resolveNum = 0;
    // 判断入参是否为可迭代对象
    if (iterator[Symbol.iterator]) {
      // 当入参（可迭代对象）中为空 直接resolve空数组
      let len = iterator.length || iterator.size;
      if (!len) {
        resolve(new Array());
        return;
      }
      // 遍历入参
      for (const item of iterator) {
        // 使用立即执行函数，闭包保证 i的值
        (function (i) {
          // 如果为promise调用then方法
          if (item instanceof Promise) {
            item.then(
              (res) => {
                // 将promise执行结果传入 result 并保持对应位置顺序
                result[i] = res;
                // promise被处理后 将已处理的元素数量加一
                ++resolveNum;
                // 如果已被处理的元素数量等于入参长度，代表全部处理完毕
                if (resolveNum === len) {
                  resolve(result);
                }
              },
              (reason) => {
                reject(reason);
              }
            );
          } else {
            // 元素不为promise 那么直接将元素 放入结果数字中 保证顺序
            result[i] = item;
            // 将已处理的元素数量加一
            resolveNum++;
            if (resolveNum === len) {
              resolve(result);
            }
          }
        })(i);
        i++;
      }
    } else {
      // 入参不是可迭代对象 那么抛出错误
      throw new TypeError(`${iterator} is not iterable`);
    }
  });
};
```

## `Promise.race`实现

```js
Promise.myRace = function (iterator) {
  return new Promise((resolve, reject) => {
    // 判断入参是否可迭代 不可迭代直接报错
    if (iterator[Symbol.iterator]) {
      // 入参是空的可迭代对象 直接return
      let len = iterator.length || iterator.size;
      if (!len) {
        resolve(new Array());
        return;
      }
      // 遍历入参（可迭代对象）
      for (const item of iterator) {
        // 元素为Promise 谁先执行完谁 结果直接传入resolve函数
        if (item instanceof Promise) {
          item.then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        } else {
          // 元素非promise直接，传入resolve
          resolve(item);
        }
      }
    } else {
      throw new TypeError(`${iterator} is not iterable`);
    }
  });
};
```

## `Promise.allSettled`实现

```js
Promise.myAllSettled = function (iterator) {
  // Promise.allSettled方法返回一个promise
  return new Promise((resolve, reject) => {
    // result数组用于存储 迭代器元素的处理结果
    let result = [];
    // settledNum记录处理完成的元素数量
    let settledNum = 0;
    // 索引 用于按顺序将处理结果存入result
    let i = 0;
    // 判断入参是不是可迭代对象
    if (iterator[Symbol.iterator]) {
      // 获取入参可迭代对象的元素个数
      let len = iterator.length || iterator.size;
      // 可迭代对象为空 直接将空数组传入resolve函数
      if (!len) {
        resolve(new Array());
        return;
      }
      // 遍历可迭代对象
      for (item of iterator) {
        // 立即执行函数 确保i
        (function (i) {
          // 如果为Promise 直接调用then方法
          if (item instanceof Promise) {
            item.then(
              (value) => {
                // Promise状态为fulfilled 创建一个含有status和value属性的对象
                let obj = {
                  status: "fulfilled",
                  value,
                };
                // 放入result中，保证顺序
                result[i] = obj;
                // 处理完成的元素个数加一
                ++settledNum;
                // 如果处理完成的元素个数等于迭代器中元素的个数 证明全部处理完成
                if (len === settledNum) {
                  resolve(result);
                }
              },
              (reason) => {
                // Promise状态为rejected 创建一个含有status和reason属性的对象
                let obj = {
                  status: "rejected",
                  reason,
                };
                result[i] = obj;
                ++settledNum;
                if (len === settledNum) {
                  resolve(result);
                }
              }
            );
          } else {
            // 非Promise 直接将元素放入result数组 保证顺序
            result[i] = item;
            ++settledNum;
            if (settledNum === len) {
              resolve(result);
            }
          }
        })(i);
        // 遍历一次i加一
        i++;
      }
    } else {
      // 入参不可迭代直接抛出错误
      throw new TypeError(`${iterator} is not iterable`);
    }
  });
};
```
