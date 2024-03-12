import fs from 'fs';
import path from 'path';
import Productos from './models/Productos.mjs';

const PUBLICO = '../publico';


export default async function ( req, res )
{
    const URL = req.url;
    const __dirname = import.meta.dirname;

    // / o /index.html
    if (/\/$|\/index\.html$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLICO + URL + 'index.html' )).pipe( res );

    if ( /producto$/.test( URL ))
    {
        res.setHeader( 'Content-type', 'application/json' );

        const productos = await Productos.find()

        const productosOrdenados = {};

        for (let producto of productos)
        {
            const newProducto = {
                Id: producto.Id.toString(),
                Descripcion: producto.Descripcion,
                Existencias: producto.Existencias.toString(),
                Precio: producto.Precio.toString(),
                IdFab: producto.IdFab.toString(),
             };

            if ( newProducto.IdFab in productosOrdenados )
                productosOrdenados[ newProducto.IdFab ].push( newProducto );
            else
                productosOrdenados[ newProducto.IdFab ] = [ newProducto ];
        }

        res.end( JSON.stringify( productosOrdenados ));
    }
}

// TODO: Add Postman collection and query type
