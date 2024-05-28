"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const movies_1 = __importDefault(require("./routes/movies"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); //midleware para parsear todo a json
app.use((0, morgan_1.default)('dev'));
app.use('/auth', auth_1.default);
app.use('/movies', movies_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
