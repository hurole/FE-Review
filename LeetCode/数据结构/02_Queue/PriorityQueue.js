const Queue = require("./Queue");

/**
 * @description 加入优先级队列元素
 */
class PriorityElement {
  constructor(content, priority) {
    this.content = content;
    this.priority = priority;
  }
}
/**
 * @description 基于数组实现先级队列,元素是包含内容和优先级的对象
 */
class PriorirtyQueue extends Queue {
  constructor() {
    super();
  }
  enqueue(content, priority) {
    // priority越小优先级越高
    let element = new PriorityElement(content, priority);
    if (this.items.length === 0) {
      this.items.push(element);
      return;
    }
    let isSure = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > priority) {
        this.items.splice(i, 0, element);
        isSure = true;
        break;
      }
    }
    // 遍历队列所有元素，未确定插入位置的索引
    if (!isSure) {
      this.items.push(element);
    }
  }
  toString() {
    let result = "";
    for (let index = 0; index < this.items.length; index++) {
      result += this.items[index].priority + " ";
    }
    return result;
  }
}
let s = new PriorirtyQueue();
s.enqueue("1", 1);
s.enqueue("91", 91);
s.enqueue("2", 2);
s.enqueue("33", 33);
console.log(s.toString());
module.exports = PriorirtyQueue;
