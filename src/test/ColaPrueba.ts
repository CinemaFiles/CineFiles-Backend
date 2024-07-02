import { allmovies } from "../controllers/movies";
import { Movie } from "../schemas/movie";
import { Cola } from "../utils/queue";
import { performance } from 'perf_hooks';

export const lista_10 = new Cola();
export const lista_100 = new Cola();
export const lista_1000 = new Cola();
export const lista_10000 = new Cola();


async function rellenarListas(){
    const movies = await allmovies();

    movies.slice(0,10).forEach((movie: Movie) => {
        lista_10.agregarElemento(movie);
    });

    movies.slice(0,100).forEach((movie: Movie) => {
        lista_100.agregarElemento(movie);
    });

    movies.slice(0,1000).forEach((movie: Movie) => {
        lista_1000.agregarElemento(movie);
    })

    movies.slice(0,10000).forEach((movie: Movie) => {
        lista_10000.agregarElemento(movie);
    })
}
async function tfidf(){
    await rellenarListas();
    const peli = JSON.parse(JSON.stringify(lista_10000.elementos[10]));

    const iteraciones = 100;
    let tiempoTotal = {
        lista_10: 0,
        lista_100: 0,
        lista_1000: 0,
        lista_10000: 0
    };

    for(let i=0; i<iteraciones; i++){
        let inicioT, finT;

        inicioT = performance.now()
        lista_10.recommendMovies(lista_10, peli);
        finT = performance.now()
        tiempoTotal.lista_10 += (finT - inicioT);

        inicioT = performance.now()
        lista_100.recommendMovies(lista_100, peli);
        finT = performance.now()
        tiempoTotal.lista_100 += (finT - inicioT);

        inicioT = performance.now()
        lista_1000.recommendMovies(lista_1000, peli);
        finT = performance.now()
        tiempoTotal.lista_1000 += (finT - inicioT);

        inicioT = performance.now()
        lista_10000.recommendMovies(lista_10000,peli);
        finT = performance.now()
        tiempoTotal.lista_10000 += (finT - inicioT);
    }
    
    console.log(`Resultados de los tiempos promedios al ejecutar el algoritmo de recomendaciones en ${iteraciones} iteraciones`)
    console.log(`Promedio de tiempo para la recomendacion para una lista de 10 peliculas: ${tiempoTotal.lista_10 / iteraciones} ms`);
    console.log(`Promedio de tiempo para la recomendacion para una lista de 100 peliculas: ${tiempoTotal.lista_100 / iteraciones} ms`);
    console.log(`Promedio de tiempo para la recomendacion para una lista de 1000 peliculas: ${tiempoTotal.lista_1000 / iteraciones} ms`);
    console.log(`Promedio de tiempo para la recomendacion para una lista de 10000 peliculas: ${tiempoTotal.lista_10000 / iteraciones} ms`);    
}

tfidf().then(() => {
    console.log('Tiempos calculados exitosamente');
}).catch(error => {
    console.error('Error al calcular los tiempos:', error);
});