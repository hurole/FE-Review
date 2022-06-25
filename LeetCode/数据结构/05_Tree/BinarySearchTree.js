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
}

// test
let bst = new BinarySearchTree();
bst.insert(3);
bst.insert(4);
bst.insert(1);
bst.insert(2);
bst.insert(5);

console.log(bst);
// bst.preOrderTraverse();
// bst.inOrderTraverse();
bst.postOrderTraverse()
