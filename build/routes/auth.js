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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_schema_1 = require("../schemas/auth.schema");
const router = express_1.default.Router();
router.post('/login', (req, res) => {
    const validUserLogin = auth_schema_1.loginUserSchema.safeParse(req.body);
    if (!validUserLogin.success) {
        res.status(400).send(validUserLogin.error);
        return;
    }
    (0, auth_1.login)(req.body, res);
    return;
});
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const validCredential = auth_schema_1.createUserSchema.safeParse(req.body);
    if (!validCredential.success) {
        res.status(400).send(validCredential.error);
        return;
    }
    const data = yield (0, auth_1.registerUser)(req.body);
    res.send({
        user: {
            name: (_a = data.user) === null || _a === void 0 ? void 0 : _a.name,
            email: (_b = data.user) === null || _b === void 0 ? void 0 : _b.mail
        },
        error: data.error,
        status: data.status
    });
    return;
}));
router.get('/all', (_req, res) => {
    res.send((0, auth_1.getAll)());
});
exports.default = router;
