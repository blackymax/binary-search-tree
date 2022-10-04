class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    inOrderTraverse(node, cb) {
        if (node) {
            this.inOrderTraverse(node.left, cb);
            cb(node.data);
            this.inOrderTraverse(node.right, cb);
        }
    }

    preOrderTraverse(node, cb) {
        if (node) {
            cb(node.data);
            this.inOrderTraverse(node.left, cb);
            this.inOrderTraverse(node.right, cb);
        }
    }
    postOrderTraverse(node, cb) {
        if (node) {
            this.inOrderTraverse(node.left, cb);
            this.inOrderTraverse(node.right, cb);
            cb(node.data);
        }
    }
    search(node, data) {
        if (!node) {
            return null;
        } else if (data < node.data) {
            return this.search(node.left, data);
        } else if (data > node.data) {
            return this.search(node.right, data);
        } else {
            return node;
        }
    }

    getMinNode(node) {
        if (!node.left) {
            return node;
        } else {
            return this.getMinNode(node.left);
        }
    }

    getMaxNode(node) {
        if (!node.right) {
            return node;
        } else {
            return this.getMaxNode(node.right);
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, data) {
        if (!node) {
            return null;
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
            return node;
        } else {
            if (!node.left && !node.right) {
                node = null;
                return node;
            } 

            if (!node.left) {
                node = node.right
                return node
            } else if (!node.right) {
                node = node.left
                return node
            }

            const newNode = this.getMinNode(node.right);
            node.data = newNode.data;
            node.right = this.removeNode(node.right, newNode.data)
            return node
        }
    }
}
const bst = new BinarySearchTree();

// search

bst.insert(11);
console.log(bst);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(12);
bst.insert(13);
bst.insert(14);

// traverse

bst.inOrderTraverse(bst.root, (data) => console.log('in-order', data));
bst.postOrderTraverse(bst.root, (data) => console.log('post-order', data));
bst.preOrderTraverse(bst.root, (data) => console.log('pre-order', data));

// search

console.log(bst.search(bst.root, 9));
console.log(bst.getMinNode(bst.root));
console.log(bst.getMaxNode(bst.root));

// remove

bst.remove(12)
console.log(bst);