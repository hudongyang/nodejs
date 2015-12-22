function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype.show = function() {
    return this.data;
};

module.exports = Node;