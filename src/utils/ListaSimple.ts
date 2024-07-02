import { Movie } from "../schemas/movie";

export class ListaSimple{
    peliculas: Movie[] = [];

    ordenarPeliculas(): void{
        this.peliculas = this.mergeSort(this.peliculas);
    }

    private mergeSort(array: Movie[]): Movie[]{
        if(array.length <= 1){
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    private merge(left: Movie[], right: Movie[]): Movie[]{
        let arrayOrdenado: Movie[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while(leftIndex < left.length && rightIndex < right.length){
            if(left[leftIndex].title.toLowerCase() < right[rightIndex].title.toLowerCase()){
                arrayOrdenado.push(left[leftIndex]);
                leftIndex++;
            }else{
                arrayOrdenado.push(right[rightIndex]);
                rightIndex++;
            }
        }

        while(leftIndex < left.length){
            arrayOrdenado.push(left[leftIndex]);
            leftIndex++;
        }

        while(rightIndex < right.length){
            arrayOrdenado.push(right[rightIndex]);
            rightIndex++;
        }

        return arrayOrdenado;
    }

}

