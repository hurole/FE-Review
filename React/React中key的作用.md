# React中key的作用

在使用React渲染列表时需要为每一个item指定key属性，那么key有什么作用？

## 帮助Diff虚拟DOM

当数据变化时，React会生成新的虚拟DOM与旧的虚拟DOM进行Diff比较，比较规则如下：

1. *旧虚拟DOM*中找到了与*新虚拟DOM*相同的key：
   - 若虚拟DOM中内容没变，则直接使用之前的真实DOM。
   - 若虚拟DOM中内容改变了，则生成新的真实DOM替换页面上原来的真是DOM。
2. 旧虚拟DOM中没找到与新虚拟DOM相同的key：
   - 直接根据数据生成新的真实DOM渲染到页面上。

## 索引作为key的问题

列表渲染时，如果没有显式的指定key那么React默认将列表项索引作为key。

有些时候数据中没有唯一标识，我们也会使用index作为key，但是在一些情况下会引发一些问题：

1. 数据的顺序发生改变时，例如向列表的中插入数据，更改数据的顺序。这时显示没有问题，但是更新数据时会重复的渲染已经存在的DOM，会有渲染效率问题。

   ```jsx
   {/*原数据为*/}
   list=[
       {id:"1",name:"React"}，
       {id:"2",name:"Vue"},
       {id:"3",name:"Angular"}
   ]
   {/*数据变化后为*/}
   list=[
       {id:"1",name:"React"},
       {id:"4",name:"jQuery"},
       {id:"2",name:"Vue"},
       {id:"3",name:"Angular"}
   ]
   ```

   **索引用作key时：**

   数据更新后，插入了一条name为jQuery的数据，新虚拟DOM与旧虚拟DOM比较时发现只有列表第一项key没有发生变化内容也没有变化，第二三项是key没变但是内容变化了，第四项是就虚拟DOM中key不存在，所以第2、3、4都会生成真实DOM并渲染页面。

   **Id用作key时：**

   数据更新后，插入了一条name为jQuery的数据，新虚拟DOM与旧虚拟DOM比较后发现，第一、三、四项的key没有发生变化，内容也没有变化，真实DOM不发生改变。只有第二项的key不存在，所以生成真是DOM渲染到页面。

   **总结：**以索引作为key时，重新生成了3个真实DOM节点；以唯一标识作为key时，只生成了1个真实DOM节点。所以使用唯一标识作为key效率比索引作为key的效率要高，数据量大时更加明显。

2. 列表项中含有输入型元素，且为非受控组件时，DOM的显示也会有问题。

   ```jsx
   import React, { Component } from "react";
   
   class KeyIndex extends Component {
     constructor() {
       super();
       this.state = {
         arr: [
           { name: "赵信", id: "1" },
           { name: "盖伦", id: "2" },
           { name: "嘉文", id: "3" }
         ]
       };
     }
     add = () => {
       this.setState({
         arr: [...this.state.arr.reverse()]
       });
     };
     insert = () => {
       this.state.arr.splice(1, 0, { name: "压缩", id: "66" });
       this.setState({
         arr: [...this.state.arr]
       });
     };
     render() {
       return (
         <div>
           <button onClick={this.add}>倒序</button>
           <br />
           名单1（索引作为key）：
           <ul>
             {this.state.arr.map((item, index) => {
               return (
                 <li key={index}>
                   {item.name}
                   <input type="text" />
                 </li>
               );
             })}
           </ul>
           名单2（id作为key）：
           <ul>
             {this.state.arr.map((item, index) => {
               return (
                 <li key={item.id}>
                   {item.name}
                   <input type="text" />
                 </li>
               );
             })}
           </ul>
         </div>
       );
     }
   }
   export default KeyIndex;
   ```

   以索引作为key初次渲染，为输入框填入值。假设赵信对应输入框中输入“赵信”，盖伦对应输入框中输入“盖伦”，嘉文对应输入框中输入“嘉文”；然后点击按钮为数据添加一条亚索的数据，就会发现：赵信对应输入框中为“赵信，压缩对应输入框中值为“盖伦”，盖伦对应输入框值为“嘉文”，嘉文对应输入框值为空。以id作为key的列表则没有这个问题。