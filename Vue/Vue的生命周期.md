# Vue的生命周期

## 简述

![Vue的生命周期](https://cn.vuejs.org/images/lifecycle.png)

### 创建阶段

1. 开始创建Vue实例，先初始化生命周期钩子(Lifecycle)和事件(Events)
2. 执行生命周期函数`beforeCreate`
3. 初始化注入(Injections)和响应式数据(Reactivity)
4. 执行生命周期函数`created`
5. 编译模板生成虚拟DOM
6. 执行生命周期函数`beforeMount`
7. 将虚拟DOM渲染到真实的DOM节点上
8. 执行生命周期函数`created`

### 更新阶段

1. 数据发生变化

2. 执行生命周期函数`beforeUpdate`

3. 根据数据重新render生成虚拟DOM，更新页面

4. 执行生命周期函数updated

### 销毁阶段

1. 开始销毁

2. 执行生命周期函数`beforeDestroy`

3. 销毁观察者，子组件和事件监听

4. 执行生命周期函数`destroyed`

## 生命周期函数

### beforeCreate

在这个阶段，实例的生命周期和事件已经初始化完毕。

### created

实例创建完成，data，属性，method 这些已经初始化完成，所以在此阶段可以操作数据，调用函数。

> created到beforeMount这段时间，检测实例化Vue时，传入的对象中有没有el这个属性，如果没有会等到vue实例调用`$mount`这个方法后继续向下执行；如果存在el属性，再看有没有template这个属性，如果没有直接将el的outerHtml（就是那个占位标签，例如：`<div id="app"></div>`）作为模板渲染；如果有templdate属性，调用render函数编译模板生成虚拟DOM。

### beforeMount

这个阶段模板已经编译完成，生成虚拟DOM。

### mounted

这个阶段虚拟DOM已经渲染到真实DOM节点上了，所以这个阶段可以操作DOM。

### beforeUpdate

数据发生变化将要产生页面更新。

### updated

这个阶段页面已经更新完成。

### beforeDestroy

实例将要销毁

### destroyed

到此时实例已经被销毁：销毁组件、事件监听、和观察者。

## 同时存在父子组件

### 挂载阶段

1. 父组件beforeCreate
2. 父组件created
3. 父组件beforeMount
4. 子组件beforeCreate
5. 子组件created
6. 子组件beforeMount
7. 子组件mounted
8. 父组件mounted

### 更新阶段

> 父组件传给子组件的属性变化了，并且子组件模板中使用了该属性

1. 父组件beforeUpdate
2. 子组件beforeUpdate
3. 子组件updated
4. 父组件updated

### 卸载阶段

> 生命周期中已经明确了，子组件卸载是在父组件beforeDestroy和父组件destroyed之间。

1. 父组件beforeDestroy
2. 子组件beforeDestroy
3. 子组件destroyed
4. 父组件destroyed