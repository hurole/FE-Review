let a = new ListNode("1");
let b = new ListNode("2");
let c = new ListNode("3");
let d = new ListNode("4");
a.next = b;
b.next = c;
c.next = d;
function ListNode(x) {
  this.val = x;
  this.next = null;
}
function ReverseList(pHead) {
  if (pHead === null) {
    return null;
  }
  let curr = pHead;
  let result = null;
  let next = curr.next;
  while (curr) {
    curr.next = result;
    result = curr;
    curr = next;
    next = curr && curr.next;
  }
  return result;
}
let s = ReverseList(a);
// 原链表
console.log("a", a);
// 反转后链表
console.log("s", s);
