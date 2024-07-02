import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth'
import movies from './routes/movies'
import cors from 'cors'
import { ListaSimple } from './utils/ListaSimple'
import { allmovies } from './controllers/movies'
import { BinarySearchTree } from './utils/binaryTree'

export const listaHome = new ListaSimple();
export const binarytree = new BinarySearchTree(); 

const initMovies = (listaHome : ListaSimple) =>{
    allmovies().then(movies  => {
        listaHome.peliculas = movies;
        listaHome.ordenarPeliculas();
        listaHome.peliculas.forEach( element =>{
            binarytree.insert(element);
            console.log(element.title);
        })
        console.log('Peliculas cargadas correctamente')
    }).catch(error =>{
        console.log("Error al cargar las peliculas");
        console.log(error);
    })
}


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());//midleware para parsear todo a json
app.use(morgan('dev'));


app.use('/auth', authRouter);

app.use('/movies', movies);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    initMovies(listaHome);
})

