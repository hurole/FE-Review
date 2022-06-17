/**
 * @description 基于数组实现栈结构
 */
class Stack {
  constructor() {
    this.items = [];
  }
  push(val) {
    this.items.push(val);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  toString() {
    return this.items.toString();
  }
}

module.exports = Stack;
