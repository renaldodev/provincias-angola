"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvinciaBySelfName = exports.getProvinceByMunicipioName = exports.getProvinciaByISOCode = exports.getMunicipiosByProvinceName = exports.getMunicipios = exports.getProvincias = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
function getProvincias() {
    return new Promise((resolve) => {
        axios_1.default.get("https://pt.wikipedia.org/wiki/Prov%C3%ADncias_de_Angola").then(html => {
            const $ = cheerio_1.default.load(html.data);
            const table = $("table.wikitable tbody").find("tr");
            let provincias;
            provincias = [];
            table.each((i, tr) => {
                const tds = $(tr).find("td");
                const provincia = {
                    id: i + 1,
                    provincia: $(tds[0]).text().trim(),
                    id_iso: $(tds[1]).text().trim(),
                    capital: $(tds[2]).text().trim(),
                    area: $(tds[3]).text().trim(),
                    municipios: parseInt($(tds[5]).text().trim()),
                    comunas: parseInt($(tds[6]).text().trim())
                };
                provincias.push(provincia);
            });
            provincias.shift();
            provincias.pop();
            resolve(provincias);
        });
    });
}
exports.getProvincias = getProvincias;
function getProvinciaBySelfName(provinceName) {
    return new Promise((resolve) => {
        const provincia = getProvincias().then(provincias => provincias.filter(p => { var _a; return ((_a = p.provincia) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === provinceName.toLowerCase(); }));
        provincia.then(p => {
            resolve(p[0]);
        });
    });
}
exports.getProvinciaBySelfName = getProvinciaBySelfName;
function getProvinciaByISOCode(isoCode) {
    return new Promise((resolve) => {
        const provincia = getProvincias().then(provincia => provincia.filter(x => { var _a; return ((_a = x.id_iso) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === isoCode.toLowerCase(); }));
        provincia.then(p => {
            resolve(p[0]);
        });
    });
}
exports.getProvinciaByISOCode = getProvinciaByISOCode;
function getProvinceByMunicipioName(municipio) {
    return new Promise((resolve) => {
        const provincia = getMunicipios().then(municipios => municipios.filter(x => x.municipio.toLowerCase() === municipio.toLowerCase()));
        provincia.then(p => {
            resolve(getProvinciaBySelfName(p[0].provincia));
        });
    });
}
exports.getProvinceByMunicipioName = getProvinceByMunicipioName;
function getMunicipios() {
    return new Promise((resolve) => {
        axios_1.default.get("https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_de_Angola_por_ordem_alfab%C3%A9tica").then(html => {
            const $ = cheerio_1.default.load(html.data);
            const table = $("table.wikitable tbody").find("tr");
            let municipios;
            municipios = [];
            table.each((i, tr) => {
                const tds = $(tr).find("td");
                const municipio = {
                    municipio: $(tds[0]).text().trim(),
                    provincia: $(tds[1]).text().trim(),
                };
                municipios.push(municipio);
            });
            municipios.shift();
            resolve(municipios);
        });
    });
}
exports.getMunicipios = getMunicipios;
function getMunicipiosByProvinceName(provincia) {
    return new Promise((resolve) => {
        const municipios = getMunicipios().then(municipios => municipios.filter(x => x.provincia.toLowerCase() === provincia.toLowerCase()));
        resolve(municipios);
    });
}
exports.getMunicipiosByProvinceName = getMunicipiosByProvinceName;
