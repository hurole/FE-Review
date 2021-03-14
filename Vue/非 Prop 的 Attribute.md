# 非 Prop 的 Attribute

父组件传给子组件的属性，有些是没有在组件中注册的。例如：class，style。这时这些属性就会直接作用于子组件的根元素上。

```vue
// 子组件 MyCom
<template>
    <div class="class1">我是组价，我叫{{name}}</div>
</template>
<script>

export default {
    // inheritAttrs:false, 
    props:{
        name:{
            type:String,
            reuired:true,
            default:"Join"
        }
    }
}
</script>

<style scoped>
.cls1{
    width: 200px;
    height: 200px;
    background-color: bisque;
}
</style>
```

父组件中给子组件传了两个属性，age，class在子组件中未定义，所以直接作用根元素上。

需要注意的是，class和style这两个attribute并不会覆盖。

```vue
// 父组件
<template>
	<MyCom name="Miss" age="11" class="cls2"/>
</template>
```

编译后html，`age='11'`直接作用于标签上。

```html
<div class="cls1 cls2" age="11">我是组价，我叫Miss</div>
```

禁用Attribute继承`inheritAttrs:false`。除了style和class，其他属性都不会继承。

属性修饰符`.sync`，是语法糖，实现属性的双绑定。

组件：

```vue
<template>
  <input type="text" :value="value" @input="change">
</template>
<script>
export default {
    props:["value"],
    methods:{
        change(e){
            this.$emit("update:value",e.target.value);
        }
    }
}
</script>
```

父级：

```vue
<template>
	<h2>SyncProps:{{value}}</h2>
    <SyncProps class="class2" v-bind:value.sync="value"/>
    <!-- <SyncProps class="class2" v-bind:value="value" @update:value="value=$event"/> -->
</template>
<script>
export default {
	data(){
        retrun{
            value:""
        }
    }
}
```

