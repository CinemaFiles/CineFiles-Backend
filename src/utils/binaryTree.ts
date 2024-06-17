import { Movie } from '../schemas/movie';

class MovieNode {
  movie: Movie;
  left: MovieNode | null;
  right: MovieNode | null;

  constructor(movie: Movie) {
    this.movie = movie;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  private root: MovieNode | null;

  constructor() {
    this.root = null;
  }

  insert(movie: Movie): void {
    const newNode = new MovieNode(movie);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertRecursive(this.root, newNode);
    }
  }

  private insertRecursive(node: MovieNode, newNode: MovieNode): void {
    if (newNode.movie.title.toLowerCase() < node.movie.title.toLowerCase()) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertRecursive(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertRecursive(node.right, newNode);
      }
    }
  }

  search(title: string): Movie[] {
    const results: Movie[] = [];
    if (!this.root) return results;

    this.searchRecursive(this.root, title.toLowerCase(), results);

    return results;
  }

  private searchRecursive(node: MovieNode, title: string, results: Movie[]): void {
    if (!node) return;

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
