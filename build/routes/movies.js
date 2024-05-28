"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("../controllers/movies");
const router = express_1.default.Router();
router.get("/all", (_req, res) => {
    (0, movies_1.allmovies)().then((movies) => {
        res.json(movies);
    });
});
exports.default = router;
