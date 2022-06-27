var CQueue = function () {
  // in栈 用于处理入队
  this.inStack = [];
  // out栈 用于处理出队
  this.outStack = [];
};

//
CQueue.prototype.appendTail = function (value) {
  this.inStack.push(value);
};

/**
 * inStack: [1,2,3]
 * outStack:[3,2,1]
 */
CQueue.prototype.deleteHead = function () {
    // 出队时是从out栈顶取元素
  if (!this.outStack.length) {
    if (!this.inStack.length) {
      return -1;
    }
    this.in2out();
  }
  return this.outStack.pop();
};

CQueue.prototype.in2out = function () {
  while (this.inStack.length) {
    this.outStack.push(this.inStack.pop());
  }
};

// test
let queue=new CQueue();
//  [1,2,3]
queue.appendTail(1)
queue.appendTail(2)
queue.appendTail(3)
queue.deleteHead();
//  [2,3]
queue.appendTail(4)
// [2,3,4]
console.log(queue.deleteHead());
console.log('queue', queue)