import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const API_KEY = '76729a413d0d3b3e910be33710905309';
const URL_FIND_MOVIE = 'https://api.themoviedb.org/3/movie/';

router.get('/:id/locations', async (req: Request, res: Response) => {
  const movieId = req.params.id;
  const url = `${URL_FIND_MOVIE}${movieId}/watch/providers?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la información de la película.' });
  }
});

export default router;
