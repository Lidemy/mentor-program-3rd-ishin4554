class Stack {
  constructor(arr = []) {
    this.arr = arr;
  }

  spop() {
    const pop = this.arr.slice(-1);
    this.arr = this.arr.slice(0, -1);
    console.log(this.arr);
    return pop[0];
  }

  spush(value) {
    this.arr = this.arr.concat([value]);
    console.log(this.arr);
  }
}

class Queue {
  constructor(arr = []) {
    this.arr = arr;
  }

  qpop() {
    const pop = this.arr.slice(0, 1);
    this.arr = this.arr.slice(1);
    console.log(this.arr);
    return pop[0];
  }

  qpush(value) {
    this.arr = this.arr.concat([value]);
    console.log(this.arr);
  }
}

class Deque {
  constructor(arr = []) {
    this.arr = arr;
  }

  pushFront(value) {
    this.arr = [value].concat(this.arr);
    console.log(this.arr);
  }

  pushBack(value) {
    this.arr = this.arr.concat([value]);
    console.log(this.arr);
  }

  popFront() {
    const pop = this.arr.slice(0, 1);
    this.arr = this.arr.slice(1);
    console.log(this.arr);
    return pop[0];
  }

  popBack() {
    const pop = this.arr.slice(-1);
    this.arr = this.arr.slice(0, -1);
    console.log(this.arr);
    return pop[0];
  }
}

class PriorityQueue {
  constructor(arr = []) {
    this.arr = arr;
  }

  insert(value) {
    this.arr = this.arr.concat([value]);
    console.log(this.arr);
  }

  extractMin() {
    const arr = [...this.arr];
    arr.sort((a, b) => a.key - b.key);
    return arr[0];
  }

  extractMax() {
    const arr = [...this.arr];
    arr.sort((a, b) => a.key - b.key);
    return arr[arr.length - 1];
  }
}

const stack = new Stack();
stack.spush(10);
stack.spush(5);
console.log(stack.spop()); // 5
console.log(stack.spop()); // 10

const queue = new Queue();
queue.qpush(1);
queue.qpush(2);
console.log(queue.qpop()); // 1
console.log(queue.qpop()); // 2

const deque = new Deque();
deque.pushFront(1);
deque.pushFront(2);
deque.pushBack(3);
deque.pushBack(4);
console.log(deque.popFront()); // 2
console.log(deque.popFront()); // 1
console.log(deque.popBack()); // 4
console.log(deque.popBack()); // 3

const pq = new PriorityQueue();
pq.insert({ key: 1, task: 'A' });
pq.insert({ key: 2, task: 'B' });
pq.insert({ key: 3, task: 'C' });

console.log(pq.extractMax().task); // C
console.log(pq.extractMin().task); // A
