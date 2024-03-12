/* eslint no-console: off */

import https from 'https';
import fs from 'fs';
import path from 'path';

import networkInterfaz from './networkInterfaz.mjs';
import estableceCabecera from './cabeceras.mjs';
import clasificaRutas from './rutas.mjs';

const PUERTO = 7022;
const __dirname = import.meta.dirname;

function leeCerts( archivos )
{
    console.assert( Array.isArray( archivos ), 'archivos', archivos );
    
    let promesas = [];

    for (let archivo of archivos)
    {
        let promesa = new Promise(( resolve, reject ) =>
        {
            fs.readFile( path.join( __dirname, `cert/${ archivo }.pem` ), ( err, contenido ) =>
            {
                if (err) reject( err );
                else     resolve( contenido );
            });
        });

        promesas.push( promesa );
    }

    return promesas;
}

const [ cert, key ] = await Promise.all( leeCerts([ 'cert', 'key' ]))
const opciones      = { cert, key };

const servidor = https.createServer( opciones, ( req, res ) =>
{
    estableceCabecera( req, res );
    res.setHeader( 'X-Powered-By', 'PHP/8.3' );
    
    clasificaRutas( req, res );
});

servidor.listen( PUERTO ); 
networkInterfaz( PUERTO );
