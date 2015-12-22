function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
}

List.prototype = {
    // 给列表添加元素
    append: function(ele) {
        this.dataStore[this.listSize++] = ele;
    },
    // 从列表中删除元素
    remove: function(ele) {
        var index = this._find(ele);

        if(index != -1) {
            this.dataStore.splice(index, 1);
            this.listSize--;
            return true;
        }

        return false;
    },
    // 向列表中插入一个元素
    insert: function(ele, after) {
        var index = this._find(ele);

        if(index != -1) {
            this.dataStore.splice(index + 1, 0, after);
            this.listSize++;
            return true;
        }

        return false;
    },
    // 清空列表中所有的元素
    clear: function() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    },
    // 判断给定值是否在列表中
    contains: function(ele) {
        return this._find(ele) !== -1;
    },
    // 
    front: function() {
        this.pos = 0;
    },
    end: function() {
        this.pos = this.listSize - 1;
    },
    next: function() {
        if(this.pos < this.listSize) {
            this.pos++;
        }
    },
    prev: function() {
        if(this.pos >= 0) {
            this.pos--;
        }
    },
    currPos: function() {
        return this.pos;
    },
    moveTo: function(pos) {
        this.pos = pos;
    },
    getEle: function() {
        return this.dataStore[this.pos];
    },
    // 列表中有多少个元素
    length: function() {
        return this.listSize;
    },
    // 显示列表中的元素
    toString: function() {
        return this.dataStore;
    },
    // 在列表中查找某一元素
    _find: function(ele) {
        for(var i=0, l=this.dataStore.length; i<l; i++) {
            if(this.dataStore[i] === ele) {
                return i;
            }
        }
        return -1;
    }
};

module.exports = List;