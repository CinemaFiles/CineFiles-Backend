import { allmovies } from "../controllers/movies";
import { Movie } from "../schemas/movie";
import { ListaSimple } from "../utils/ListaSimple";

export const lista_10 = new ListaSimple();
export const lista_100 = new ListaSimple();
export const lista_1000 = new ListaSimple();
export const lista_10000 = new ListaSimple();

async function rellenarListas(){
    const movies = await allmovies();

    movies.slice(0,10).forEach((movie: Movie) => {
        lista_10.peliculas.push(movie);
    });

    movies.slice(0,100).forEach((movie: Movie) => {
        lista_100.peliculas.push(movie);
    });

    movies.slice(0,1000).forEach((movie: Movie) => {
        lista_1000.peliculas.push(movie);
    })

    movies.slice(0,10000).forEach((movie: Movie) => {
        lista_10000.peliculas.push(movie);
    })
}

async function ordenarPeliculas(){
    await rellenarListas();

    const iteraciones = 10000;
    let tiempoTotal = {
        lista_10: 0,
        lista_100: 0,
        lista_1000: 0,
        lista_10000: 0
    };

    for(let i=0; i<iteraciones; i++){
        let inicioT, finT;

        let clonLista_10 = new ListaSimple();
        clonLista_10.peliculas = JSON.parse(JSON.stringify(lista_10.peliculas));
        
        let clonLista_100 = new ListaSimple();
        clonLista_100.peliculas = JSON.parse(JSON.stringify(lista_100.peliculas));
        
        let clonLista_1000 = new ListaSimple();
        clonLista_1000.peliculas = JSON.parse(JSON.stringify(lista_1000.peliculas));    
        
        let clonLista_10000 = new ListaSimple();
        clonLista_10000.peliculas = JSON.parse(JSON.stringify(lista_10000.peliculas));

        inicioT = new Date().getTime();
        clonLista_10.ordenarPeliculas();
        finT = new Date().getTime();
        tiempoTotal.lista_10 += (finT - inicioT);

        inicioT = new Date().getTime();
        clonLista_100.ordenarPeliculas();
        finT = new Date().getTime();
        tiempoTotal.lista_100 += (finT - inicioT);

        inicioT = new Date().getTime();
        clonLista_1000.ordenarPeliculas();
        finT = new Date().getTime();
        tiempoTotal.lista_1000 += (finT - inicioT);

        inicioT = new Date().getTime();
        clonLista_10000.ordenarPeliculas();
        finT = new Date().getTime();
        tiempoTotal.lista_10000 += (finT - inicioT);
    }
    
    console.log(lista_10.peliculas.length)
    console.log(`Promedio de tiempo de ordenación para una lista de 10 peliculas: ${tiempoTotal.lista_10 / iteraciones} ms`);
    console.log(lista_100.peliculas.length)
    console.log(`Promedio de tiempo de ordenación para una lista de 100 peliculas: ${tiempoTotal.lista_100 / iteraciones} ms`);
    console.log(lista_1000.peliculas.length)
    console.log(`Promedio de tiempo de ordenación para una lista de 1000 peliculas: ${tiempoTotal.lista_1000 / iteraciones} ms`);
    console.log(lista_10000.peliculas.length)
    console.log(`Promedio de tiempo de ordenación para una lista de 10000 peliculas: ${tiempoTotal.lista_10000 / iteraciones} ms`); 
}

ordenarPeliculas().then(() => {
    console.log('Tiempos calculados exitosamente');
}).catch(error => {
    console.error('Error al calcular los tiempos:', error);
});