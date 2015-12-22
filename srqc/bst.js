var Node = require('./node');

function BST() {
    this.root = null;
}

BST.prototype = {
    insert: function(data) {
        var node = new Node(data, null, null);

        if(this.root == null) {
            this.root = node;
        } else {
            var current = this.root;
            var parent;

            while(true) {
                parent = current;

                if(data < current.data) {
                    current = current.left;
                    if(current == null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if(current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    },
    inOrder: function(node) {
        if(node != null) {
            this.inOrder(node.left);
            console.log(node.show() + '  ');
            this.inOrder(node.right)
        }
    },
    preOrder: function(node) {
        if(node != null) {
            console.log(node.show() + '  ');
            this.preOrder(node.left);
            this.preOrder(node.right)
        }
    },
    postOrder: function(node) {
        if(node != null) {
            this.postOrder(node.left);
            this.postOrder(node.right)
            console.log(node.show() + '  ');
        }
    },
    find: function(data) {
        var current = this.root;
        while(current != null) {
            if(current.data == data) {
                return current;
            } else if(current.data > data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    },
    getMax: function() {
        var current = this.root;
        while(current.right != null) {
            current = current.right;
        }

        return current.data;
    },
    getMin: function() {
        var current = this.root;
        while(current.left != null) {
            current = current.left;
        }

        return current.data;
    }


};

module.exports = BST;