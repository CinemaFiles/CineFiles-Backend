import express from "express";
import { allmovies } from "../controllers/movies";
import { ratemovies } from "../controllers/findMoviesRate";

const router = express.Router();

router.get("/all", (_req, res) => {
    allmovies().then((movies) => {
        res.json(movies);
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

export default router;