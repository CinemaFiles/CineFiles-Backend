import { Movie } from "../schemas/movie";
import { TFIDF } from "./tf_idf"


export class Cola {
    elementos: Movie[] = [];
    frente: number = 0;
    atras: number = 0;

    agregarElemento(movie: Movie) {
        this.elementos[this.atras] = movie;
        this.atras++;
    }

    quitarElemento(): Movie | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.elementos[this.frente];
        this.elementos[this.frente] = undefined as any;
        this.frente++;
        return element;
    }

    verElementoDelFrente(): Movie | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elementos[this.frente];
    }

    isEmpty(): boolean {
        return this.frente === this.atras;
    }

    tamaño(): number {
        return this.atras - this.frente;
    }

    Limpiar(): void {
        this.elementos = [];
        this.frente = 0;
        this.atras = 0;
    }

    obtenerTodos(): Movie[] {
        return this.elementos.slice(this.frente, this.atras);
    }

    recommendMovies(queue: Cola, movie: Movie): Movie[] {
        const tfidf = new TFIDF();
        const movies = queue.obtenerTodos();
        
        if (movies.length === 0) {
            console.warn("La cola está vacía, no se pueden hacer recomendaciones.");
            return [];
        }

        movies.forEach((m, index) => {
            const doc = `${m.title} ${m.original_title} ${m.overview} ${m.genres}`;
            tfidf.addDocument(doc, index);
        });

        tfidf.calculateIDF();

        const movieDoc = `${movie.title} ${movie.original_title} ${movie.overview} ${movie.genres}`;
        
        const similarities = movies.map((m) => {
            const doc = `${m.title} ${m.original_title} ${m.overview} ${m.genres}`;
            const similarity = tfidf.getSimilarity(movieDoc, doc);
            return { movie: m, similarity };
        });

        similarities.sort((a, b) => b.similarity - a.similarity);

        const recommendedMovies = similarities.slice(0, 7).map(item => item.movie);
        
        return recommendedMovies;
    }
}