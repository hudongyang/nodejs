function HashTable() {
    this.table = new Array(137);
}

HashTable.prototype = {
    simpleHash: function(data) {
        var total = 0;
        const H = 37;
        for(var i=0; i<data.length; i++) {
            total += H * total + data.charCodeAt(i);
        }

        total = total % this.table.length;

        if(total < 0) {
            total = this.table.length; - 1;
        }

        return parseInt(total);
    },
    showDistro: function() {
        var n = 0;
        for (var i = 0; i < this.table.length; ++i) { 
            if (this.table[i] != undefined) {
                console.log(i + ": " + this.table[i]);
            }
        }
    },
    put: function(key, data) {
        var pos = this.simpleHash(key);
        this.table[pos] = data;
    },
    get: function(key) {
        return this.table[this.simpleHash(key)];
    }
};

module.exports = HashTable;