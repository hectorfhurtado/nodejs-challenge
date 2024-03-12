import Productos from '../models/Productos.mjs';

export default async function ( req, res )
{
    res.setHeader( 'Content-type', 'application/json' );

    const productos = await Productos.find()

    const productosOrdenados = {};

    for (let producto of productos)
    {
        const newProducto = {
            Id:          producto.Id.toString(),
            Descripcion: producto.Descripcion,
            Existencias: producto.Existencias.toString(),
            Precio:      producto.Precio.toString(),
            IdFab:       producto.IdFab.toString(),
            };

        if ( newProducto.IdFab in productosOrdenados )
            productosOrdenados[ newProducto.IdFab ].push( newProducto );
        else
            productosOrdenados[ newProducto.IdFab ] = [ newProducto ];
    }

    res.end( JSON.stringify( productosOrdenados ));
}
