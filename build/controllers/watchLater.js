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
exports.getWatchLaterQueue = exports.removeMovieFromWatchLater = exports.addMovieToWatchLater = exports.getallWatchLater = exports.removeWatchLater = exports.addWatchLater = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addWatchLater(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const watchLater = yield prisma.see_later.create({
            data: {
                user_id: BigInt(userId),
                id_movie: BigInt(movieId)
            }
        });
        return watchLater;
    });
}
exports.addWatchLater = addWatchLater;
function removeWatchLater(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_see_later = yield prisma.see_later.findFirst({
            where: {
                user_id: BigInt(userId),
                id_movie: BigInt(movieId)
            }
        });
        console.log(id_see_later === null || id_see_later === void 0 ? void 0 : id_see_later.id);
        const watchLater = yield prisma.see_later.delete({
            where: {
                id: id_see_later === null || id_see_later === void 0 ? void 0 : id_see_later.id
            }
        });
        return watchLater;
    });
}
exports.removeWatchLater = removeWatchLater;
//obtener todos los elementos
function getallWatchLater(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const watchLater = yield prisma.see_later.findMany({
            where: {
                user_id: BigInt(userId)
            }
        });
        return watchLater.map(element => element.id_movie.toString());
    });
}
exports.getallWatchLater = getallWatchLater;
const addMovieToWatchLater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, movieId } = req.body;
    try {
        const movie = yield prisma.movie.findUnique({
            where: { id: movieId },
        });
        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }
        const watchLater = yield prisma.see_later.create({
            data: {
                user_id: userId,
                id_movie: movie.id,
            },
            include: {
                movie: true,
                user: true,
            },
        });
        res.status(200).send({ message: "Movie added to watch later queue", watchLater });
    }
    catch (error) {
        res.status(500).send({ error: "An error occurred while adding the movie to watch later queue" });
    }
});
exports.addMovieToWatchLater = addMovieToWatchLater;
const removeMovieFromWatchLater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, movieId } = req.body;
    try {
        const watchLaterEntry = yield prisma.see_later.findFirst({
            where: {
                user_id: userId,
                id_movie: movieId,
            },
        });
        if (!watchLaterEntry) {
            return res.status(404).send({ message: "No such movie in watch later queue" });
        }
        yield prisma.see_later.delete({
            where: { id: watchLaterEntry.id },
        });
        res.status(200).send({ message: "Movie removed from watch later queue", watchLaterEntry });
    }
    catch (error) {
        res.status(500).send({ error: "An error occurred while removing the movie from watch later queue" });
    }
});
exports.removeMovieFromWatchLater = removeMovieFromWatchLater;
const getWatchLaterQueue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const watchLaterQueue = yield prisma.see_later.findMany({
            where: { user_id: BigInt(userId) },
            include: {
                movie: true,
            },
            orderBy: {
                id: 'asc',
            },
        });
        res.status(200).json(watchLaterQueue);
    }
    catch (error) {
        res.status(500).send({ error: "An error occurred while fetching the watch later queue" });
    }
});
exports.getWatchLaterQueue = getWatchLaterQueue;
