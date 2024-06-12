class Cola<T>{
    private items: T[];

    constructor(){
        this.items = [];
    }

    añadir(item: T): void{
        this.items.push(item)
    }
    quitar(): T | undefined {
        return this.items.shift();
    }

    ver(): T | undefined {
        return this.items[0];
    }

    vacio(): boolean {
        return this.items.length === 0;
    }

    cantidad(): number {
        return this.items.length;
    }

    limpiar(): void {
        this.items = [];
    }
}

class WatchLater<T> {
    private stack: Cola<T>;

    constructor() {
        this.stack = new Cola<T>();
    }

    añadirAVerMasTarde(item: T): void {
        this.stack.añadir(item);
    }

    eliminarPelicula(): T | undefined {
        return this.stack.quitar();
    }

    verUltimo(): T | undefined {
        return this.stack.ver();
    }

    estaVacio(): boolean {
        return this.stack.vacio();
    }

    obtenerNumeroElementos(): number {
        return this.stack.cantidad();
    }
}