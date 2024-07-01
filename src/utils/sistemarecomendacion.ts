import { TFIDF } from './tf_idf';
import { Cola } from './queue';
import { Movie } from '../schemas/movie';

export function recommendMovies(queue: Cola, movie: Movie): Movie[] {
    const tfidf = new TFIDF();
    const movies = queue.obtenerTodos();

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

    return similarities.slice(0, 7).map(item => item.movie); 
}