import express from "express";
import { allmovies } from "../controllers/movies";

const router = express.Router();

router.get("/all", (_req, res) => {
    allmovies().then((movies) => {
        res.json(movies);
    });
});

export default router;