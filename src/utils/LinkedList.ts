import { MovieNodeLk } from "../schemas/movie";
import { Movie } from "../schemas/movie";

export class LinkedList{
    head: MovieNodeLk | null = null;
    tail: MovieNodeLk | null = null;
    constructor (){
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        if(this.head === null){
            return true;
        }
        else
        {
            return false;
        }
    }
    
    addFirst (movie: Movie){
        let newHead = new MovieNodeLk (movie);
        newHead.next = this.head;
        this.head = newHead;
        if(this.tail === null){
            this.tail = newHead;
        }
    }
    
    addLast(movie : Movie){
        if(!this.isEmpty()){
            let newTail = new MovieNodeLk(movie);
            if (this.tail !== null) {
                this.tail.next = newTail;
            } else {
                this.head = newTail;
            }
            this.tail = newTail;
        }
        else{
            this.addFirst(movie);
        }
    }

    removeFirst(){
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            if (this.head !== null) {
                this.head = this.head.next;
            }
        }

    }

    removeLast(){
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            let current = this.head;
            while(current !== null){
                if(current.next === this.tail){
                    current.next = null;
                    this.tail = current;
                }
                current = current.next;
            }
        }
    }

    
    show(){
        let current = this.head;
        while(current !== null){
            console.log(current.movie.title);
            current = current.next;
        }
    }
}
