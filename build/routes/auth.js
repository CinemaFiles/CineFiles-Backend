"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_schema_1 = require("../schemas/auth.schema");
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    const validUserLogin = auth_schema_1.loginUserSchema.safeParse(req.body);
    if (!validUserLogin.success) {
        res.status(400).send(validUserLogin.error);
        return;
    }
    return (0, auth_1.login)(req.body, res);
});
router.post('/register', (req, res) => {
    const validCredential = auth_schema_1.createUserSchema.safeParse(req.body);
    if (!validCredential.success) {
        res.status(400).send(validCredential.error);
    }
    return (0, auth_1.registerUser)(req.body);
});
exports.default = router;
