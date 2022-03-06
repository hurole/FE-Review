function ListNode(x) {
  this.val = x;
  this.next = null;
}
let a = new ListNode(1);
let b = new ListNode(2);
let c = new ListNode(3);
let d = new ListNode(4);
let e = new ListNode(5);
a.next = b;
b.next = c;
c.next = d;
d.next = e;
// 删除倒数第n个节点
function removeListNode(node, n) {
  //链表长度
  let length = 0;
  let curr = node;
  //遍历链表获取链表长度
  while (curr) {
    length++;
    curr = curr.next;
  }
  // 如果倒数的n大于链表长度越界，返回原链表
  if (n > length) {
    return node;
  }
  // 倒数第n个为正数的第tailN+1个节点
  let tailN = length - n;
  // 计数当前遍历到正数的第count个节点
  let count = 0;
  curr = node;
  let lastNode = null;
  // 再次遍历链表以获取正数的第tailN个节点，存入lastNode
  while (curr) {
    count++;
    if (count === tailN) {
      lastNode = curr;
      break;
    }
    curr = curr.next;
  }
  console.log(`正数第${count}个节点`, lastNode);
  // 将第tailN+2个节点赋值给第tailN个节点的next属性
  lastNode.next = lastNode.next.next;
  return node;
}

removeListNode(a, 2);
