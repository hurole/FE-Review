# 自定义v-model

v-model指令常用用于表单控件，能够将数据和控件的值进行数据双向绑定。v-model其实默认value属性和input事件的语法糖。例如对文本输入框使用v-model指令，实际文本框触发input事件修改data，data有通过输入框的value属性传递给输入框，实现双向绑定。

## 定义组件的v-model指令

因为v-model指令默认是input事件和value属性的语法糖，有些时候并不能满足需求，我们可以通过model参数来修改v-model的默认事件和属性：

model是一个对象，他有两个属性，prop和event。v-model指令默认 model相当于

```js
export default{
    model:{
        prop:'value',
        event:'input'
    }
}
```

例如下面这个组件没有指定model，也可以实现v-model指令

```vue
// Custom.vue
<template>
  <input type="text" @input="$emit('input',$event.target.value)" :value="value">
</template>

<script>
export default {
    //model:{
    //    prop:'value',
    //    event:'input'
    //},
    props:[
        "value"
    ]
}
</script>
// 父组件
<template>
  <Custom v-model="customVal"/>
</template>
```

使用model参数改变，默认的属性和事件：

```vue
//CustomVmodel.vue
<template>
  <div>
    <input type="text" @input="handle" :value="text" />
  </div>
</template>

<script>
export default {
  // 可选model
  model: {
    prop: "text",
    event: "get",
  },
  props: ["text"],
  methods: {
    handle(e) {
      this.$emit("get", e.target.value);
    },
  },
};
</script>
```

父组件中：

```vue
<template>
  <div>
    <span>数据:{{ value }}</span>
    <CustomeModel v-model="value" />
   <-- <CustomeModel @get="value=$event" :text="value"/>-->
  </div>
</template>
<script>
import CustomeModel from "./CustomeModel";
export default{
    data() {
        return {
            value: "",
        }
    },
    components: {CustomeModel}
}
</script>
```

数据到组件中，是通过text属性传递的；组件修改数据，是通过触发自定义事件get实现的。