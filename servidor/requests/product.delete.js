"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Productos_mjs_1 = __importDefault(require("../models/Productos.mjs"));
const Fabrica_mjs_1 = __importDefault(require("../models/Fabrica.mjs"));
const querystring_1 = require("querystring");
async function default_1(req, res) {
    res.setHeader('Content-type', 'application/json');
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
        body = Buffer.concat(body).toString();
        body = (0, querystring_1.parse)(body);
        if ('Id' in body === false) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'El campo Id no fue suministrado' }));
            return;
        }
        if (/^\d+$/.test(body.Id) === false) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'Id debe ser un solo número entero sin espacios' }));
            return;
        }
        const product = await Productos_mjs_1.default.findOne({ Id: BigInt(body.Id) });
        if (product === null) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'El producto no existe' }));
            return;
        }
        await Fabrica_mjs_1.default.updateOne({ Id: product.IdFab }, { $pull: { Productos: product.Id } });
        await Productos_mjs_1.default.deleteOne({ Id: product.Id });
        res.end(JSON.stringify({ Status: true }));
    });
}
exports.default = default_1;
