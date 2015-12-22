var Stack = require('./stack');
var Queue = require('./queue');
var LinkedList = require('./linkedList');
var HashTable = require('./hashTable');
var BST = require('./bst');

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log("Inorder traversal: ");
// nums.inOrder(nums.root);
// console.log(nums.getMin(), nums.getMax());
console.log(nums.find(16));


var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];

var hTable = new HashTable();
 for (var i = 0; i < someNames.length; ++i) {
    hTable.put(someNames[i]);
 }
 hTable.showDistro();

return;
var cities = new LinkedList();
     cities.insert("Conway", "head");
     cities.insert("Russellville", "Conway");
     cities.insert("Carlisle", "Russellville");
     cities.insert("Alma", "Carlisle");
     cities.display();
     console.log('==============');
     // cities.remove("Carlisle");
     cities.dispReverse();

function distribute(nums, queues, n, digit) {
    for (var i = 0; i < n; ++i) {
        if (digit == 1) {
            queues[nums[i]%10].enqueue(nums[i]);
        } else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]); 
        }
    } 
}

function collect(queues, nums) {
    var i = 0;
    for (var digit = 0; digit < 10; ++digit) {
        while (!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}

function dispArray(arr) {
    for (var i = 0; i < arr.length; ++i) {
       console.log(arr[i] + " ");
    }
}

var queues = [];
for (var i = 0; i < 10; ++i) {
    queues[i] = new Queue();
}

var nums = [];
for (var i = 0; i < 10; ++i) {
    nums[i] = Math.floor(Math.floor(Math.random() * 101)); 
}

/*dispArray(nums);
distribute(nums, queues, 10, 1);
collect(queues, nums);
console.log('===============');
dispArray(nums);
console.log('===============');
distribute(nums, queues, 10, 10);
collect(queues, nums);
dispArray(nums);*/


function mulBase(num, base) {
    var s = new Stack();

    do {
        s.push(num % base);
        num = Math.floor(num /= base);
    } while(num > 0);

    var converted = '';
    while(s.length() > 0) {
        converted += s.pop();
    }

    return converted;
}

function isPalindrome(word) {
    var letters = word.split(''),
        s = new Stack();

    for(var i=0; i<letters.length; i++) {
        s.push(letters[i]);
    }

    var reversed = '';
    while(s.length() > 0) {
        reversed += s.pop();
    }

    if(word === reversed) {
        return true;
    }

    return false;

}

var num = 32;
var base = 2;
var newNum = mulBase(33, 2);

// console.log(isPalindrome('1001'));