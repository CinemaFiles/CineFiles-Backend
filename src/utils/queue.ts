import { addWatchLater, removeWatchLater, getallWatchLater } from "../controllers/watchLater";

export class Cola {
    elementos: string[] = [];
    frente: number = 0;
    atras: number = 0;

    async agregarElemento(userId: string, movieId: string) {
        this.elementos = await getallWatchLater(userId);
        this.elementos[this.atras] = movieId;
        this.atras++;
        addWatchLater(userId, movieId);
    }

    //quitar elemento
    //necesito el id del usuario
    async quitarElemento(userId :string): Promise<string | undefined> {
        this.elementos = await getallWatchLater(userId);
        if (await this.isEmpty(userId)) {
            return undefined;
        }
        const element = this.elementos[this.frente];
        this.elementos[this.frente] = undefined as any;
        this.frente++;
        console.log(element)
        removeWatchLater(userId, element);
        return element;
    }

    async verElementoDelFrente(userId :string): Promise<string | undefined>{
        this.elementos = await getallWatchLater(userId);
        if (await this.isEmpty(userId)) {
            return undefined;
        }
        return this.elementos[this.frente];
    }

    async isEmpty(userId:string): Promise<boolean> {
        this.elementos = await getallWatchLater(userId);
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
        this.elementos = await getallWatchLater(userId);
        console.log(this.elementos)
        console.log('archivo colas')
        return this.elementos;
        //return this.elementos.slice(this.frente, this.atras);
    }
}