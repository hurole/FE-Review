/**
 * @description 基于数组实现队列
 */

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(val) {
    this.items.push(val);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toString() {
    return this.items.join(" ");
  }
}

module.exports = Queue;
