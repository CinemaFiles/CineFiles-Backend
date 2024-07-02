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
exports.findMoviebyId = exports.allmovies = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function allmovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const movies = yield prisma.movie.findMany({
            select: {
                id: true,
                title: true,
                original_title: true,
                overview: true,
                Poster: true,
                Backdrop: true,
                popularity: true,
                release_date: true,
                genres: true,
            },
        });
        return movies.map(movie => (Object.assign(Object.assign({}, movie), { id: movie.id.toString() })));
    });
}
exports.allmovies = allmovies;
function findMoviebyId(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const idBigInt = BigInt(name);
        return yield prisma.movie.findFirst({
            where: {
                id: idBigInt
            },
            select: {
                title: true,
                original_title: true,
                overview: true,
                Poster: true,
                Backdrop: true,
                popularity: true,
                release_date: true,
                genres: true,
            }
        });
    });
}
exports.findMoviebyId = findMoviebyId;
