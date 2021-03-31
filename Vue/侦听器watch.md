# 侦听器

侦听器是用来侦听数据变化，来响应一些操作。

```html
<template>
  <div>
    姓名：<input type="text" v-model="name" /><br />
    年龄：<input type="text" v-model.number="info.age" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "hurole",
      info: {
        age: 22,
      },
    };
  },
  watch: {
    //   参数第一个是变更后的新数据，第二个参数是旧数据
    name: function (newVal, oldVal) {
      console.log("name:", newVal, oldVal);
    },
    // info:function(newVal,oldVal){
    //     console.log("年龄变化：",newVal,oldVal);
    // },
    info: {
      handler: function (newVal, oldVal) {
        // oldVal和newVal一样 因为他们指向同一个对象
        console.log("年龄变化：", newVal, oldVal);
      },
      //深度侦听
      deep: true,
    },
  },
};
</script>
```

1. 侦听器(watch）是一个对象，属性是被侦听的数据，值是一个函数或对象，函数有两个参数，第一个参数是变更后的新数据，第二个参数是旧数据。

2. 引用类型里面的属性发生变化，需要开启深度监听。属性值此时是对象，有handler和deep两个属性。
3. 侦听引用类型，新数据和旧数据是一样的，都指向同一个对象。