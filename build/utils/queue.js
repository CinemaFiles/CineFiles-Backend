"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cola = void 0;
const watchLater_1 = require("../controllers/watchLater");
class Cola {
    constructor() {
        this.elementos = [];
        this.frente = 0;
        this.atras = 0;
    }
    agregarElemento(userId, movieId) {
        this.elementos[this.atras] = movieId;
        this.atras++;
        (0, watchLater_1.addWatchLater)(userId, movieId);
    }
    //quitar elemento
    //necesito el id del usuario
    quitarElemento(userId) {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.elementos[this.frente];
        this.elementos[this.frente] = undefined;
        this.frente++;
        (0, watchLater_1.removeWatchLater)(userId, element);
        return element;
    }
    verElementoDelFrente() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elementos[this.frente];
    }
    isEmpty() {
        return this.frente === this.atras;
    }
    tamaño() {
        return this.atras - this.frente;
    }
    Limpiar() {
        this.elementos = [];
        this.frente = 0;
        this.atras = 0;
    }
    obtenerTodos(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, watchLater_1.getallWatchLater)(userId);
            //return this.elementos.slice(this.frente, this.atras);
        });
    }
}
exports.Cola = Cola;
