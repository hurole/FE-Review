// 原始数据
let data = {
    name: "hurole",
    age: 55,
    info: {
        address: "China",
        other: {
            mail: "123@qq.com",
            tel: 123
        }
    },
    color: ["red", { a: 1 }]
}
// 更新视图
function updateView() {
    console.log("更新视图")
}
let arrayPrototype = Array.prototype;
// 创建一个对象 以数组原型作为对象的__proto__
let newProto = Object.create(arrayPrototype);
let methods = ['shift', 'unshift', 'pop', 'push', 'splice', 'reverse', 'sort'];
methods.forEach(name => {
    newProto[name] = function () {
        arrayPrototype[name].apply(this, arguments);
        updateView();
    }
})
function observe(data) {
    if (typeof data !== 'object' || typeof data === null) {
        return;
    }
    // 如果是数组 更改__proto__指向 让它使用重写的方法
    if (Array.isArray(data)) {
        data.__proto__ = newProto;
        return;
    }
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            reactive(data, key, data[key])
        }
    }
}
// 实现属性的监控
function reactive(target, key, value) {
    // 如果属性为 对象 那么递归 深度监听
    observe(target[key]);
    Object.defineProperty(target, key, {
        get: function () {
            return value
        },
        set: function (s) {
            value = s
            updateView()
        }
    })
}
// 测试对象
observe(data);
console.log(data);
// 修改data属性 触发视图更新
data.name = "huhu";
data.age = 55;
// 属性为对象 可以深度监听 更新视图
data.info.address = "shanghai";
data.info.other.tel = 123456;
// 属性为数组 监听
data.color.push(222);
