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
exports.login = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const auth_schema_1 = require("../schemas/auth.schema");
const hash_1 = require("../utils/hash");
const prisma = new client_1.PrismaClient();
function registerUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = auth_schema_1.createUserSchema.safeParse(userData);
        if (!result.success) {
            return { user: null, error: result.error.formErrors, status: 400 };
        }
        const { name, email, password } = result.data;
        const hashedPassword = yield (0, hash_1.Hashing)(password);
        try {
            const user = yield prisma.user.create({
                data: {
                    name,
                    mail: email, // Change "email" to "mail"
                    password: hashedPassword
                }
            });
            return { user, error: null, status: 200 };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2002') {
                //comprobacion para ver si el error es por email duplicado
                return { user: null, error: "El email ya existe", status: 400 };
            }
            //error del servidor
            return { user: null, error: "Error del servidor", status: 500 };
        }
    });
}
exports.registerUser = registerUser;
function login(loginData, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validCredential = auth_schema_1.loginUserSchema.safeParse(loginData);
        if (!validCredential.success) {
            return { user: null, error: validCredential.error.formErrors, status: 400 };
        }
        const hashedPassword = yield (0, hash_1.Hashing)(validCredential.data.password);
        const userlogin = yield prisma.user.findUnique({
            where: {
                mail: validCredential.data.email,
                password: hashedPassword
            }
        });
        if (userlogin === null) {
            res.status(400).send({ message: "Usuario o contraseña incorrectos" });
            return;
        }
        else {
            res.status(200).send({ message: "Usuario logueado" });
            return;
        }
    });
}
exports.login = login;
