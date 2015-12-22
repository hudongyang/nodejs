// 2.3
/*var obj = {
    a: ['h', 'e', 'l', 'l', 'o'],
    toWord: function() {
        console.log(this.a.join(''));
    }
};

obj.toWord();*/

// 2.2
/*var words = ['hello', 'word', 'javascript']

console.log(words.sort());
console.log(words.sort().reverse());*/

/* 2.1 */
/*function Score() {
    this.scores = [];
}

Score.prototype = {
    add: function(s) {
        this.scores.push(s);
    },

    average: function() {
        var sum = this.scores.reduce(function(total, current) {
            return total + current;
        });

        return (sum / this.scores.length).toFixed(2);
    }
};

var score = new Score();
score.add(80);
score.add(90);
score.add(70);
score.add(60);
score.add(30);

console.log(score.average());*/