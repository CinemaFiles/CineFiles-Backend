"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getbyId = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser un string'
    }).min(2).max(100),
    email: zod_1.z.string().email({
        message: 'El email no es válido',
    }),
    password: zod_1.z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un string'
    }).min(6).max(30),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'El email es requerido',
        invalid_type_error: 'El email debe ser un string'
    }).min(2).max(100),
    password: zod_1.z.string({
        required_error: 'La contraseña es requerida',
        invalid_type_error: 'La contraseña debe ser un string'
    }).min(6).max(30),
});
exports.getbyId = zod_1.z.object({
    id: zod_1.z.number({
        required_error: 'El id es requerido',
        invalid_type_error: 'El id debe ser un número'
    })
});
