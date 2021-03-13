# 自定义v-model

v-model指令常用用于表单控件，能够将数据和控件的值进行数据双向绑定。v-model其实是语法糖，例如文本输入框，监听文本输入框的input事件，然后修改数据，同时将数据绑定给文本输入框的value属性。

实现一个可以使用v-model的组件：

```vue
//CustomeVmodel.vue
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