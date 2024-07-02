"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("../controllers/movies");
const queue_1 = require("../utils/queue");
const __1 = require("..");
const movies_2 = require("../controllers/movies");
const recomendation_1 = require("../utils/recomendation");
const router = express_1.default.Router();
const watchLaterQueue = new queue_1.Cola();
router.get("/all", (_req, res) => {
    (0, movies_1.allmovies)().then((movies) => {
        res.json(movies);
    });
});
router.get("/recomendation/:id", (req, res) => {
    const { id } = req.params;
    (0, movies_2.findMoviebyId)(id).then(movie => {
        console.log(movie);
        let similitudes = [];
        __1.listaHome.peliculas.forEach(element => {
            const similitud = (0, recomendation_1.cosineSimilarity)(movie === null || movie === void 0 ? void 0 : movie.title, element === null || element === void 0 ? void 0 : element.title);
            similitudes.push({ movie: element, similitud: similitud });
        });
        similitudes.sort((a, b) => b.similitud - a.similitud);
        console.log(similitudes.slice(1, 7));
        res.json(similitudes.slice(1, 7));
    }).catch(error => {
        console.log(error);
    });
});
router.get("/home", (req, res) => {
    const index = Number(req.query.index);
    res.json(__1.listaHome.peliculas.slice(21 * (index - 1), 21 * index));
});
router.get('/info_movie/:id', (req, res) => {
    const { id } = req.params;
    (0, movies_2.findMoviebyId)(id)
        .then(movie => {
        console.log(movie);
        let similitudes = [];
        __1.listaHome.peliculas.forEach(element => {
            const similitud = (0, recomendation_1.cosineSimilarity)((movie === null || movie === void 0 ? void 0 : movie.title) + ' ' + (movie === null || movie === void 0 ? void 0 : movie.original_title) + ' ' + (movie === null || movie === void 0 ? void 0 : movie.overview), (element === null || element === void 0 ? void 0 : element.title) + ' ' + (element === null || element === void 0 ? void 0 : element.original_title) + ' ' + (movie === null || movie === void 0 ? void 0 : movie.overview));
            similitudes.push({ movie: element, similitud: similitud });
        });
        similitudes.sort((a, b) => b.similitud - a.similitud);
        console.log(similitudes.slice(1, 7));
        //====================================================================================================================================
        const responseHtml = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inicio</title>
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
  height: 70%;


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
}

.description{
    display: flex;
    justify-content: center;
    align-items: center;
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



    </style>
    <link href="https://fonts.cdnfonts.com/css/wildest" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/barcade" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"/>
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
            <a id="account" href="./profile.html">Account</a> 
        </nav>
    </header>
    
    <section class="filmsection">
      <div class="first">
          <img src="http://image.tmdb.org/t/p/original${movie === null || movie === void 0 ? void 0 : movie.Poster}" alt="">

          <div class="info">
              <div class="infilm">
                  <h1 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie === null || movie === void 0 ? void 0 : movie.title}</h1>
                  <h2 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie === null || movie === void 0 ? void 0 : movie.original_title}</h2>
                  <h3 style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie === null || movie === void 0 ? void 0 : movie.release_date}</h3>
              </div>
              <div class="calif">
                  <p>${movie === null || movie === void 0 ? void 0 : movie.popularity}</p> 
              </div>
          </div>
          
          <div class="synopsis">
              <p class="description" style="  font-family:Roboto Mono, monospace;font-optical-sizing: auto;">${movie === null || movie === void 0 ? void 0 : movie.overview}</p>
          </div>

      </div >
      <h2 class="recom">Recomendaciones</h2>
      <div class="recomendaciones">
       
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[1].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[1].movie.Poster}" alt="${similitudes[1].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[2].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[2].movie.Poster}" alt="${similitudes[2].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[3].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[3].movie.Poster}" alt="${similitudes[3].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[4].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[4].movie.Poster}" alt="${similitudes[4].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[5].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[5].movie.Poster}" alt="${similitudes[5].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[6].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[6].movie.Poster}" alt="${similitudes[6].movie.title}"></a>
        <a href="https://cinefiles-backend.onrender.com/movies/info_movie/${similitudes[7].movie.id}"><img src="http://image.tmdb.org/t/p/original${similitudes[7].movie.Poster}" alt="${similitudes[7].movie.title}"></a>
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
</body>
</html>

        `;
        //====================================================================================================================================
        res.send(responseHtml);
    }).catch(error => {
        console.log(error);
    });
});
router.get("/search/:filter", (req, res) => {
    const { filter } = req.params;
    console.log(filter);
    const result = __1.binarytree.search(filter);
    res.json(result);
});
router.post("/watchlater/add", (req, res) => {
    const { movieId, userId } = req.body;
    watchLaterQueue.agregarElemento(userId, movieId);
    res.status(200).send({ message: "Movie added to watch later queue." });
});
/* router.post("/watchlater/remove", (_req, res) => {
    const removedMovie = watchLaterQueue.quitarElemento();
    if (removedMovie) {
        res.status(200).send({ message: "Movie removed from watch later queue.", movie: removedMovie });
    } else {
        res.status(404).send({ message: "No movies in watch later queue." });
    }
}); */
/* router.get("/watchlater", (_req, res) => {
    const movies = watchLaterQueue.obtenerTodos();
    res.status(200).json(movies);
}); */
exports.default = router;
