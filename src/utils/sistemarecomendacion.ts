import { TFIDF } from './tf_idf';
import { Cola } from './queue';
import { listaHome } from '..';
import { Movie } from '../schemas/movie';
import { findMoviebyId } from '../controllers/movies';

export async function recommendMovies(user_id:string): Promise<Movie[]> {
    const queue = new Cola();
    const tfidf = new TFIDF();
    const indiceAleatorio = Math.floor(Math.random() * listaHome.peliculas.length);
    const movie: Movie = listaHome.peliculas[indiceAleatorio];

    const movies = await queue.obtenerTodos(user_id);

    // Obtener los detalles de las películas de forma asíncrona y esperar a que todas las promesas se resuelvan
    const moviesDetails = await Promise.all(movies.map(async (movieId) => {
        return findMoviebyId(movieId);
    }));

    // Ahora moviesDetails es un arreglo de objetos Movie (o null), no un arreglo de promesas
    moviesDetails.forEach((m, index) => {
        if (m) { // Asegúrate de que m no es null
            const doc = `${m.title} ${m.original_title} ${m.overview} ${m.genres}`;
            tfidf.addDocument(doc, index);
        }
    });
    
    tfidf.calculateIDF();
    
    const movieDoc = `${movie.title} ${movie.original_title} ${movie.overview} ${movie.genres}`;
    const similarities = moviesDetails.map((m) => {
        if (m) { // Asegúrate de que m no es null
            const doc = `${m.title} ${m.original_title} ${m.overview} ${m.genres}`;
            const similarity = tfidf.getSimilarity(movieDoc, doc);
            return { movie: { ...m, id: '' }, similarity }; // Add the 'id' property to the movie object
        }
        // Devuelve null para los casos donde m es null, estos serán filtrados después
        return null;
    }).filter(m => m); // Filtra los valores null
    
    similarities.sort((a, b) => {
        if (b && a) {
            return b.similarity - a.similarity;
        }
        return 0;
    });
    
    return similarities.slice(0, 7).map(item => item && item.movie) as Movie[];
}