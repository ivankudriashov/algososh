import { IStack, IQueue, ILinkedList } from "../../types/classes"

export class Stack<T> implements IStack<T> {
    container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      this.container.pop()
    };
  
    delete = (): void => {
      this.container = []
    }
  
    peak = (): T | null => {
      if(this.container.length !== 0) {
        return this.container[this.container.length - 1]
      } else {
        return null;
      }
    };
  
    getSize = () => this.container.length;
}
  
export class Queue<T> implements IQueue<T> {
    container: (T | null)[] = [];
    head = 0;
    tail = 0;
    private readonly size: number = 0;
    length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }
  
      if(this.tail === this.size-1 || (this.length === 0 && this.tail === this.head)){
        this.tail = 0
      } else {
        this.tail++;
      }
      this.length++;
      this.container[this.tail] = item;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
  
      delete(this.container[this.head])
      if(this.head === this.size-1){
        this.head = 0;
      } else {
        this.head++;
      }
      this.length--;
    };
  
    delete = (): void => {
      for(let i = 0; i < this.container.length; i++) {
        delete(this.container[i])
      }
      this.head = 0;
      this.tail = 0;
      this.length = 0;
    }
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      
      if(this.isEmpty()){
        return null;
      } else {
        return this.container[this.head];
      }
    };
  
    isEmpty = () => this.length === 0;
}

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
  
export class LinkedList<T> implements ILinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAt(element: T, index: number) {
        if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
        } else {
        const node = new Node(element);

        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else if(this.head) {
            let curr = this.head;
            let currIndex = 0;

            while(currIndex + 1 < index && curr.next) {
            curr = curr.next;
            currIndex++;
            }
            
            let trap = curr.next;

            curr.next = node
            node.next = trap
            this.tail = curr.next
        }
        this.size++;
        }
    }

    deleteAt(index: number) {
        if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
        } else {
        if (index === 0) {
            let current = this.head;
            if(current !== null){
            this.head = current.next
            }
        } else if(index === this.size - 1) {
            if (this.head === null) {
            throw new Error("stack is empty");
            }
        
            let current = this.head;
            let prev = null;
        
            while (current.next) {
                prev = current
                current = current.next;
            }
        
            if(prev) {
                prev.next = null
                this.tail = prev
            }
        } else if(this.head) {
            let curr = this.head;
            let currIndex = 0;

            while(currIndex + 1 < index && curr.next) {
            curr = curr.next;
            currIndex++;
            }
            let trap = curr.next;
            if(trap) {
            curr.next = trap.next
            }
        }
        this.size--;
        }
    }

    prepend(element: T) {
        const node = new Node(element);
        let current;

        if (this.head === null) {
        this.head = node;
        this.tail = node;
        } else {
        current = this.head;
        
        this.head = new Node(element);
        
        this.head.next = current
        }
        this.size++;
    }

    append(element: T) {
        const node = new Node(element);
        let current;

        if (this.head === null) {
        this.head = node;
        this.tail = node;
        } else {
        current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = node;
        this.tail = current.next;
        }
        this.size++;
    }

    shift() {
        let current = this.head;
        if(current !== null){
        this.head = current.next

        this.size--;
        }
    }

    pop() {
        if (this.head === null) {
        throw new Error("stack is empty");
        }

        let current = this.head;
        let prev = null;

        while (current.next) {
            prev = current
            current = current.next;
        }

        if(prev) {
            prev.next = null
            this.tail = prev
            this.size--;
        }
    };

    getSize() {
        return this.size;
    }

    getArray() {
        let curr = this.head;
        let res = [];
        while (curr) {
        res.push(curr.value);
        curr = curr.next;
        }
        return res
    }

    print() {
        let curr = this.head;
        let res = '';
        while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
        }
        console.log(res);
    }
}
