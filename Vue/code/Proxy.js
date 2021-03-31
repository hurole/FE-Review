
var obj = {
    name: "Jack",
    hobbies: [
        "唱",
        "跳",
        "rap"
    ]
}
// 创建obj对象代理
var proxyObj = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log(`获取代理对象的${key}属性`);
        return target[key]
    },
    set: function (target, key, value, receiver) {
        console.log(`设置代理对象的${key}属性`);
        obj[key] = value;
        return true;
    }
})

// 获取属性name
proxyObj.name;
// 设置代理对象的name属性
proxyObj.name = "Nick";


console.log(Reflect.set(obj,'ff',111));
console.log(obj);
var res = Reflect.get(obj,'name');
console.log(res);
