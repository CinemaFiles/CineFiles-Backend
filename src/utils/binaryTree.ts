import { Movie } from '../schemas/movie';

class MovieNode {
  movie: Movie;
  left: MovieNode | null;
  right: MovieNode | null;
  height: number;

  constructor(movie: Movie) {
    this.movie = movie;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
  private root: MovieNode | null;

  constructor() {
    this.root = null;
  }

  private getHeight(node: MovieNode | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: MovieNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private rightRotate(y: MovieNode): MovieNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  private leftRotate(x: MovieNode): MovieNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  private insertNode(node: MovieNode | null, movie: Movie): MovieNode {
    if (!node) {
      return new MovieNode(movie);
    }

    if (movie.title.toLowerCase() < node.movie.title.toLowerCase()) {
      node.left = this.insertNode(node.left, movie);
    } else {
      node.right = this.insertNode(node.right, movie);
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balance = this.getBalance(node);

    // Caso Izquierda Izquierda
    if (balance > 1 && movie.title.toLowerCase() < node.left!.movie.title.toLowerCase()) {
      return this.rightRotate(node);
    }

    // Caso Derecha Derecha
    if (balance < -1 && movie.title.toLowerCase() > node.right!.movie.title.toLowerCase()) {
      return this.leftRotate(node);
    }

    // Caso Izquierda Derecha
    if (balance > 1 && movie.title.toLowerCase() > node.left!.movie.title.toLowerCase()) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Caso Derecha Izquierda
    if (balance < -1 && movie.title.toLowerCase() < node.right!.movie.title.toLowerCase()) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  insert(movie: Movie): void {
    this.root = this.insertNode(this.root, movie);
  }

  search(title: string): Movie[] {
    const results: Movie[] = [];
    if (!this.root) return results;

    this.searchRecursive(this.root, title.toLowerCase(), results);

    return results;
  }

  private searchRecursive(node: MovieNode | null, title: string, results: Movie[]): void {
    if (!node) return;

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

  searchUnique(title: string): Movie | null {
    return this.searchRecursiveUnique(this.root, title.toLowerCase());
  }

  private searchRecursiveUnique(node: MovieNode | null, title: string): Movie | null {
    if (!node) return null;

    if (node.movie.title.toLowerCase().includes(title)) {
      return node.movie;
    }

    if (title < node.movie.title.toLowerCase()) {
      return this.searchRecursiveUnique(node.left, title);
    } else {
      return this.searchRecursiveUnique(node.right, title);
    }
  }
}
