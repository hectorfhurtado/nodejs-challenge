import auth from '../auth.mjs';
import Productos from '../models/Productos.mjs';
import Fabrica from '../models/Fabrica.mjs';
import { parse } from 'querystring';
export default async function (req, res) {
    if (auth(req, res) > 0)
        return;
    res.setHeader('Content-type', 'application/json');
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
        const bodyConcatenated = Buffer.concat(body).toString();
        const bodyParsed = parse(bodyConcatenated);
        if ('Id' in bodyParsed === false) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'El campo Id no fue suministrado' }));
            return;
        }
        if (/^\d+$/.test(bodyParsed.Id) === false) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'Id debe ser un solo número entero sin espacios' }));
            return;
        }
        const product = await Productos.findOne({ Id: BigInt(bodyParsed.Id) });
        if (product === null) {
            res.statusCode = 400;
            res.end(JSON.stringify({ Message: 'El producto no existe' }));
            return;
        }
        await Fabrica.updateOne({ Id: product.IdFab }, { $pull: { Productos: product.Id } });
        await Productos.deleteOne({ Id: product.Id });
        res.end(JSON.stringify({ Status: true }));
    });
}
