import { Movie } from "../schemas/movie";

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
}