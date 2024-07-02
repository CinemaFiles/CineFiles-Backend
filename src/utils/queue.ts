import { addWatchLater, removeWatchLater, getallWatchLater } from "../controllers/watchLater";

export class Cola {
    elementos: string[] = [];
    frente: number = 0;
    atras: number = 0;

    agregarElemento(userId: string, movieId: string) {
        this.elementos[this.atras] = movieId;
        this.atras++;
        addWatchLater(userId, movieId);
    }

    //quitar elemento
    //necesito el id del usuario
    quitarElemento(userId :string): string | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.elementos[this.frente];
        this.elementos[this.frente] = undefined as any;
        this.frente++;
        removeWatchLater(userId, element);
        return element;
    }

    verElementoDelFrente(): string | undefined{
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

    async obtenerTodos(userId: string): Promise<string[]>  {
        return await getallWatchLater(userId)
        //return this.elementos.slice(this.frente, this.atras);
    }
}