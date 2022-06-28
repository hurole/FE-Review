var reverseList = function (head) {
  let reverseHead = null;
  if (!head) {
    return null;
  }
  let current = head;
  let next = current.next;
  while (current) {
    current.next = reverseHead;
    reverseHead = current;
    current = next;
    next = current ? current.next : null;
  }
  return reverseHead;
};

// test
class Node {
  constructor(val) {
    this.val = val || null;
    this.next = null;
  }
}

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
let res = reverseList(head);
console.log("res", res);
