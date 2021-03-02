# React代码分割

## 需求背景

随着React项目越来越复杂，尤其是引用了大量的第三方库后，打包后的JS文件会变得非常大，此时首屏加载非常耗时。这个时候引入代码分割减小首屏的文件大小，分割后的文件在需要使用时再进行引入，这样提升首屏加载速度，提升用户的使用体验。

## 实现代码分割的方式

### 1. `import`

`math.js`文件对外导出一个`add`方法用于计算两数相加

```js
// math.js
function add(a,b){
    return a+b;
}
export {
    add
};
```

`MathComponent.jsx`组件调用math.js文件中的add方法进行计算。

使用import进行代码分割前：

```jsx
// 代码分割后的MathComponent.jsx
import { add } from './math';
import React, { Component } from 'react';

export default class Math extends Component {
    state={
        result:0
    }
    componentDidMount(){
        this.setState({
            result:add(this.props.a,this.props.b)
        })
    }
    render() {
        return (
            <div>
                <h1>a+b=?</h1>
                <h4>答案：{this.state.result}</h4>
            </div>
        )
    }
}
```

分割前JS文件块如下：

![代码分割前js文件](D:\Project\FE-Review\Images\importCodeSplit.png)

使用import进行代码分割后

```jsx
// 代码分割后的MathComponent.jsx
import React, { Component } from 'react';

export default class Math extends Component {
    state={
        result:0
    }
    componentDidMount(){
        import('./math').then(res=>{
            let result = res.add(this.props.a,this.props.b);
            this.setState({
                result
            })
        }).catch(e=>{
            console.log(e);
        })
    }
    render() {
        return (
            <div>
                <h1>a+b=?</h1>
                <h4>答案：{this.state.result}</h4>
            </div>
        )
    }
}
```

分割后JS文件块如下：

![代码分割后JS文件](D:\Project\FE-Review\Images\importCodeSplit0.png)

### 2. `React.lazy`方法

随便定义一个组件

```jsx
// Lazy.jsx组件
export default function(){
    return <h1>React.lazy</h1>
}
```

在`App.jsx`使用`React.lazy`引入`Lazy.jsx`组件

```jsx
// App.jsx组件
import React,{ Suspense } from 'react';
const Lazy = React.lazy(()=>import('./components/Lazy'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading</div>}>
        <Lazy></Lazy>
      </Suspense>
    </div>
  );
}

export default App;
```

这里`Suspence`作用是，当Lazy组件尚未加载成功或者加载失败时的优雅处理方式，展示loading信息。