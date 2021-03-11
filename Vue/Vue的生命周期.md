# Vue的生命周期

## 简述

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

实例创建完成，data，属性，method 这些已经初始化完成，所以在此阶段可以操作数据，调用函数，通常在这个阶段请求ajax。

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

