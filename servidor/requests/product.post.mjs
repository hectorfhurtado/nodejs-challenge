import mongoose from 'mongoose';
import Productos from '../models/Productos.mjs';
import Fabrica from '../models/Fabrica.mjs';
import Indexes from '../models/Indexes.mjs';

import { parse } from 'querystring';

export default async function ( req, res )
{
    res.setHeader( 'Content-type', 'application/json' );

    let body = [];

    req.on( 'data', chunk => body.push( chunk ));
    req.on( 'end', async () =>
    {
        body = Buffer.concat( body ).toString();
        body = parse( body );

        if ( 'Descripcion' in body === false )
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'El campo Descripcion no fue suministrado' }));

            return
        }

        if ( 'Existencias' in body === false ) 
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'El campo Existencias no fue suministrado' }));
            
            return
        }
        
        if ( /^\d+$/.test( body.Existencias ) === false )
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'Existencias debe ser un solo número entero sin espacios' }));
            
            return
        }

        if ( 'Precio' in body === false ) 
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'El campo Precio no fue suministrado' }));
            
            return
        }

        if ( /^\d+(\.\d\d?)?$/.test( body.Precio ) === false )
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'Precio debe ser un solo número decimal sin espacios' }));
            
            return
        }

        if ( 'IdFab' in body === false ) 
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'El campo IdFab no fue suministrado' }));
            
            return
        }
        
        if ( /^\d+$/.test( body.IdFab ) === false )
        {
            res.statusCode = 400;
            res.end( JSON.stringify({ Message: 'IdFab debe ser un solo número entero sin espacios' }));
            
            return
        }

        const currentIds = await Indexes.findOne({});
        const newProductoId = currentIds.ProductoId + 1n;

        const newProducto = new Productos({
            Id:          newProductoId,
            Descripcion: body.Descripcion,
            Existencias: BigInt( body.Existencias ),
            Precio:      new mongoose.Types.Decimal128( body.Precio ),
            IdFab:       BigInt( body.IdFab ),
        });

        await Indexes.updateOne({}, { ProductoId: newProductoId });
        await newProducto.save();
        await Fabrica.updateOne(
            { Id: BigInt( body.IdFab )}, 
            { $push: { Productos: newProductoId }}
        );

        res.end( JSON.stringify( { Status: true, Payload: { Id: newProductoId.toString(), ...body }} ));
    });
}
