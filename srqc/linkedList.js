var Node = require('./node');

function LinkedList() {
    this.head = new Node('head');
}

the the
the theolss

LinkedList.prototype = {
    insert: function(newEle, item) {
        var newNode = new Node(newEle);
        var current = this.find(item);

        newNode.next = current.next;
        current.next = newNode;
        newNode.prev = current;
    },
    remove: function(item) {
        var current = this.find(item);
        if(current.next != null) {
            current.prev.next = current.next;
            current.next.prev = current.prev;
            current.next = null;
            current.prev = null;
        }
    },
    display: function() {
        var current = this.head;
        while(current.next != null) {
            console.log(current.next.ele);
            current = current.next;
        }
    },
    dispReverse: function() {
        var currNode = this.head;
        currNode = this.findLast();
        while (!(currNode.prev == null)) {
           console.log(currNode.ele);
           currNode = currNode.prev;
        }
    },
    find: function(item) {
        var current = this.head;
        while(current.ele != item) {
            current = current.next;
        }

        return current;
    },
    /*findPrevious: function(item) {
        var current = this.head;
        while(current.next != null && current.next.ele != item) {
            current = current.next;
        }

        return current;
    },*/
    findLast: function() {
        var current = this.head;
        while(current.next != null) {
            current = current.next;
        }

        return current;
    }
};

module.exports = LinkedList;