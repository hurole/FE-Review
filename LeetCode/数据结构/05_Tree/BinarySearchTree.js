class Node {
  constructor(key) {
    this.key = key || null;
    this.left = null;
    this.right = null;
  }
}

/**
 * @description 二叉搜索树BST 特性是，二叉树的所有节点满足左节点小于右节点
 */
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(key) {
    let node = new Node(key);
    // 空树直接当做根节点root
    if (this.root === null) {
      this.root = node;
      return true;
    }
    // 非空树
    this.insertNode(this.root, node);
  }

  insertNode(node, newNode) {
    if (node.key === newNode.key) {
      node = newNode;
      return true;
    }
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode;
        return true;
      }
      this.insertNode(node.left, newNode);
    }
    if (node.key < newNode.key) {
      if (node.right === null) {
        node.right = newNode;
        return true;
      }
      this.insertNode(node.right, newNode);
    }
  }
  //  前序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }
  preOrderTraverseNode(node) {
    if (node === null) {
      return false;
    }
    console.log(node.key);
    this.preOrderTraverseNode(node.left);
    this.preOrderTraverseNode(node.right);
  }
  //  中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  inOrderTraverseNode(node) {
    if (node === null) {
      return false;
    }
    this.inOrderTraverseNode(node.left);
    console.log(node.key);
    this.inOrderTraverseNode(node.right);
  }
  // 后续遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  postOrderTraverseNode(node) {
    if (node === null) {
      return false;
    }
    this.postOrderTraverseNode(node.left);
    this.postOrderTraverseNode(node.right);
    console.log(node.key);
  }
  // 最小值
  min() {
    if (this.root === null) {
      return false;
    }
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.key;
  }
  // 最大值
  max() {
    if (this.root === null) {
      return false;
    }
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.key;
  }

  // 搜索
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    // 空树查找失败
    if (node === null) {
      return false;
    }
    if (node.key === key) {
      return node;
    }
    if (key < node.key) {
      return this.searchNode(node.left, key);
    }
    if (key > node.key) {
      return this.searchNode(node.right, key);
    }
  }
  // 删除
  remove(key) {
    // 要被删除的节点
    let current = this.root;
    // 要被删除节点的父节点
    let parent = null;
    // 要被删除的节点是否为父节点的左子节点
    let isLeftChild = false;
    while (current && current.key !== key) {
      if (key < current.key) {
        parent = current;
        current = current.left;
        isLeftChild = true;
      } else {
        parent = current;
        current = current.right;
        isLeftChild = false;
      }
    }
    // 树上不存在该节点，返回false
    if (!current) {
      return false;
    }
    // 要被删除的节点为叶子节点，直接删除
    if (current.left === null && current.right === null) {
      if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return true;
    }
    // 要被删除的节点只存在一个子节点
    if (current.left === null || current.right === null) {
      // 被删除的节点含有一个左子节点，左子节点替换被删除的节点
      if (current.left) {
        if (isLeftChild) {
          parent.left = current.left;
        } else {
          parent.right = current.left;
        }
        return true;
      }
      // 被删除的节点含有一个右子节点，右子节点替换被删除的节点
      if (current.right) {
        if (isLeftChild) {
          parent.left = current.right;
        } else {
          parent.right = current.right;
        }
        return true;
      }
    }
    // 要被删除的节点两个子节点都存在，需要找到前驱或者后继
    let successor = this.getSuccessor(current);
    if (current === this.root) {
      this.root = successor;
    } else if (isLeftChild) {
      parent.left = successor;
    } else {
      parent.right = successor;
    }
    // 后继替换被删除节点的位置，所以要用被删除节点的左子树替换后继的左子树，被删除节点的右子树替换后继的右子树
    successor.left = current.left;
    return true;
  }

  // 查找指定节点的后继节点
  getSuccessor(node) {
    let successor = node.right;
    let successorParent = node;
    // 后继节点只可能存在右子节点，或者没有子节点。假设如果存在左子节点，根据二叉搜素树的规则左子节点才为后继节点
    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }
    // 判断寻找到的后续节点是否直接就是要删除节点的 right
    if (successor !== node.right) {
      successorParent.left = successor.right;
      successor.right = node.right;
    }
    return successor;
  }
}

// test
let bst = new BinarySearchTree();
bst.insert(10);
bst.insert(8);
bst.insert(5);
bst.insert(7);
bst.insert(9);
bst.insert(15);
bst.insert(13);
bst.insert(16);
bst.insert(1);
bst.insert(12);
bst.insert(17);
// 结果为：
//        10
//      /   \
//     8     15
//    / \    / \
//    5  9  13  16
//   / \    /     \
//   1  7  12      17

// bst.preOrderTraverse();
bst.inOrderTraverse();
// bst.postOrderTraverse();
console.log("max:", bst.max());
console.log("min:", bst.min());
// 搜索
console.log("search5", bst.search(5));
console.log("search4", bst.search(4));
console.log("search9", bst.search(9));
// 删除不存在的节点
// let s = bst.remove(14);
// 删除叶子节点
// bst.remove(17);
// 删除只存在一个子节点的节点
// let s = bst.remove(13);
// 删除两个子节点都存在的节点
let s = bst.remove(10);

console.log("------", s);
bst.inOrderTraverse();
