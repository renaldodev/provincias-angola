"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const service = __importStar(require("./service/cheerioData"));
const app = express_1.default();
const server = http_1.default.createServer(app);
app.get("/api/provinces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getProvincias());
}));
app.get("/api/province/municipio/:municipio", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getProvinceByMunicipioName(req.params.municipio));
}));
app.get("/api/province/iso/:isoCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getProvinciaByISOCode(req.params.isoCode));
}));
app.get("/api/province/:provinceName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getProvinciaBySelfName(req.params.provinceName));
}));
app.get("/api/municipios", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getMunicipios());
}));
app.get("/api/municipio/:provinceName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield service.getMunicipiosByProvinceName(req.params.provinceName));
}));
app.use((req, res, next) => {
    return res.json({
        error: "Router not found"
    });
    next();
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("server is running on port ", port);
});
