## Promise实现

首先Promise是一个构造函数，实例化时要传入一个执行函数，并且该执行函数直接运行。执行函数接收两个参数依次称为resolve和reject，参数类型为函数。Promise内部有三个状态：分别为pedding，fulfilled和rejected，初始状态为pedding，当执行resolve参数时状态由pedding变为fulfilled，且再不可更改，同理执行reject状态变为rejected，且不可更改。

```js
class MyPromise {
    // promise内部状态
    status = 'pedding'
    // 执行函数中调用resolve时传入的参数
    value = undefined
    // 执行函数中调用reject时传入的函数
    reason = undefined
    // 执行then方法时 Resolved回调的集合
    onResolvedArray = [];
    // 执行then方法时 Rejected回调的集合
    onRejectedArray = []
    // 构造函数 参数为执行函数
    constructor(excutor) {
        try {
            // 实例化Promise时直接调用执行函数 传入resole，reject函数
            excutor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error)
        }
    }
    // resolve函数执行后，变更promise内部状态为fulfilled 并且执行then方法收集的onResolved回调函数
    resolve = (value) => {
        if (this.status === "pedding") {
            // 将参数保存 以备then方法的参数使用
            this.value = value;
            // 执行then方法收集的onResolved回调函数集合
            this.onResolvedArray.forEach(item => {
                item(value);
            })
            // 变更promise状态
            this.status = 'fulfilled'
        }
    }
    // reject函数执行后。变更promise内部状态为rejected 并且执行then方法收集的onRejected回调函数
    reject = (reason) => {
        if (this.status === "pedding") {
            this.reason = reason;
            this.onRejectedArray.forEach(item => {
                item(reason);
            })
            this.status = "rejected"
        }
    }

    then(onResolved, onRejected) {
        // then方法返回一个promise
        let p = new Promise((resolve, reject) => {
            // 当调用then方法时 promise状态已经为fulfilled那么直接调用onResolved回调函数
            if (this.status === 'fulfilled') {
                // 保证p这个promise初始化成功后再执行微任务
                queueMicrotask(() => {
                    try {
                        // 获取onResolved回调函数（then方法的第一个参数）的返回值
                        let result = onResolved(this.value);
                        // 如果返回值为promise
                        if (result instanceof MyPromise) {
                            // 防止重复引用promise
                            if (p === result) {
                                throw new TypeError("Chaining cycle detected for promise #<Promise>")
                            }
                            // result的状态变化时 p的状态也变化
                            result.then(resolve, reject)
                        } else {
                            //返回值不为promise,将返回值作为resolve的参数，链式调用then方法这个result直接作为onResolve的参数传入
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === 'rejected') {
                queueMicrotask(() => {
                    try {
                        let result = onRejected(this.reason);
                        if (result instanceof MyPromise) {
                            if (p === result) {
                                throw new TypeError("Chaining cycle detected for promise #<Promise>")
                            }
                            result.then(resolve, reject)
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                // 调用then方法时 promise状态仍然为 pedding 也就是此时resolve和reject都未执行
                // 此时不能执行回调 要将他们保存起来
                this.onResolvedArray.push(() => {
                    //这里同上面 需要对回调的返回值进行判断。以备then方法链式调用
                    queueMicrotask(() => {
                        try {
                            let result = onResolved(this.value)
                            if (result instanceof MyPromise) {
                                if (result === p) {
                                    throw new TypeError("Chaining cycle detected for promise #<Promise>")
                                }
                                result.then(resolve, reject);
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                });
                this.onRejectedArray.push(() => {
                    try {
                        queueMicrotask(() => {
                            let result = onRejected(this.reason)
                            if (result instanceof MyPromise) {
                                if (result === p) {
                                    throw new TypeError("Chaining cycle detected for promise #<Promise>")
                                }
                                result.then(resolve, reject);
                            } else {
                                resolve(result)
                            }
                        })
                    } catch (error) {
                        reject(error)
                    }
                });
            }
        })
        return p;
    }
    catch(onRejected) {
        // return是为了让catch函数执行后返回promise
        return this.then(null, onRejected)
    }
}
```

## `Promise.resolve`和`Promise.reject`实现

```js
Promise.myResolve=function(value){
    return new Promise((resolve,reject)=>{
        resolve(value)
    })
}
Promise.myReject=function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}
// 测试
// let p= Promise.myReject('失败');
let p= Promise.myResolve('成功');
p.then(res=>{
    console.log(res);
},e=>{
    console.log(e);
})
```

## `Promise.all`实现

`Promise.all`接收一个可迭代对象作为参数，返回一个Promise对象。如果参数为Promise组成的数组，那么返回的promise的resolve为所有promse的结果形成的数组。入参为空的可迭代对象，那么resolve结果为空数组。

```js
Promise.myAll = function (arr) {
    return new Promise((resolve, reject) => {
        // 存储结果 最终传入resolve函数
        let result = [];
        // 结果函数索引
        let i = 0;
        // 迭代器中已经被处理的元素数量，如果等于迭代器的长度 那么就可以将result传入resolve函数并执行resolve
        let resolveNum = 0;
        // 判断入参是否为可迭代对象
        if (arr[Symbol.iterator]) {
            // 当入参（可迭代对象）中为空 直接resolve空数组
            if (!arr.length) {
                resolve(new Array());
                return;
            }
            // 遍历入参
            for (const iterator of arr) {
                // 使用立即执行函数，闭包保证 i的值
                (function (i) {
                    // 如果为promise调用then方法
                    if (iterator instanceof Promise) {
                        iterator.then(res => {
                            // 将promise执行结果传入 result 并保持对应位置顺序
                            result[i] = res;
                            // promise被处理后 将已处理的元素数量加一
                            ++resolveNum;
                            // 如果已被处理的元素数量等于入参长度，代表全部处理完毕
                            if (resolveNum === arr.length) {
                                resolve(result);
                            }
                        }, reason => {
                            reject(reason)
                        })
                    } else {
                        // 元素不为promise 那么直接将元素 放入结果数字中 保证顺序
                        result[i] = iterator;
                        // 将已处理的元素数量加一
                        resolveNum++;
                        if (resolveNum === arr.length) {
                            resolve(result);
                        }
                    }
                })(i)
                i++;
            }
        } else {
            // 入参不是可迭代对象 那么抛出错误
            throw new TypeError(`${arr} is not iterable`)
        }
    })
}
```

## `Promise.race`实现

```js
Promise.myRace = function (arr) {
    return new Promise((resolve, reject) => {
        // 判断入参是否可迭代 不可迭代直接报错
        if (arr[Symbol.iterator]) {
            // 入参是空的可迭代对象 直接return
            if (!arr.length) {
                return;
            }
            // 遍历入参（可迭代对象）
            for (const iterator of arr) {
                // 元素为Promise 谁先执行完谁 结果直接传入resolve函数
                if (iterator instanceof Promise) {
                    iterator.then(res => {
                        resolve(res);
                    })
                } else {
                    // 元素非promise直接，传入resolve
                    resolve(iterator)
                }
            }
        } else {
            throw new TypeError(`${arr} is not iterable`);
        }
    })
}
```

## `Promise.allSettled`实现

```js
Promise.myAllSettled = function (arr) {
    // 返回一个promise
    return new Promise((resolve, reject) => {
        // 处理结果
        let result = [];
        // 用于迭代索引
        let i = 0;
        // 被处理的元素数量
        let settledNum = 0;
        // 判断入参是否为可迭代对象 不是直接报错
        if (arr[Symbol.iterator]) {
            // 可迭代对象为空直接返回空数组
            if (!arr.length) {
                resolve(new Array());
                return;
            }
            // 遍历可迭代对象
            for (const iterator of arr) {
                // 闭包 保证i的值 
                (function (i) {
                    // 元素为promise 那么直接执行then函数获取处理结果，放入结果数组
                    if (iterator instanceof Promise) {
                        iterator.then(res => {
                            // 放入结果数组 为对象 有两个属性 status 和value
                            result[i] = {
                                value: res,
                                status: 'fulfilled'
                            }
                            // 被处理的元素数量+1
                                ++settledNum
                                // 如果被处理的元素数量等于入参长度那么将结果数组返回
                                if (settledNum === arr.length) {
                                    resolve(result)
                                }
                        }, reason => {
                            // 同理 当promise状态为rejected时也要将promise处理放入结果数组中，并保证顺序
                            // 对象包含两个属性 status和reason
                            result[i] = {
                                reason,
                                status: 'rejected'
                            }
                                ++settledNum
                                if (settledNum === arr.length) {
                                    resolve(result)
                                }
                        })
                    } else {
                        // 可迭代对象（入参）的元素不为promise 那么直接将元素放入结果数组
                        result[i] = {
                            value: iterator,
                            status: 'fulfilled'
                        }
                            ++settledNum
                            if (settledNum === arr.length) {
                                resolve(result)
                            }
                    }
                })(i)
                // 每次遍历将索引+1
                i++;
            }
        } else {
            throw new TypeError(`${arr} is not iterable`)
        }
    })
}
```