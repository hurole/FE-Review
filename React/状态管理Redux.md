# Redux

实现一个简单计数器

```js
import React, { Component } from "react";
import { createStore } from "redux";

// 创建一个store
// 使用createStore api创建一个新store，他接收一个函数，函数有两个参数state和action，并且返回新的state，这个函数就是reducer
let store = createStore(function (state = 0, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
});

export default class ReduxBasic extends Component {
  componentDidMount() {
    // 订阅 当状态变化时的副作用：强制更新重新渲染dom，响应数据变化到UI
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  increase = () => {
    store.dispatch({
      type: "increment"
    });
  };
  decrease = () => {
    store.dispatch({
      type: "decrement"
    });
  };
  render() {
    return (
      <div>
        <h2>redux实现计数器</h2>
        <div>当前计数：{store.getState()}</div>
        <button onClick={this.increase}>加一</button>
        <button onClick={this.decrease}>减一</button>
      </div>
    );
  }
}
```

上面Redux管理的是单一状态。那么多个状态如何处理？

实现计数器，并控制显隐：

```js
import React, { Component } from "react";
import { createStore } from "redux";

// 负责管理计数的reducer
function handleNum(state = 0, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}
// 负责管理显示隐藏的reducer
function handleShow(state = true, action) {
  switch (action.type) {
    case "show":
      return true;
    case "hide":
      return false;
    default:
      return state;
  }
}
// 合并后的reducer
let reducer = function (state = {}, action) {
  return {
    isShow: handleShow(state.isShow, action),
    num: handleNum(state.num, action)
  };
};
let store = createStore(reducer);

export default class ReduxBasic extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  increase = () => {
    store.dispatch({
      type: "increment"
    });
  };
  decrease = () => {
    store.dispatch({
      type: "decrement"
    });
  };
  show = () => {
    store.dispatch({ type: "show" });
  };
  hide = () => {
    store.dispatch({ type: "hide" });
  };
  render() {
    return (
      <div>
        <h2>redux实现计数器</h2>
        {store.getState().isShow ? <div>当前计数：{store.getState().num}</div> : null}
        <button onClick={this.increase}>加一</button>
        <button onClick={this.decrease}>减一</button>
        <button onClick={this.hide}>隐藏</button>
        <button onClick={this.show}>显示</button>
      </div>
    );
  }
}
```

## 三大原则

- 单一数据源

  所有state，存储在一个对象树中（就是对象的属性可以为对象），对象树存在一个store中（`createStore(reducer)`的返回值就是store）。

- state只读

  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

  ```js
  store.dispatch({type:'add'}); // dispatch方法接受对象就是action
  ```

- 使用纯函数reducer执行修改

  触发action后，编写reducer函数来响应action对state进行修改。