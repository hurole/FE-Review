# Vue指令

## 指令

1. `v-bind`属性绑定，简写成`:`
2. `v-on`事件绑定，简写成`@`
3. `v-if`、`v-else`、`v-else-if`处理条件渲染。
4. `v-show`控制元素显示隐藏
5. `v-for`循环渲染列表
6. `v-html`以HTML的形式插入DOM节点，小心XSS漏洞
7. `v-text`以文本形式插入DOM节点
8. `v-model`表单控件双向数据绑定
9. `v-slot`插槽
10. `v-pre`跳过编译。
11. `v-once`只渲染一次，随后重新渲染，或更新数据不会变更其内容。
12. `v-cloak`编译期间，这个指令会一直存在。

## v-if和v-for

- v-if和v-for同时使用，v-for优先级高于v-if。
- 避免在同时在一个元素上使用v-if和v-for，因为v-for的优先级大于v-if，所以渲染列表时每次都是先完整渲染列表然后才将不符合条件的列表项隐藏，这样性能不好。可以使用计算属性代替，计算出列表中符合条件的项，然后再使用v-for渲染列表。

## v-show和v-if

v-if和v-show，当元素频繁切换显示隐藏优先使用v-show，v-show原理是`display:none`

## v-for和key

- v-for渲染列表，key尽量使用唯一Id。