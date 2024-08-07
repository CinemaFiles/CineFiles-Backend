import express from "express";
import { allmovies } from "../controllers/movies";
import { Cola } from "../utils/queue";
import {  Movie } from "../schemas/movie";
import { listaHome, binarytree } from "..";
import { findMoviebyId } from "../controllers/movies";
import { cosineSimilarity } from "../utils/recomendation";
import { recommendMovies } from "../utils/sistemarecomendacion";
//import { recommendMovies } from "../utils/sistemarecomendacion";

const router = express.Router();
const watchLaterQueue = new Cola();

router.get("/all", (_req, res) => {
    allmovies().then((movies) => {
        res.json(movies);
    });
});

router.get("/recomendation/:id", (req, res) => {
    const {id} = req.params;
    findMoviebyId(id).then(movie =>{
      console.log(movie);
      let similitudes: { movie: Movie; similitud: number; }[] = [];
        listaHome.peliculas.forEach(element =>{
        const similitud = cosineSimilarity(movie?.title as string, element?.title as string )
        similitudes.push({ movie: element, similitud:similitud});
        })
        similitudes.sort((a,b) => b.similitud - a.similitud);
        console.log(similitudes.slice(1, 7));
        res.json(similitudes.slice(1, 7));
    }).catch(error =>{
      console.log(error);
    })
})

router.get("/home", (req, res)=>{
    const index :number = Number(req.query.index);
    res.json(listaHome.peliculas.slice(21*(index-1),21*index));
});

router.get('/data/:id', (req, res)=>{
  const {id} = req.params;
  findMoviebyId(id).then(movie => {
    console.log(movie);
    res.status(200).json(movie);
  }).catch(error => {
    console.log(error);
    res.status(400).send({message: "Movie not found."});
  })
})

router.get('/info_movie/:id', (req, res) =>{
    const {id} = req.params;
    findMoviebyId(id)
    .then(movie =>{
        console.log(movie);
        let similitudes: { movie: Movie; similitud: number; }[] = [];
        listaHome.peliculas.forEach(element =>{
        const similitud = cosineSimilarity(movie?.title + ' ' + movie?.original_title + ' '+ movie?.overview as string, element?.title + ' ' + element?.original_title + ' ' + movie?.overview   as string )
        similitudes.push({ movie: element, similitud:similitud});
      })
        similitudes.sort((a,b) => b.similitud - a.similitud);
        console.log(similitudes.slice(1, 7));
//====================================================================================================================================
        const responseHtml = 
        `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inicio</title>
    <link rel="stylesheet" href="../Styles/film.css">
    <link href="https://fonts.cdnfonts.com/css/wildest" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/barcade" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"/>
    <style>
      *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "poppins", sans-serif;
}

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 100px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  filter: blur(5px);
  opacity: 1; /* Ajusta el valor para más o menos opacidad */
  z-index: -1;
  background: rgba(0, 0, 0, 0.4); 
}

.logoPS{
  font-size: 32px;
  color: white;
  font-family: 'Barcade', sans-serif;
  text-decoration: none;
  opacity: 0; 
  animation: fadeIn 0.5s ease forwards infinite; 
  animation-fill-mode: both;
}
@media (max-width: 1400px) {
  
.logoPS:nth-child(1) { display: none;}

.logoPS:nth-child(8) { display: none;}

}
@media (max-width: 900px) {

    .logoPS:nth-child(1) { display: none;}
    .logoPS:nth-child(2) { display: none;}
    .logoPS:nth-child(7) { display: none;}
    .logoPS:nth-child(8) { display: none;}

}
@media (max-width: 600px) {
.logoPS {
    display: none;
}
}



@keyframes fadeIn {
  0%, 100% {
      opacity: 0;
  }
  50% {
      opacity: 1;
  }
}

.logoPS:nth-child(1) { animation-delay: 0.5s; animation-duration: 2s;}
.logoPS:nth-child(2) { animation-delay: 1s; animation-duration: 2s;}
.logoPS:nth-child(3) { animation-delay: 1.5s; animation-duration: 2s;}
.logoPS:nth-child(4) { animation-delay: 2s; animation-duration: 2s;}
.logoPS:nth-child(5) { animation-delay: 2s; animation-duration: 2s}
.logoPS:nth-child(6) { animation-delay: 1.5s; animation-duration: 2s}
.logoPS:nth-child(7) { animation-delay: 1s; animation-duration: 2s;}
.logoPS:nth-child(8) { animation-delay: 0.5s; animation-duration: 2s;}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Espacio entre el logo y el navbar */
}

.navbar a{
  position: relative;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Barcade No Bar Bold', sans-serif;
  margin-left: 10%;

}
.navbar a::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: .3s;
}
.navbar a:hover::before{
  width: 100%;
}

spline-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}





* {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    font-size: calc(16px + (24 - 16)*(100vw - 320px)/(1920 - 320));
  }
  body, button, input {
    font: 1em Hind, sans-serif;
    line-height: 1.5em;
  }
  body, input {
    color: #171717;
  }
  body, .search-bar {
    display: flex;
  }
  body {
    background: #f1f1f1;
    height: 100vh;
  }
  .search-bar input,
  .search-btn, 
  .search-btn:before, 
  .search-btn:after {
    transition: all 0.25s ease-out;
  }
  .search-bar input,
  .search-btn {
    width: 3em;
    height: 3em;
  }
  .search-bar input:invalid:not(:focus),
  .search-btn {
    cursor: pointer;
  }
  .search-bar,
  .search-bar input:focus,
  .search-bar input:valid  {
    width: 100%;
  }
  .search-bar input:focus,
  .search-bar input:not(:focus) + .search-btn:focus {
    outline: transparent;
  }
  .search-bar {
    margin: auto;
    padding: 1.5em;
    justify-content: center;
    max-width: 30em;
  }
  .search-bar input {
    background: transparent;
    border-radius: 1.5em;
    box-shadow: 0 0 0 0.4em #171717 inset;
    padding: 0.75em;
    transform: translate(0.5em,0.5em) scale(0.5);
    transform-origin: 100% 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .search-bar input::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  .search-bar input:focus,
  .search-bar input:valid {
    background: #fff;
    border-radius: 0.375em 0 0 0.375em;
    box-shadow: 0 0 0 0.1em #d9d9d9 inset;
    transform: scale(1);
  }
  .search-btn {
    background: #171717;
    border-radius: 0 0.75em 0.75em 0 / 0 1.5em 1.5em 0;
    padding: 0.75em;
    position: relative;
    transform: translate(0.25em,0.25em) rotate(45deg) scale(0.25,0.125);
    transform-origin: 0 50%;
  }
  .search-btn:before, 
  .search-btn:after {
    content: "";
    display: block;
    opacity: 0;
    position: absolute;
  }
  .search-btn:before {
    border-radius: 50%;
    box-shadow: 0 0 0 0.2em #f1f1f1 inset;
    top: 0.75em;
    left: 0.75em;
    width: 1.2em;
    height: 1.2em;
  }
  .search-btn:after {
    background: #f1f1f1;
    border-radius: 0 0.25em 0.25em 0;
    top: 51%;
    left: 51%;
    width: 0.75em;
    height: 0.25em;
    transform: translate(0.2em,0) rotate(45deg);
    transform-origin: 0 50%;
  }
  .search-btn span {
    display: inline-block;
    overflow: hidden;
    width: 1px;
    height: 1px;
  }
  
  
  .search-bar input:focus + .search-btn,
  .search-bar input:valid + .search-btn {
    background: transparent;
    border-radius: 0 0.375em 0.375em 0;
    transform: scale(1);
  }
  .search-bar input:focus + .search-btn:before, 
  .search-bar input:focus + .search-btn:after,
  .search-bar input:valid + .search-btn:before, 
  .search-bar input:valid + .search-btn:after {
    opacity: 1;
  }
  .search-bar input:focus + .search-btn:hover,
  .search-bar input:valid + .search-btn:hover,
  .search-bar input:valid:not(:focus) + .search-btn:focus {
    background: transparent;
  }
  .search-bar input:focus + .search-btn:active,
  .search-bar input:valid + .search-btn:active {
    transform: translateY(1px);
  }
  
  @media screen and (prefers-color-scheme: dark) {
    body, input {
      color: #f1f1f1;
    }
    body {
      background: transparent;
    }
    .search-bar input {
      box-shadow: 0 0 0 0.4em #f1f1f1 inset;
    }
    .search-bar input:focus,
    .search-bar input:valid {
      background: transparent;
      box-shadow: 0 0 0 0.1em #3d3d3d inset;
    }
    .search-btn {
      background: #f1f1f1;
    }
  }

/* films */
/* films */
section {
  position: relative;
  color: aliceblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
  padding: 0 7%;
  margin-top: 10%;

}
.info {
  position: relative;
  display: flex;
  flex-direction: column; 
  margin-left: 8%;
  margin-right: 4%;
}
.first {
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 15px; 
  background: rgba(255, 255, 255, 0.064); 
  backdrop-filter: blur(1px); 
  padding: 5%; 
  color: aliceblue; 
  
  max-height: 420px;
}

img {
  position: relative;
  width: 20%;
  height: auto;
}

.infilm {
  margin-bottom: 1rem; 


  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
  white-space: nowrap; 
}

.calif {
  top: -34%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
  width: 100px;
  height: 100px; 
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(3px); 
  border-radius: 10px; 
  color: aliceblue;
  font-size: 1.2rem;

}

.synopsis {
  margin-left: 4%; 
  max-width: 100%; 
  text-align: left; 
  font-size: 1rem;
  color: aliceblue;
  font-size: small;
  font-style: normal;
  overflow-y: auto;
  max-height: 380px; 
  
}



h2{
font-size: small;
}
h3{
font-size: small;
}


.recomendaciones {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5%;
  margin-right: 5%;
}

.recomendaciones a {
  text-decoration: none;
  
  padding: 1% 1% ;
}
.recom {
  margin-top: 1%;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
  
  font-family: "Roboto Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
}
.recomendaciones img {
  width: 100px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s;
}

.recomendaciones img:hover {
  transform: scale(1.1);
}

#select {
  border-radius: 10px;
  opacity: 0.8;
  backdrop-filter: blur(5px);
  padding: 10px;
  border: 1px solid ;
  background-color: black;
  color: white;
}

#submit-btn {
  border-radius: 10px;
  opacity: 0.8;
  backdrop-filter: blur(5px);
  padding: 10px 20px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
}

#submit-btn:hover {
  opacity: 1;
  backdrop-filter: blur(0);
}

    </style>
    <style>
        body {
        background: url('https://raw.githubusercontent.com/CinemaFiles/CineFiles-front/main/Styles/gisito.gif') no-repeat center center fixed;
        background-size: cover;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        filter: blur(5px);
        opacity: 1; /* Ajusta el valor para más o menos opacidad */
        z-index: -1;
        background: rgba(0, 0, 0, 0.4); 
        }
    </style>
</head>
<body>
    <header class="header">
        <div>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>
            <a href="#" class="logoPS">CineFiles</a>       
        </div>    
        
        <nav id="navbar" class="navbar">
            <a id="navigate" href="https://cinemafiles.github.io/CineFiles-front/Files/navigate.html">Navigate</a>
            <a id="account" href="https://cinemafiles.github.io/CineFiles-front/Files/profile.html">Profile</a> 
            <a id="login" href="./login.html"></a>
        </nav>
    </header>
    
    <section class="filmsection">
      <div class="first">
          <img src="http://image.tmdb.org/t/p/original${movie?.Poster}" alt="">

          <div class="info">
              <div class="infilm">
                  <h1 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie?.title}</h1>
                  <h2 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie?.original_title}</h2>
                  <h3 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie?.release_date}</h3>
              </div>
              <div class="calif">
                  <p>${movie?.popularity}</p> 
              </div>
          </div>
          
          <div class="synopsis">

              <p class="description" style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">En el siglo XXIII, el Capitán James T. Kirk y la tripulación de la nave estelar Enterprise exploran nuevos mundos y desafían la supremacía de los klingon.En el siglo XXIII, el Capitán James T. Kirk y la tripulación de la nave estelar Enterprise exploran nuevos mundos y desafían la supremacía de los klingon.</p>

                    <select id="select" class="form-select" aria-label="Disabled select example">
                        <option selected  value="1">Agregar pelicula</option>
                        <option value="2">Marcar como visto</option>
                    </select>
                    <button type="submit" id="sumbit-btn" style="  border-radius: 10px;
                    opacity: 0.8;
                    backdrop-filter: blur(5px);
                    padding: 10px 20px;
                    border: none;
                    background-color: black;
                    color: white;
                    cursor: pointer;">sumbit</button>
            </div>

          </div>


      </div >
      <h2 class="recom">Recomendaciones</h2>
      <div class="recomendaciones">
       
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[1].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[1].movie.Poster}" alt="Pelicula 1"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[2].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[2].movie.Poster}" alt="Pelicula 2"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[3].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[3].movie.Poster}" alt="Pelicula 3"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[4].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[4].movie.Poster}" alt="Pelicula 4"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[5].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[5].movie.Poster}" alt="Pelicula 5"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[6].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[6].movie.Poster}" alt="Pelicula 6"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[7].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[7].movie.Poster}" alt="Pelicula 7"></a>
      </div>
    </section>
    <script src="https://unpkg.com/scrollreveal"></script>
    <script>
        const sr =ScrollReveal({
          distance:'65px',
          duration: 2000,
          delay: 450,
          reset: true
        });
        sr.reveal('.filmsection',{delay: 50, origin:'top'});
    </script>
    <script>
        const sumbit = document.getElementById('sumbit-btn');
        sumbit.addEventListener('click', (e) =>{
            e.preventDefault();
            const select = document.getElementById('select')
            console.log(select)
            console.log(select.value)
            if(select.value ===1){
                fetch('https://cinefiles-backend.onrender.com/movies/watchlater/add')
                .then(res => res.json())
                .then(res=>{
                    console.log(res)
                    alert('Pelicula agregada a ver mas tarde');
                })
            }
            else if (select.value === 2){
                alert('Pelicula eliminada')
            }
        })
    </script>
</body>
</html>

        `
//====================================================================================================================================
        res.send(responseHtml)
    }).catch(error => {
        console.log(error)
    })
})

router.get("/search/:filter", (req, res) => {
    const { filter } = req.params;
    console.log(filter)
    const result = binarytree.search(filter);
    res.json(result);
});

router.post("/watchlater/add", (req, res) => {
    const user = req.body.userId;
    const movie = req.body.movieId;
    console.log(user, movie)
    console.log(typeof user, typeof movie)
    watchLaterQueue.agregarElemento(user, movie);
    res.status(200).send({ message: "Movie added to watch later queue." });
});

router.post("/watchlater/remove", (req, res) => {
    const user = req.body.userId;
    const removedMovie = watchLaterQueue.quitarElemento(user);
    if (removedMovie) {
        res.status(200).send({ message: "Movie removed from watch later queue.", movie: removedMovie });
    } else {
        res.status(404).send({ message: "No movies in watch later queue." });
    }
});

router.post("/watchlater/all", async (req, res) => {
  const user = req.body.userId;
  console.log(user)
  console.log(typeof user)
  const movies = await watchLaterQueue.obtenerTodos(user as string);
  console.log(movies)
  res.status(200).json(movies);
});

router.post('/watchlater/recommend', async (req, res) => {
  const user = req.body.userId; //id del usuario //necesitamos esta wbd para saber que las pelis son de el
  const recommendations = await recommendMovies(user);
  res.status(200).json(recommendations);
});


export default router;