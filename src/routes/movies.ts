import express from "express";
import { allmovies } from "../controllers/movies";
import { ratemovies } from "../controllers/findMoviesRate";
import { BinarySearchTree } from "../utils/binaryTree";
import { ListaSimple } from "../utils/ListaSimple";
import { Cola } from "../utils/queue";
import { Movie } from "../schemas/movie";

const router = express.Router();
const watchLaterQueue = new Cola();

router.get("/all", (_req, res) => {
    allmovies().then((movies) => {
        res.json(movies);
    });
});

router.get("/filtered", (req, res) => {
    const filter = req.body.filter;
    const binaryTree = new BinarySearchTree();

    allmovies().then((movies) => {
        movies.forEach((movie: Movie) => {
            binaryTree.insert(movie);
        });
        
        const result = binaryTree.search(filter);
        res.json(result);
    });

});

router.get("/:rate", async (req, res) => {
    const {rate} = req.params;
    const popularity = parseFloat(rate);

    if(isNaN(popularity)){
        return res.status(400).send({rate:"Valor de rate no válido"});
    }

    const result = await ratemovies(popularity);

    if(result.error){
        return res.status(result.status).send({error: result.error});
    }

    res.status(result.status).json(result.movies);
    
    return
});

router.post("/watchlater/add", (req, res) => {
    const movie: Movie = req.body.movie;
    watchLaterQueue.agregarElemento(movie);
    res.status(200).send({ message: "Movie added to watch later queue." });
});

router.post("/watchlater/remove", (_req, res) => {
    const removedMovie = watchLaterQueue.quitarElemento();
    if (removedMovie) {
        res.status(200).send({ message: "Movie removed from watch later queue.", movie: removedMovie });
    } else {
        res.status(404).send({ message: "No movies in watch later queue." });
    }
});

router.get("/watchlater", (_req, res) => {
    const movies = watchLaterQueue.obtenerTodos();
    res.status(200).json(movies);
});


export default router;