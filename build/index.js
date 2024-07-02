"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarytree = exports.listaHome = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const movies_1 = __importDefault(require("./routes/movies"));
const cors_1 = __importDefault(require("cors"));
const ListaSimple_1 = require("./utils/ListaSimple");
const movies_2 = require("./controllers/movies");
const binaryTree_1 = require("./utils/binaryTree");
exports.listaHome = new ListaSimple_1.ListaSimple();
exports.binarytree = new binaryTree_1.BinarySearchTree();
const initMovies = (listaHome) => {
    (0, movies_2.allmovies)().then(movies => {
        listaHome.peliculas = movies;
        listaHome.ordenarPeliculas();
        listaHome.peliculas.forEach(element => {
            exports.binarytree.insert(element);
            console.log(element.title);
        });
        console.log('Peliculas cargadas correctamente');
    }).catch(error => {
        console.log("Error al cargar las peliculas");
        console.log(error);
    });
};
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //midleware para parsear todo a json
app.use((0, morgan_1.default)('dev'));
app.use('/auth', auth_1.default);
app.use('/movies', movies_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initMovies(exports.listaHome);
});
