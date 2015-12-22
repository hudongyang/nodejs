function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.empty = true;
}

Stack.prototype = {
    push: function(ele) {
        this.dataStore[this.top++] = ele;
    },
    pop: function() {
        return this.dataStore[--this.top];
    },
    peek: function() {
        return this.dataStore[this.top - 1];  
    },
    length: function() {
        return this.top;
    },
    clear: function() {
        this.top = 0;
    }
};

module.exports = Stack;