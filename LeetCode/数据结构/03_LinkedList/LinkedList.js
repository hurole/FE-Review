class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(data) {
    let node = new Node(data);
    if (this.length === 0) {
      this.head = node;
      this.length++;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
    this.length++;
  }

  insert(position, data) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new Node(data);
    // 插入位置的索引为0
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
      return;
    }
    // 查找到索引为position的节点和索引为position-1的节点，然后将新节点插入到这两个节点的中间
    let index = 0;
    let current = this.head;
    let pre = null;
    while (index++ < position) {
      pre = current;
      current = current.next;
    }
    node.next = current;
    pre.next = node;
    this.length++;
    return true;
  }

  update(position, data) {
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

  get(position) {
    if (position < 0 || position > this.length - 1) {
      return null;
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current.next;
      index++;
    }
    return current.data;
  }

  indexOf(data) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  removeAt(position) {
    // 越界
    if (position < 0 || position > this.length - 1) {
      return false;
    }
    // 移除索引为0的节点
    if (position === 0) {
      this.head = this.head.next;
      this.length--;
      return true;
    }

    let current = this.head;
    let pre = null;
    let index = 0;
    while (index++ < position) {
      pre = current;
      current = current.next;
    }
    pre.next = current.next;
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
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " ";
      current = current.next;
    }
    return result;
  }
}

class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next || null;
  }
}
// 测试一下
let list = new LinkedList();
list.append("123");
list.append("456");
list.append("789");
list.insert(0, "000");
list.insert(4, "999");
list.insert(3, "555");
list.update(5, "666");
// console.log(list.get(5));
console.log(list.toString());
// console.log(list.removeAt(0));
console.log(list.remove("666"));
console.log(list.toString());
console.log(list.size());
// console.log(list.indexOf("456"));

module.exports = LinkedList;
