import { Movie } from "../schemas/movie";

export class Cola{
    elementos: Movie[] = [];
    frente: number = 0;
    atras: number = 0;

    agregarElemento(movie: Movie){
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

    verElementoDelFrente():  | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        console.log(this.elementos[this.frente]);
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
}