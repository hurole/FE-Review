/**
 * @description 双向链表的节点，头指针 数据 尾指针
 */
class Node {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev || null;
    this.next = next || null;
  }
}
/**
 * @description 双向链表
 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(data) {
    let node = new Node(data);
    // 空链表时直接加入节点
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    node.prev = current;
    current.next = node;
    this.tail = node;
    this.length++;
  }

  insert(position, data) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new Node(data);
    // 在索引为0的位置插入，this.tail是不变的，head会被新的节点代替
    if (position === 0) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
      this.length++;
      return true;
    }
    let current = this.head;
    let preNode = null;
    let index = 0;
    while (index < position) {
      preNode = current;
      current = current.next;
      index++;
    }
    node.next = current;
    node.prev = preNode;
    preNode.next = node;
    if (position === this.length) {
      this.tail = node;
    }
    this.length++;
    return true;
  }

  get(position) {
    // 越界
    if (position < 0 || position > this.length - 1) {
      return null;
    }
    let index = 0;
    let current = this.head;
    while (index < position) {
      current = current.next;
      index++;
    }
    return current.data;
  }

  indexOf(data) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  update(position, data) {
    // 越界
    if (position < 0 || position > this.length - 1) {
      return false;
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current.next;
      index++;
    }
    current.data = data;
    return true;
  }

  removeAt(position) {
    if (position < 0 || position > this.length - 1) {
      return false;
    }
    let current = this.head;
    let preNode = null;
    let index = 0;
    while (index < position) {
      preNode = current;
      current = current.next;
      index++;
    }
    if (current.next) {
      current.next.prev = preNode;
    } else {
      // 索引position节点为链表的最后一个节点，需要tail指针前移
      this.tail = preNode;
    }
    if (preNode) {
      preNode.next = current.next;
    } else {
      // 索引position节点为链表的第一个节点，需要head指针后移
      this.head = current.next;
    }
    this.length--;
    return true;
  }

  remove(data) {
    let index = this.indexOf(data);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  toString() {
    let result = "";
    let current = this.head;
    while (current !== null) {
      result += current.data + " ";
      current = current.next;
    }
    return result;
  }

  forwardString() {
    let result = "";
    let current = this.head;
    while (current !== null) {
      result += current.data + " ";
      current = current.next;
    }
    return result;
  }

  backwardString() {
    let result = "";
    let current = this.tail;
    while (current !== null) {
      result += current.data + " ";
      current = current.prev;
    }
    return result;
  }
}

// test
let list = new DoublyLinkedList();
list.append("111");
list.append("222");
list.insert(0, "000");
list.insert(3, "333");
console.log(list.toString());
console.log(list.get(0));
console.log(list.get(4));
list.update(0, "001");
console.log(list.toString());
list.update(3, "003");
console.log(list.toString());
console.log(list.indexOf("222"));
list.removeAt(0);
console.log(list.backwardString());
