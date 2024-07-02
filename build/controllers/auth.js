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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.login = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const auth_schema_1 = require("../schemas/auth.schema");
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ONE_MONTH = 30 * 24 * 60 * 60;
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
                    mail: email,
                    password: hashedPassword
                }
            });
            console.log(user);
            return { user, error: null, status: 200 };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2002') {
                // Check if the error is due to duplicate email
                return { user: null, error: "El email ya existe", status: 400 };
            }
            // Server error
            return { user: null, error: "Error del servidor", status: 500 };
        }
    });
}
exports.registerUser = registerUser;
function login(loginData, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const validCredential = auth_schema_1.loginUserSchema.safeParse(loginData);
        if (!validCredential.success) {
            return { user: null, error: validCredential.error.formErrors, status: 400 };
        }
        console.log({ mail: validCredential.data.email });
        const userlogin = yield prisma.user.findUnique({
            where: {
                mail: validCredential.data.email,
            }
        });
        if (userlogin) {
            const dato = yield (0, hash_1.CompareHash)(validCredential.data.password, userlogin.password);
            if (dato) {
                const dataforToken = {
                    id: userlogin.id.toString(),
                    name: userlogin.name,
                    email: userlogin.mail
                };
                const secretKey = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : ""; // Provide a default value for the secret key
                const token = jsonwebtoken_1.default.sign(dataforToken, secretKey, {
                    expiresIn: ONE_MONTH
                });
                res.status(200).send({ userId: userlogin.id, user: userlogin.name, email: userlogin.mail, message: "Usuario logueado", token: token });
                return yield prisma.user.findMany();
            }
            else {
                res.status(400).send({ message: "Usuario o contraseña incorrectos" });
                return;
            }
        }
        else {
            res.status(400).send({ message: "Usuario o contraseña incorrectos" });
            return;
        }
    });
}
exports.login = login;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma;
    });
}
exports.getAll = getAll;
