interface Movie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  Poster: string;
  Backdrop: string;
  popularity: number;
  release_date: string;
  genres: string;
}


class MovieNodeLk{
  movie:Movie;
  next:MovieNodeLk|null;

  constructor(movie: Movie){
    this.movie = movie;
    this.next = null;
  }
}
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

class BinarySearchTree {
  private root: MovieNode | null;

  constructor() {
    this.root = null;
  }

  insert(movie: Movie): void {
    const newNode = new MovieNode(movie);
    if (!this.root) {
      this.root = newNode;
    } else {
      this._insertRecursive(this.root, newNode);
    }
  }

  private _insertRecursive(node: MovieNode, newNode: MovieNode): void {
    if (newNode.movie.title.toLowerCase() < node.movie.title.toLowerCase()) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertRecursive(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertRecursive(node.right, newNode);
      }
    }
  }

  search(title: string): string[] {
    const results: string[] = [];
    if (!this.root) return results;

    this._searchRecursive(this.root, title.toLowerCase(), results);

    return results;
  }

  private _searchRecursive(node: MovieNode, title: string, results: string[]): void {
    if (!node) return;

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

export { BinarySearchTree, Movie , MovieNodeLk, MovieNode};

