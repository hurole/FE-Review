const Queue = require("./Queue");

/**
 * @description 给定一个数组，数组中
 */
function findLast(memberArray, baseNum) {
  if (memberArray.length === 0) {
    throw new Error("memerArray is empty");
  }
  if (memberArray.length == 1) {
    return memberArray[0];
  }
  const queue = new Queue();
  let index = 1;
  // 所用元素先进队
  for (let i = 0; i < memberArray.length; i++) {
    queue.enqueue(memberArray[i]);
  }
  console.log(queue.toString());
  while (queue.size() > 1) {
    if (index === baseNum) {
      // 只出队不重新进队
      queue.dequeue();
      index = 1;
    } else {
      // 出队的元素重新进队
      queue.enqueue(queue.dequeue());
      index++;
    }
  }
  return queue.dequeue();
}
module.exports = findLast;
