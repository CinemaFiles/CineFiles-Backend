"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieNode = exports.MovieNodeLk = exports.BinarySearchTree = void 0;
class MovieNodeLk {
    constructor(movie) {
        this.movie = movie;
        this.next = null;
    }
}
exports.MovieNodeLk = MovieNodeLk;
class MovieNode {
    constructor(movie) {
        this.movie = movie;
        this.left = null;
        this.right = null;
    }
}
exports.MovieNode = MovieNode;
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(movie) {
        const newNode = new MovieNode(movie);
        if (!this.root) {
            this.root = newNode;
        }
        else {
            this._insertRecursive(this.root, newNode);
        }
    }
    _insertRecursive(node, newNode) {
        if (newNode.movie.title.toLowerCase() < node.movie.title.toLowerCase()) {
            if (node.left === null) {
                node.left = newNode;
            }
            else {
                this._insertRecursive(node.left, newNode);
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode;
            }
            else {
                this._insertRecursive(node.right, newNode);
            }
        }
    }
    search(title) {
        const results = [];
        if (!this.root)
            return results;
        this._searchRecursive(this.root, title.toLowerCase(), results);
        return results;
    }
    _searchRecursive(node, title, results) {
        if (!node)
            return;
        if (node.movie.title.toLowerCase().includes(title)) {
            results.push(node.movie.title);
        }
        if (node.left !== null) {
            this._searchRecursive(node.left, title, results);
        }
        if (node.right !== null) {
            this._searchRecursive(node.right, title, results);
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
