"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
class MovieNode {
    constructor(movie) {
        this.movie = movie;
        this.left = null;
        this.right = null;
    }
}
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
            this.insertRecursive(this.root, newNode);
        }
    }
    insertRecursive(node, newNode) {
        if (newNode.movie.title.toLowerCase() < node.movie.title.toLowerCase()) {
            if (node.left === null) {
                node.left = newNode;
            }
            else {
                this.insertRecursive(node.left, newNode);
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode;
            }
            else {
                this.insertRecursive(node.right, newNode);
            }
        }
    }
    search(title) {
        const results = [];
        if (!this.root)
            return results;
        this.searchRecursive(this.root, title.toLowerCase(), results);
        return results;
    }
    searchRecursive(node, title, results) {
        if (!node)
            return;
        // Búsqueda basada en coincidencia parcial e ignorando case
        if (node.movie.title.toLowerCase().includes(title)) {
            results.push(node.movie);
        }
        if (node.left !== null) {
            this.searchRecursive(node.left, title, results);
        }
        if (node.right !== null) {
            this.searchRecursive(node.right, title, results);
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
