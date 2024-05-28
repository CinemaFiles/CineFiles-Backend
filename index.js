"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //midleware para parsear todo a json
app.use((0, morgan_1.default)('dev'));
const PORT = 3000;
app.get('/wasa', (req, res) => {
    console.log("wasaaa");
    res.send("wasa");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
