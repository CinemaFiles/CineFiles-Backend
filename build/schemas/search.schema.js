"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovieSchema = void 0;
const zod_1 = require("zod");
exports.searchMovieSchema = zod_1.z.object({
    filter: zod_1.z.string({
        required_error: 'El filtro es requerido',
        invalid_type_error: 'El filtro debe ser un string'
    })
});
